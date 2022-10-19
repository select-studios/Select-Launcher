import * as mongoose from "mongoose";

const user = new mongoose.Schema({
  id: { type: String, required: true }, // mongoose is retarded and won't accept numbers in search for no reason.
  icon: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", user);
export default User;
