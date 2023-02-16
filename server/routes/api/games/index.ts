import { info } from "console";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter.route("/info").get(info);

export default gamesRouter;
