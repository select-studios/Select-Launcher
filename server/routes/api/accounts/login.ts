import { Response, NextFunction } from "express";
import { User } from "../../../models";
import { User as UserI } from "../../../interfaces/index";
import bcrypt = require("bcrypt");
import { getAccessToken, getRefreshToken } from "../../../utils/helpers/genJwt";

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
  if (!user) {
    res.status(403).json({ error: "User does not exist." });
    return;
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "There was an error checking for the password." });
      return;
    }
    if (!result) {
      res.status(403).json({ error: "Incorrect password." });
      return;
    }

    const accessToken = getAccessToken(user.toObject());
    const refreshToken = getRefreshToken(user.toObject());

    await user.update({ $push: { refreshTokens: refreshToken } });
    await user.save();

    res.status(201).json({
      success: true,
      user: {
        username: user.username,
        password: user.password,
        email: user.email,
        accessToken,
        refreshToken,
      },
    });
  });
};
