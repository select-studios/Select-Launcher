import { makeAutoObservable } from "mobx";
export class SidebarStore_Impl {
  open: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setOpen(open: boolean) {
    this.open = open;
  }
}

export const SidebarStore = new SidebarStore_Impl();
