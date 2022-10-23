import { Request, Response, NextFunction } from "express";
import { User } from "../../../models";
import * as jwt from "jsonwebtoken";

const getUser = async (username: string) => {
  const userDb = await User.findOne({ username });
  if (!userDb) return null;
  return userDb;
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await getUser(username);
  if (!user) return res.status(403).json({ error: "User does not exist." });

  if (user.password != password) {
    return res.status(403).json({
      error: "Invalid password.",
    });
  }

  delete user.password;

  const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token);
  res.status(201).json({
    success: true,
    user: { ...user, token },
  });
};
