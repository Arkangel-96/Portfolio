
import express from "express";
import sql from "../db.js";
import { authenticate } from "../middleware/auth.js";
import { getSteamGame } from "../services/steam.js";

const router = express.Router();


// GET /api/favorites
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const favorites = await sql`
      SELECT id, appid, position
      FROM favorite_games
      WHERE user_id = ${userId}
      ORDER BY position ASC
    `;

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
router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { appid } = req.body;

    if (!Number.isInteger(appid) || appid <= 0) {
      return res.status(400).json({
        error: "Invalid Steam AppID",
      });
    }

    const [countResult] = await sql`
      SELECT COUNT(*) AS count
      FROM favorite_games
      WHERE user_id = ${userId}
    `;

    const count = Number(countResult.count);

    if (count >= 12) {
      return res.status(400).json({
        error: "Maximum of 12 favorite games",
      });
    }

    const [positionResult] = await sql`
      SELECT MAX(position) AS position
      FROM favorite_games
      WHERE user_id = ${userId}
    `;

    const nextPosition =
      Number(positionResult.position ?? 0) + 1;

    const [result] = await sql`
      INSERT INTO favorite_games
        (user_id, appid, position)
      VALUES
        (${userId}, ${appid}, ${nextPosition})
      RETURNING id, user_id, appid, position
    `;

    res.status(201).json({
      success: true,
      id: result.id,
      user_id: result.user_id,
      appid: result.appid,
      position: result.position,
    });

  } catch (error) {
    console.error("POST FAVORITES ERROR:", error);

    // PostgreSQL unique violation
    if (error.code === "23505") {
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
router.delete("/:appid", authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const appid = Number(req.params.appid);

    if (!Number.isInteger(appid) || appid <= 0) {
      return res.status(400).json({
        error: "Invalid Steam AppID",
      });
    }

    const result = await sql`
      DELETE FROM favorite_games
      WHERE user_id = ${userId}
        AND appid = ${appid}
      RETURNING id, appid
    `;

    if (result.length === 0) {
      return res.status(404).json({
        error: "Game not found in favorites",
      });
    }

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
router.patch("/reorder", authenticate, async (req, res) => {
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

    const currentGames = await sql`
      SELECT id, appid
      FROM favorite_games
      WHERE user_id = ${userId}
      ORDER BY position ASC
    `;

    const currentAppIds = currentGames
      .map((game) => Number(game.appid))
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

    // Transacción PostgreSQL
    await sql.begin(async (tx) => {

      // Posiciones temporales para evitar conflictos
      // con UNIQUE(user_id, position)
      for (let index = 0; index < games.length; index++) {
        const appid = Number(games[index].appid);
        const temporaryPosition = -(index + 1);

        await tx`
          UPDATE favorite_games
          SET position = ${temporaryPosition}
          WHERE user_id = ${userId}
            AND appid = ${appid}
        `;
      }

      // Posiciones definitivas
      for (let index = 0; index < games.length; index++) {
        const appid = Number(games[index].appid);
        const finalPosition = index + 1;

        await tx`
          UPDATE favorite_games
          SET position = ${finalPosition}
          WHERE user_id = ${userId}
            AND appid = ${appid}
        `;
      }
    });

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