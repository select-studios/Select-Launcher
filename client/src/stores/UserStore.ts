import { action, makeObservable, observable } from "mobx";

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class UserStore_Impl {
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  setUser(user: User) {
    this.user = user;
  }
}

export const UserStore = new UserStore_Impl();
