import { NextFunction, Request, Response } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import { User } from "../models";

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided." });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: any, user: any) => {
      if (err) {
        res.status(403).json({ error: "Invalid token." });
        return;
      }

      const userDb = await User.findOne({ username: user.username });
      user.refreshTokens = userDb?.refreshTokens;
      (req as any).user = user;
      next();
    }
  );
};

export default jwtAuth;
