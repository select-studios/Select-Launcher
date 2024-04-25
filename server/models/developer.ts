import mongoose from "mongoose";

const developer = new mongoose.Schema({
  name: String,
  publishedGames: { type: Array<string>, default: [] },
});

const Developer = mongoose.model("developer", developer);
export { Developer };
