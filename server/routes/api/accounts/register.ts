import { Response, Request } from "express";
import { User } from "../../../models/index";
import { getAccessToken, getRefreshToken } from "../../../utils/helpers/genJwt";
import bcrypt = require("bcrypt");

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res
      .status(400)
      .json({ error: "Please provide a valid email, username and password." });
    return;
  }

  let userDb;

  try {
    userDb = await User.findOne({ username, email });
  } catch (error) {
    res.status(500).json({ error: "There was an error finding the user." });
    return;
  }

  // oudpJA7XTzOQSZCiiyK5fHTA

  if (!userDb) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .json({ error: "There was an error hashing the password." });
          return;
        }

        await User.create({
          email,
          username,
          password: hash,
        }).then(async (user) => {
          const refreshToken = getRefreshToken(user.toObject());
          const accessToken = getAccessToken(user.toObject());

          await user.updateOne({ $push: { refreshTokens: [refreshToken] } });

          res.status(201).json({
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
      res.status(500).json({ error: "There was an error creating the user." });
      return;
    }
  } else {
    res.status(403).json({ error: "User already exists." });
    return;
  }
};
