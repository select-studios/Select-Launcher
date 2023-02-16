import { Router } from "express";
import { account } from "./account";
import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";
import { register } from "./register";

const accountsRouter = Router();

accountsRouter.post("/login", login);
accountsRouter.post("/register", register);
accountsRouter.post("/refresh", refresh);
accountsRouter.post("/account", account);

accountsRouter.delete("/logout", logout);

export default accountsRouter;
