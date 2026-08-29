
import db from "../db.js";

const CACHE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 días


export async function getSteamGame(appid) {
  const cached = db.prepare(`
    SELECT appid, name, image, cached_at
    FROM steam_games
    WHERE appid = ?
  `).get(appid);

  const now = Date.now();

  // Usar caché si todavía es válida
  if (cached && now - cached.cached_at < CACHE_TIME) {
    return {
      appid: cached.appid,
      name: cached.name,
      image: cached.image,
    };
  }

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&l=english`,
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();

    const game = data?.[appid];

    if (!game?.success || !game?.data) {
      throw new Error("Game not found on Steam");
    }

    const result = {
      appid: Number(appid),
      name: game.data.name,
      image: game.data.header_image || null,
    };

    // Guardar/actualizar caché
    db.prepare(`
      INSERT INTO steam_games
      (appid, name, image, cached_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(appid)
      DO UPDATE SET
        name = excluded.name,
        image = excluded.image,
        cached_at = excluded.cached_at
    `).run(
      result.appid,
      result.name,
      result.image,
      now
    );

    return result;

  } catch (error) {
    console.error(
      `STEAM ERROR [${appid}]:`,
      error.message
    );

    // Si Steam falla pero tenemos caché vieja,
    // usamos igualmente esa información.
    if (cached) {
      return {
        appid: cached.appid,
        name: cached.name,
        image: cached.image,
      };
    }

    // No tenemos caché y Steam falló.
    return {
      appid: Number(appid),
      name: `Steam Game ${appid}`,
      image: null,
    };
  }
}