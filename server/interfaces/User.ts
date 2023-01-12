import { Request } from "express";

interface User extends Request {
  userId: string;
  email: string;
  username: string;
  password: string;
}

export { User };
