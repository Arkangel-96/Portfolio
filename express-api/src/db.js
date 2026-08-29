
import Database from "better-sqlite3";

const db = new Database("./data/app.db");

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS favorite_games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    appid INTEGER NOT NULL,
    position INTEGER NOT NULL,
    UNIQUE(user_id, appid),
    UNIQUE(user_id, position)
  );

  CREATE TABLE IF NOT EXISTS steam_games (
    appid INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    cached_at INTEGER NOT NULL
  );
`);

export default db;