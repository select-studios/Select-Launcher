import { Response, Request } from "express";
import { Logger } from "../../../app";
import { User } from "../../../models/index";
import { getAccessToken, getRefreshToken } from "../../../utils/helpers/genJwt";
import bcrypt = require("bcrypt");

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password)
    return res
      .status(400)
      .json({ error: "Please provide a valid email, username and password." });

  let userDb;

  try {
    userDb = await User.findOne({ username, email });
  } catch (error) {
    Logger.error("There was an error finding the user.", error);
    return res
      .status(500)
      .json({ error: "There was an error finding the user." });
  }

  if (!userDb) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          Logger.error("There was an error hashing the password.", err);
          return res
            .status(500)
            .json({ error: "There was an error hashing the password." });
        }

        await User.create({
          email,
          username,
          password: hash,
        }).then(async (user) => {
          const refreshToken = getRefreshToken(user.toObject());
          const accessToken = getAccessToken(user.toObject());

          await user.updateOne({ $push: { refreshTokens: [refreshToken] } });

          return res.status(201).json({
            success: true,
            user: {
              userId: user._id.toString(),
              email,
              username,
              password: hash,
              accessToken,
              refreshToken,
            },
          });
        });
      });
    } catch (error) {
      Logger.error("There was an error creating the user.", error);
      return res
        .status(500)
        .json({ error: "There was an error creating the user." });
    }
  } else {
    res.status(403).json({ error: "User already exists." });
  }
};
