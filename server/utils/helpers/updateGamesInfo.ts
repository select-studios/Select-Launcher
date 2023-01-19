import gamesData from "../../data/games";
import { Game } from "../../models";

const updateGamesInfo = () => {
  gamesData.forEach(async (game) => {
    const { name } = game;
    await Game.findOneAndUpdate({ name }, game, { upsert: true });
  });
};

export default updateGamesInfo;
