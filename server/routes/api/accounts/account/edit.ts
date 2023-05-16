import { Response } from "express-serve-static-core";
import { Request } from "node-fetch";
import { User } from "../../../../models";

export const editAccount = async (req: any, res: any) => {
  const { username, email, password } = req.body as any;

  const user = await User.findById(req.user._id);

  if (!user)
    return res.status(400).json({ success: false, message: "User not found." });

  try {
    User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        email,
        password,
      },
      { new: true }
    ).then((doc) => res.status(201).json({ success: true, newUser: doc }));
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};
