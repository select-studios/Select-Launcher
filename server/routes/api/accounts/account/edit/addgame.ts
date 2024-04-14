import { User } from "../../../../../models";

export const addGameEdit = async (req: any, res: any) => {
  const { newGame } = req.body as any;

  const user = await User.findById(req.user._id);

  if (!user)
    return res.status(400).json({ success: false, message: "User not found." });

  if (user.purchasedGames.includes(newGame))
    return res.status(400).json({
      success: false,
      message: "User already has purchased that game.",
    });

  try {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          purchasedGames: newGame,
        },
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
