import * as mongoose from "mongoose";

const user = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", user);
export { User };
