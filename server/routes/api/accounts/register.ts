import { Response, Request } from "express";
import { User, Token } from "../../../models/index";
import { getAccessToken, getRefreshToken } from "../../../utils/helpers/genJwt";
import { sendEmail } from "../../../utils/helpers/sendEmail";
import bcrypt = require("bcrypt");
import crypto = require("crypto");
import { VerifyEmail } from "../../../data/emails/verify/verify";

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
    userDb = await User.findOne({ email });
  } catch (error) {
    res.status(500).json({ error: "There was an error finding the user." });
    return;
  }

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
          const newUser = {
            email: user.email,
            username: user.username,
            password: user.password,
            _id: user._id,
          };

          const accessToken = getAccessToken(newUser);
          const refreshToken = getRefreshToken(newUser);

          await user.updateOne({ refreshTokens: [refreshToken] });

          const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

          const url = `${process.env.API_URI}/accounts/${user._id}/rg/verify?token=${token.token}`;
          await sendEmail(
            VerifyEmail({ username: user.username, url }),
            {
              to: user.email,
              subject: "Select Studios - Verify your registration.",
            },
            url
          );

          res.status(201).json({
            success: true,
            message: "User created successfully. Pending verification.",
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
    res.status(409).json({ error: "User already exists." });
    return;
  }
};
