import { User } from "../../../../../models";

export const editAccount = async (req: any, res: any) => {
  const { username, email, password, pfp } = req.body as any;

  const user = await User.findById(req.user._id);

  console.log(user);

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
      console.log(doc);
      return res.status(201).json({ success: true, newUser: doc });
    });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};
