import * as fs from "fs";
import path = require("path");
import { Games } from "../interfaces";

const gamesData: Games[] = [
  {
    name: "AceRace",
    downloadName: "AceRace-1.0",
    description:
      "Fast pace action experience. An experience that is hand-picked to be enjoyed by players. Movement designed to immerse you in the experience of AceRace. Your objective is to reach the end of the game without dying once! Doing so will give you a surprise level!",
    image: {
      icon: "https://i.imgur.com/c30fFsi.png",
    },
    tags: ["action", "adventure"],
    publisher: "Select Studios.",
    developer: "Select Studios.",
    platforms: ["windows"],
    price: "free",
    verified: true,
  },
  {
    name: "Rosehill",
    downloadName: "Rosehill-0.5",
    description:
      "I can't live with the idea I might never see him again; This is a death mission, but I'm willing. Enter the school haunted by the past dodge anything that wants to rip your soul out of your body. Because what's on the other side is much... much more horrifying.",
    image: {
      icon: "https://i.imgur.com/c30fFsi.png",
    },
    tags: ["horror", "thriller"],
    price: "free",
    publisher: "Select Studios.",
    developer: "Select Studios.",
    platforms: ["windows"],
    verified: true,
  },
];
export default gamesData;
