import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { Log } from "./utils/handlers/index";
dotenv.config();

const Logger = new Log();
const app = express();
const PORT = process.env.PORT || 4757;
const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

// Middleware
app.use(cors());
app.use(express.json());

app.get("/posts", authenticateToken, (req: any, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

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
    })
    .catch((err) => {
      Logger.error(
        "There was an error connecting with the database.",
        err,
        "database"
      );
    });
});
