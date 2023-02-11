import { Game } from "../../models";

const gamesData = [
  {
    name: "AceRace",
    downloadName: "AceRace-1.0",
    description:
      "Fast pace action experience. An experience that is hand-picked to be enjoyed by players. Movement designed to immerse you in the experience of AceRace. Your objective is to reach the end of the game without dying once! Doing so will give you a surprise level!",
    image: {
      icon: "https://i.imgur.com/8Q9QY0l.png",
    },
    tags: ["action", "momentum", "fast"],
    verified: true,
  },
  {
    name: "Rosehill",
    downloadName: "Rosehill-0.5",
    description:
      "I can't live with the idea I might never see him again; this is a death mission, but I'm willing. Enter the school haunted by the past dodge anything that wants to rip your soul out of your body. Because what's on the other side is much... much more horrifying.",
    image: {
      icon: "https://i.imgur.com/8Q9QY0l.png",
    },
    tags: ["development", "horror"],
    verified: true,
  },
  {
    name: "Project L",
    downloadName: "Project_L-0.1",
    description: "Currently in development. Stay tuned!",
    image: {
      icon: "https://i.imgur.com/8Q9QY0l.png",
    },
    tags: ["next"],
    verified: true,
  },
];

const updateGamesInfo = () => {
  gamesData.forEach(async (game) => {
    const { name } = game;
    await Game.findOneAndUpdate({ name }, game, { upsert: true });
  });
};

export default updateGamesInfo;
