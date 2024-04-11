import mongoose from "mongoose";

const game = new mongoose.Schema({
  name: { type: String, required: true },
  downloadName: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    icon: { type: String, required: true },
    banner: { type: String, required: true },
    title: { type: String, required: true },
  },
  tags: { type: [String], required: true },
  verified: { type: Boolean, required: true },
  publisher: { type: String, required: true },
  developer: { type: String, required: true },
  platforms: { type: [String], required: true },
  price: { type: String, required: true },
});

const Game = mongoose.model("game", game);
export { Game };
