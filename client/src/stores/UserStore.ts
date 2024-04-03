import { makeAutoObservable } from "mobx";

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  moderator: boolean;
  verified: boolean;
  purchasedGames: string[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  banned: boolean;
}

export class UserStore_Impl {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  setPurchasedGames(games: string[]) {
    this.user!.purchasedGames = games;
  }
}

export const UserStore = new UserStore_Impl();
