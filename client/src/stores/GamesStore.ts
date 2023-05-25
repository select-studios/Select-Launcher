import GameInfo from "@/interfaces/GameInfoInterface";
import { makeAutoObservable } from "mobx";

export class GamesStore_Impl {
  games: GameInfo[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setGames(games: GameInfo[]) {
    this.games = games;
  }
}

export const GamesStore = new GamesStore_Impl();
