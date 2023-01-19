import { Request, Response } from "express-serve-static-core";
import { Games } from "../../../interfaces";
import { Game } from "../../../models";

const info = async (req: Request, res: Response) => {
  const { id } = req.query;

  const gamesData = await Game.find({});

  if (!id) {
    if (gamesData) return res.status(201).json(gamesData);
  }

  await Game.findById(id).then((game) => {
    if (!game) return res.status(404).json({ error: "Game not found" });
    else return res.status(201).json(game);
  });
};

export default info;
