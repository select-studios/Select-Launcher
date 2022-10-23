import { Request, Response } from "express";
import path = require("path");

const main = (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "../public/index.html"));
};

export default main;
export { login } from "./api/accounts/login";
export { register } from "./api/accounts/register";
