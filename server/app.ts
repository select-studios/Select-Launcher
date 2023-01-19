import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as cookieParser from "cookie-parser";
import main, { login, logout, refresh, register } from "./routes";

import { Log } from "./utils/handlers/index";
import jwtAuth from "./middleware/jwt";
import bodyParser = require("body-parser");
import { Game, Token, User } from "./models";
import gamesData from "./data/games";
import info from "./routes/api/games/info";
import updateGamesInfo from "./utils/helpers/updateGamesInfo";

dotenv.config();

const Logger = new Log();
const app = express();
const PORT = process.env.PORT || 4757;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", main);

app.post("/api/accounts/login", login);
app.post("/api/accounts/register", register);
app.post("/api/accounts/refresh", refresh);
app.post("/api/accounts/account", jwtAuth, (req: any, res) => {
  return res.status(201).json({ success: true, user: req.user });
});

app.delete("/api/accounts/logout", logout);

app.get("/api/accounts/:id/verify/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "Invalid link." });

    const userToken = await Token.findOne({ userId: id, token });
    if (!userToken) return res.status(404).json({ error: "Invalid link." });

    await user.updateOne({ verified: true });
    await userToken.remove();

    res
      .status(201)
      .json({ success: true, message: "User verified successfully." });
  } catch (err) {
    res.status(500).json({ error: "There was an error verifying the user." });
  }
});

app.get("/api/games/info", info);

app.listen(PORT, () => {
  Logger.ready(
    `Server has been initiated and is live on http://localhost:${PORT}/`,
    "server"
  );

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      Logger.ready(
        "Connection to MongoDB Cluster has been established!",
        "database"
      );

      updateGamesInfo();
    })
    .catch((err) => {
      Logger.error(
        "There was an error connecting with the database.",
        err,
        "database"
      );
    });
});

export { Logger };
