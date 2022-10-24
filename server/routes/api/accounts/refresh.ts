import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../../../models";

const refresh = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken)
    return res.status(401).json({ error: "No token provided." });

  const user = await User.findOne({ refreshTokens: [refreshToken] });
  if (!user.refreshTokens.includes(refreshToken))
    return res.status(403).json({ error: "Invalid token." });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
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
