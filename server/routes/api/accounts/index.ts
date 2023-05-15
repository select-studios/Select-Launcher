import { Router } from "express";
import jwtAuth from "../../../middleware/jwt";
import { User } from "../../../models";
import { editAccount } from "./account/edit";
import { forgotPass } from "./account/forgotPass";
import { account } from "./account/index";
import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";
import { register } from "./register";

const accountsRouter = Router();

accountsRouter.get("/", async (req, res) => {
  const { pass } = req.query;

  if (pass.toString().length && pass.toString() === process.env.ADMIN_SECRET) {
    const allUsers = await User.find({});
    return res.status(201).json({ users: allUsers });
  } else {
    return res.status(403);
  }
});
accountsRouter.post("/login", login);
accountsRouter.post("/register", register);
accountsRouter.post("/refresh", refresh);
accountsRouter.post("/account", jwtAuth, account);
accountsRouter.put("/account/edit", jwtAuth, editAccount);
accountsRouter.get("/account/forgotpassword", forgotPass);

accountsRouter.delete("/logout", logout);

export default accountsRouter;
