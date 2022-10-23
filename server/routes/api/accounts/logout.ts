import { Response } from "express-serve-static-core";
import { User } from "../../../models";

export const logout = async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(403).json({ error: "User does not exist." });

  const refreshTokens = user.refreshTokens.filter(
    (token) => token !== req.body.token
  );
  await user.updateOne({ refreshTokens });

  return res.status(204).json({ success: true });
};
