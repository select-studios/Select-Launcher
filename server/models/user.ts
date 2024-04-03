import * as mongoose from "mongoose";

const user = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  pfp: { type: String, required: false },
  verified: { type: Boolean, required: true, default: false },
  refreshTokens: [String],
  moderator: { type: Boolean, required: false, default: false },
  banned: { type: Boolean, required: true, default: false },
  banReason: { type: String, required: false, default: null },
  purchasedGames: [String],
});

const User = mongoose.model("user", user);
export { User };
