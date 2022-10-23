import { Response, NextFunction } from "express";
import { User } from "../../../models";
import { User as UserI } from "../../../interfaces/index";
import bcrypt = require("bcrypt");
import * as jwt from "jsonwebtoken";

const getUser = async (query: { username?: string; email?: string }) => {
  const userDb = query.username
    ? await User.findOne({ username: query.username })
    : await User.findOne({ email: query.email });
  if (!userDb) return null;
  return userDb;
};

export const login = async (req: UserI, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;

  const user = username
    ? await getUser({ username })
    : await getUser({ email });
  if (!user) return res.status(403).json({ error: "User does not exist." });

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "There was an error checking for the password." });
    if (!result) {
      return res.status(403).json({ error: "Incorrect password." });
    }

    delete user.password;
    const accessToken = jwt.sign(
      user.toObject(),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      user.toObject(),
      process.env.REFRESH_TOKEN_SECRET
    );

    await user.updateOne({ $push: { refreshTokens: refreshToken } });

    res.status(201).json({
      success: true,
      user: { ...user, accessToken, refreshToken },
    });
  });
};
