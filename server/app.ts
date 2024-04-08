import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as cookieParser from "cookie-parser";
import { apiRouter } from "./routes";

import { Log } from "./utils/handlers/index";
import jwtAuth from "./middleware/jwt";
import bodyParser = require("body-parser");
import { Token, User } from "./models";
import info from "./routes/api/games/info";
import updateGamesInfo from "./utils/helpers/updateGamesInfo";
import crypto = require("crypto");
import { sendEmail } from "./utils/helpers/sendEmail";
import path = require("path");
import { VerifyEmail } from "./data/emails/verify/verify";
import { ForgotPassword } from "./data/emails/forgotPassword/forgotPassword";
import { Octokit } from "octokit";

require("dotenv").config();
mongoose.set("strictQuery", false);

const Logger = new Log();
const app = express();
const PORT = process.env.PORT || 4757;

const router = express.Router();
const octokit = new Octokit();

// Middleware
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", apiRouter);

app.post("/api/accounts/verify/link", jwtAuth, async (req: any, res) => {
  const { user } = req;

  if (!user)
    return res
      .status(403)
      .json({ success: false, msg: "User does not exist." });
  else if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.remove();
    }

    const newToken = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.API_URI}/accounts/${user._id}/rg/verify?token=${newToken.token}`;
    await sendEmail(
      VerifyEmail({ username: user.username, url }),
      {
        to: user.email,
        subject: "Select Studios - Verify your registration.",
      },
      url
    );

    return res
      .status(201)
      .json({ msg: "An e-mail has been sent to your account." });
  } else {
    return res.status(401).json({ msg: "User is already verified." });
  }
});

app.post("/api/github/release", async (req: any, res) => {
  const { version } = req.body;

  octokit
    .request(
      `GET /repos/select-studios/select-launcher/releases/tags/v${version}`,
      {
        owner: "Select-Studios",
        repo: "select-launcher",
        tag: `v${version}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    )
    .then((data: any) => {
      const { body, published_at } = data.data;
      return res
        .status(201)
        .json({ success: true, data: { body, published_at } });
    })
    .catch((err: any) => {
      return res.status(500).json({ success: false, msg: err });
    });
});

app.get("/api/accounts/:id/:method/verify", async (req, res) => {
  // method -> pswd (password) | rg (registration)
  const { id, method } = req.params;
  const { token, newPass } = req.query;

  if (method == "rg") {
    try {
      const user = await User.findById(id);
      if (!user)
        return res
          .status(404)
          .json({ error: "Invalid link. User does not exist." });

      const userToken = await Token.findOne({ userId: id, token });
      if (!userToken)
        return res.status(404).json({
          error: "Invalid link. User might not be pending verification.",
        });

      await user.updateOne({ verified: true });
      await userToken.remove();

      res.redirect(`select-launcher://store?verified=true&id=${id}`);
    } catch (err) {
      res.status(500).json({ error: "There was an error verifying the user." });
    }
  } else if (method == "pswd") {
    try {
      const user = await User.findOne({ email: id });
      if (!user) return res.status(404).json({ error: "Invalid link." });

      const url = `${process.env.API_URI}/accounts/account/forgotpassword?id=${user._id}&newPass=${newPass}`;

      await sendEmail(
        ForgotPassword({
          username: user.username,
          newPass: newPass as string,
          url,
        }),
        {
          to: user.email,
          subject: "Select Studios - New password request.",
        },
        url
      );

      res.status(201).json({ success: true, msg: "E-mail sent successfully." });
    } catch (err) {
      res.status(500).json({
        error: "Server issue. There was an error sending the email. " + err,
      });
    }
  }
});

app.listen(PORT, () => {
  Logger.ready(
    `Server has been initiated and is live on ${process.env.API_URI}`,
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

export { Logger, router };
