import { Response } from "express-serve-static-core";
import { User } from "../../../models";

export const logout = async (req: any, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  const user = await User.findOne({ refreshTokens: [refreshToken] });
  if (!user) {
    res.status(403).json({ error: "User does not exist." });
    return;
  }

  const refreshTokens = user.refreshTokens.filter(
    (token) => token !== refreshToken
  );

  await user.updateOne({ refreshTokens });
  res.status(204).json({ success: true });
};
