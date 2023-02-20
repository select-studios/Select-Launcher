import { Response } from "express-serve-static-core";
import { Request } from "node-fetch";
import { User } from "../../../../models";

export const editAccount = async (req: any, res: any) => {
  const { username, email, password } = req.body as any;

  const user = await User.findById(req.user._id);

  if (!user)
    return res.status(400).json({ success: false, message: "User not found." });

  try {
    await user.updateOne(
      { username, email, password },
      { returnOriginal: false }
    );

    return res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};