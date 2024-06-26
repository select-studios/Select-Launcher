import { Game } from "../../models";
import gamesData from "../../data/games";
import { Logger } from "../../app";

const updateGamesInfo = () => {
  Game.find({}).then((games) => {
    games.forEach(async (game) => {
      if (!gamesData.find((gameData) => gameData.name === game.name)) {
        await Game.findOneAndDelete({ name: game.name });
      }
    });
  });

  gamesData.forEach(async (game) => {
    await Game.findOneAndUpdate({ name: game.name }, game, {
      upsert: true,
    }).then(() => Logger.success("Games updation successful."));
  });
};

export default updateGamesInfo;
