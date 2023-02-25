import { makeAutoObservable } from "mobx";

export class SidebarStoreImpl {
  isOpen: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }
}

export const SidebarStore = new SidebarStoreImpl();
