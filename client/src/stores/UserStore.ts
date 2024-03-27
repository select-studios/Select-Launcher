import { makeAutoObservable } from "mobx";
import User from "@/interfaces/User";

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
