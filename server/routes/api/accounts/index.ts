import { Router } from "express";
import jwtAuth from "../../../middleware/jwt";
import { editAccount } from "./account/edit";
import { account } from "./account/index";
import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";
import { register } from "./register";

const accountsRouter = Router();

accountsRouter.post("/login", login);
accountsRouter.post("/register", register);
accountsRouter.post("/refresh", refresh);
accountsRouter.post("/account", jwtAuth, account);
accountsRouter.put("/account/edit", jwtAuth, editAccount);

accountsRouter.delete("/logout", logout);

export default accountsRouter;
