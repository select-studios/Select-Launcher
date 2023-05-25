import GameInfo from "@/interfaces/GameInfoInterface";
import { makeAutoObservable } from "mobx";

export class GamesStore_Impl {
  games: GameInfo[] | null = null;
  installedGames: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setGames(games: GameInfo[]) {
    this.games = games;
  }

  setInstalledGames(installedGames: string[]) {
    this.installedGames = installedGames;
  }
}

export const GamesStore = new GamesStore_Impl();
