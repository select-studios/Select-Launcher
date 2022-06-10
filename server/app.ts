import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import accountRoutes from "./routes/accounts/index";
import accountManager from "./routes/accounts/accountManager";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "100kb", type: "application/json" }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/accounts/", accountRoutes);
app.use("/api/accounts/", accountManager);
app.get("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err["status"] = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to mongo successfully!");
    })
    .catch((err) => {
      console.log(`Could not connect to mongo because: ${err}`);
    });
});
