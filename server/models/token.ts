import mongoose from "mongoose";

const token = new mongoose.Schema({
  token: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  createdAt: { type: Date, required: true, default: Date.now, expires: 3600 },
});

const Token = mongoose.model("token", token);

export { Token };
