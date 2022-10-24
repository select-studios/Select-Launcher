import { Response } from "express-serve-static-core";
import { User } from "../../../models";

export const logout = async (req: any, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  const user = await User.findOne({ refreshTokens: [refreshToken] });
  if (!user) return res.status(403).json({ error: "User does not exist." });

  const refreshTokens = user.refreshTokens.filter(
    (token) => token !== req.body.token
  );
  await user.updateOne({ refreshTokens });

  return res.status(204).json({ success: true });
};
