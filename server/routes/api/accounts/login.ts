import { Response, NextFunction } from "express";
import { User } from "../../../models";
import { User as UserI } from "../../../interfaces/index";
import bcrypt = require("bcrypt");
import { getAccessToken, getRefreshToken } from "../../../utils/helpers/genJwt";
import { Request } from "express-serve-static-core";
import { exec } from "child_process";
import { start } from "repl";

const getUser = async (query: { username?: string }) => {
  const userDb = await User.findOne({ username: query.username });
  console.log(userDb);
  if (!userDb) return null;
  return userDb;
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await getUser({ username });

  if (!user) {
    res.status(403).json({ error: "Username / Password is wrong." });
    return;
  }

  if (user.banned) {
    return res.status(403).json({
      error: `Your account has been banned by Select.`,
      banReason: user.banReason,
    });
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "There was an error checking for the password." });
      return;
    }
    if (!result) {
      res.status(403).json({ error: "Username / Password is wrong." });
      return;
    }

    const newUser = {
      email: user.email,
      username: user.username,
      password: user.password,
      _id: user._id,
    };

    const accessToken = getAccessToken(newUser);
    const refreshToken = getRefreshToken(newUser);

    await user.update({ refreshTokens: [refreshToken] });
    await user.save();

    res.status(200).json({
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
