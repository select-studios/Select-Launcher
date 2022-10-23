import { Response, Request } from "express";
import { Logger } from "../../../app";
import { User } from "../../../models/index";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let user;

  try {
    user = await User.findOne({ username });
  } catch (error) {
    Logger.error("There was an error finding the user.", error);
    return res
      .status(500)
      .json({ error: "There was an error finding the user." });
  }

  if (!user) {
    try {
      await User.create({ username, password }).then(() =>
        res.status(201).json({ success: true, user: { username, password } })
      );
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
