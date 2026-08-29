
import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No token",
      });
    }

    const token = auth.replace("Bearer ", "");

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}