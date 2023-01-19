import { Request, Response } from "express-serve-static-core";
import { Games } from "../../../interfaces";
import { Game } from "../../../models";

const info = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    Game.find({}, (err, games: Games[]) => {
      if (err) return res.status(500).json({ error: "Error fetching users" });
      else return res.json(games);
    });
  }

  await Game.findById(id).then((game) => {
    if (!game) return res.status(404).json({ error: "Game not found" });
    else return res.json(game);
  });
};

export default info;
