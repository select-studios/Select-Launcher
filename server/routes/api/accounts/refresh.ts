import { NextFunction, Response } from "express";
import { User as UserI } from "../../../interfaces/index";
import * as jwt from "jsonwebtoken";

const refresh = (req: any, res: Response, next: NextFunction) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ error: "No token provided." });
  if (!req.user.refreshTokens.includes(token))
    return res.status(403).json({ error: "Invalid token." });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { name: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ accessToken });
  });
};

export { refresh };
