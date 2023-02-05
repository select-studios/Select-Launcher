import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../../../models";

const refresh = async (req: any, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!authHeader) {
    res.status(401).json({ error: "No token provided." });
    return;
  }

  const user = await User.findOne({ refreshTokens: [refreshToken] });

  if (!user?.refreshTokens.includes(refreshToken)) {
    res.status(403).json({ error: "Invalid token." });
    return;
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ accessToken });
  });
};

export { refresh };
