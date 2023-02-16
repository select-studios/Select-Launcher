import { Request } from "express";
import { Types } from "mongoose";

interface User {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
}

export { User };
