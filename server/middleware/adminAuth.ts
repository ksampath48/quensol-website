import type { Request, Response, NextFunction } from "express";

const ADMIN_KEY = process.env.ADMIN_KEY || "quensol2025";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const key =
    req.headers["x-admin-key"] ||
    req.query["adminKey"];
  if (key !== ADMIN_KEY) {
    res.status(401).json({ message: "Unauthorised" });
    return;
  }
  next();
}
