import { Request, Response, Router } from "express";
import path = require("path");
import accountsRouter from "./api/accounts";
import gamesRouter from "./api/games";
import developerRouter from "./api/developer";

const apiRouter = Router();

const main = (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "../public/index.html"));
};

apiRouter.route("/").get(main);

apiRouter.use("/accounts", accountsRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/developer", developerRouter);

export { apiRouter };
