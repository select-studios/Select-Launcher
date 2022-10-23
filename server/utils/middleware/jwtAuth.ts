import { NextFunction, Request, Response } from "express-serve-static-core";
import { Logger } from "../../app";
import * as jwt from "jsonwebtoken";

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      Logger.error("There was an error verifying the token.", err);
      return res.sendStatus(403);
    }

    (req as any).user = user;
    next();
  });
};

export default jwtAuth;
