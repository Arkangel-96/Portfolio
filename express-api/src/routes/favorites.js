
import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";
import { getSteamGame } from "../services/steam.js";

const router = express.Router();


// GET /api/favorites
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const favorites = db.prepare(`
      SELECT id, appid, position
      FROM favorite_games
      WHERE user_id = ?
      ORDER BY position ASC
    `).all(userId);

    const games = await Promise.all(
      favorites.map(async (favorite) => {
        const steamGame = await getSteamGame(favorite.appid);

        return {
          id: favorite.id,
          appid: favorite.appid,
          position: favorite.position,
          name: steamGame.name,
          image: steamGame.image,
        };
      })
    );

    res.json(games);

  } catch (error) {
    console.error("GET FAVORITES ERROR:", error);

    res.status(500).json({
      error: "Failed to get favorite games",
    });
  }
});


// POST /api/favorites
router.post("/", authenticate, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { appid } = req.body;

    if (!Number.isInteger(appid) || appid <= 0) {
      return res.status(400).json({
        error: "Invalid Steam AppID",
      });
    }

    const count = db.prepare(`
      SELECT COUNT(*) AS count
      FROM favorite_games
      WHERE user_id = ?
    `).get(userId);

    if (count.count >= 12) {
      return res.status(400).json({
        error: "Maximum of 12 favorite games",
      });
    }

    const lastPosition = db.prepare(`
      SELECT MAX(position) AS position
      FROM favorite_games
      WHERE user_id = ?
    `).get(userId);

    const nextPosition =
      (lastPosition.position ?? 0) + 1;

    const result = db.prepare(`
      INSERT INTO favorite_games
      (user_id, appid, position)
      VALUES (?, ?, ?)
    `).run(
      userId,
      appid,
      nextPosition
    );

    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      user_id: userId,
      appid,
      position: nextPosition,
    });

  } catch (error) {
    console.error("POST FAVORITES ERROR:", error);

    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        error: "Game already in favorites",
      });
    }

    res.status(500).json({
      error: "Failed to add favorite game",
    });
  }
});

// DELETE /api/favorites/:appid
router.delete("/:appid", authenticate, (req, res) => {
  try {
    const userId = req.user.user_id;
    const appid = Number(req.params.appid);

    if (!Number.isInteger(appid) || appid <= 0) {
      return res.status(400).json({
        error: "Invalid Steam AppID",
      });
    }

    const favorite = db.prepare(`
      SELECT id, position
      FROM favorite_games
      WHERE user_id = ? AND appid = ?
    `).get(userId, appid);

    if (!favorite) {
      return res.status(404).json({
        error: "Game not found in favorites",
      });
    }

    db.prepare(`
      DELETE FROM favorite_games
      WHERE user_id = ? AND appid = ?
    `).run(userId, appid);

    res.json({
      success: true,
      appid,
    });

  } catch (error) {
    console.error("DELETE FAVORITE ERROR:", error);

    res.status(500).json({
      error: "Failed to delete favorite game",
    });
  }
});

// PATCH /api/favorites/reorder
router.patch("/reorder", authenticate, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { games } = req.body;

    if (!Array.isArray(games)) {
      return res.status(400).json({
        error: "Games must be an array",
      });
    }

    if (games.length > 12) {
      return res.status(400).json({
        error: "Maximum of 12 favorite games",
      });
    }

    // Obtener favoritos reales del usuario
    const currentGames = db.prepare(`
      SELECT id, appid
      FROM favorite_games
      WHERE user_id = ?
      ORDER BY position ASC
    `).all(userId);

    // Comprobar que la lista enviada contiene exactamente
    // los mismos juegos que tiene actualmente el usuario.
    const currentAppIds = currentGames
      .map((game) => game.appid)
      .sort((a, b) => a - b);

    const newAppIds = games
      .map((game) => Number(game.appid))
      .sort((a, b) => a - b);

    if (
      currentAppIds.length !== newAppIds.length ||
      currentAppIds.some(
        (appid, index) => appid !== newAppIds[index]
      )
    ) {
      return res.status(400).json({
        error: "Invalid favorite games list",
      });
    }

    const reorder = db.transaction(() => {
      // Primero usamos posiciones temporales negativas.
      // Evita chocar con UNIQUE(user_id, position).
      const setTemporaryPosition = db.prepare(`
        UPDATE favorite_games
        SET position = ?
        WHERE user_id = ? AND appid = ?
      `);

      games.forEach((game, index) => {
        setTemporaryPosition.run(
          -(index + 1),
          userId,
          Number(game.appid)
        );
      });

      // Ahora asignamos las posiciones definitivas.
      const setFinalPosition = db.prepare(`
        UPDATE favorite_games
        SET position = ?
        WHERE user_id = ? AND appid = ?
      `);

      games.forEach((game, index) => {
        setFinalPosition.run(
          index + 1,
          userId,
          Number(game.appid)
        );
      });
    });

    reorder();

    res.json({
      success: true,
      games: games.map((game, index) => ({
        appid: Number(game.appid),
        position: index + 1,
      })),
    });

  } catch (error) {
    console.error("REORDER FAVORITES ERROR:", error);

    res.status(500).json({
      error: "Failed to reorder favorite games",
    });
  }
});

export default router;