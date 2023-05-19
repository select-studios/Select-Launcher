import { Response, NextFunction } from "express";
import { User } from "../../../models";
import { User as UserI } from "../../../interfaces/index";
import bcrypt = require("bcrypt");
import { getAccessToken, getRefreshToken } from "../../../utils/helpers/genJwt";
import { Request } from "express-serve-static-core";
import { exec } from 'child_process';
import { start } from "repl";

const getUser = async (query: { username?: string; email?: string }) => {
  const userDb = query.username
    ? await User.findOne({ username: query.username })
    : await User.findOne({ email: query.email });
  if (!userDb) return null;
  return userDb;
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;

  const user = username
    ? await getUser({ username })
    : await getUser({ email });
  if (!user) {
    res.status(403).json({ error: "Username / Password is wrong." });
    return;
  }

  if (user.banned) {
    exec("start www.select-studios.com/acr")
    
    return res
      .status(403)
      .json({ error: "Your account has been banned by Select"});
    }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "There was an error checking for the password." });
      return;
    }
    console.log(password);
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
