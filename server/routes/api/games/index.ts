import info from "./info";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter.get("/info", info);

export default gamesRouter;
