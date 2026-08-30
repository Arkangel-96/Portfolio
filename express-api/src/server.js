
import express from "express";
import cors from "cors";

import { authenticate } from "./middleware/auth.js";
import favoritesRouter from "./routes/favorites.js";
import steamRouter from "./routes/steam.js";
import sql from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Express API is running",
  });
});



app.get("/api/me", authenticate, (req, res) => {
  res.json({
    authenticated: true,
    user_id: req.user.user_id,
    email: req.user.email,
  });
});

app.use("/api/favorites", favoritesRouter);
app.use("/api/steam", steamRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express running on port ${PORT}`);
});