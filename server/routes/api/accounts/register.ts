import { Response, Request } from "express";
import { Logger } from "../../../app";
import { User } from "../../../models/index";
import bcrypt = require("bcrypt");

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
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

        await User.create({ email, username, password: hash }).then((user) => {
          return res.status(201).json({
            success: true,
            user: {
              userId: user._id.toString(),
              email,
              username,
              password: hash,
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
