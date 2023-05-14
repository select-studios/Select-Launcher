import { makeAutoObservable } from "mobx";

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  moderator: boolean;
  verified: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class UserStore_Impl {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }
}

export const UserStore = new UserStore_Impl();
