import * as mongoose from "mongoose";

const user = new mongoose.Schema({
  _id: { type: Number, required: true }, // mongoose is retarded and won't accept numbers in search for no reason.
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", user);
export { User };
