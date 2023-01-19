import * as fs from "fs";
import path = require("path");
import { Games } from "../interfaces";

const gamesDataJson = fs.readFileSync(
  path.join(__dirname, "../utils/json/gamesData.json"),
  "utf8"
);

const gamesData: Games[] = gamesDataJson ? JSON.parse(gamesDataJson) : [];

export default gamesData;
