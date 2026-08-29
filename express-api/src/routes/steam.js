
import express from "express";

const router = express.Router();

// GET /api/steam/search?q=portal
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const response = await fetch(
      `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(query)}&l=english&cc=us`
    );

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();

    const games = (data.items || []).map((game) => ({
      appid: game.id,
      name: game.name,
      image: game.tiny_image || null,
    }));

    res.json(games);
  } catch (error) {
    console.error("STEAM SEARCH ERROR:", error);

    res.status(500).json({
      error: "Failed to search Steam",
    });
  }
});

export default router;