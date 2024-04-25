import { Logger } from "../../../../../app";
import { User } from "../../../../../models";
import { Log } from "../../../../../utils/handlers";

export const editAccount = async (req: any, res: any) => {
  const { username, email, password, pfp, developer } = req.body as any;

  const user = await User.findById(req.user._id);

  if (!user)
    return res.status(400).json({ success: false, message: "User not found." });

  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        email,
        password,
        pfp,
      },
      { new: true, upsert: true, strict: false }
    ).then((doc) => {
      return res.status(201).json({ success: true, newUser: doc });
    });
  } catch (error) {
    Logger.error("There was an error.", error);

    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};
