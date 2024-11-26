import mongoose from "mongoose";

const developer = new mongoose.Schema({
  developerName: String,
  publisherName: String,
  publishedGames: { type: Array<string>, default: [] },
});

const Developer = mongoose.model("developer", developer);
export { Developer };
