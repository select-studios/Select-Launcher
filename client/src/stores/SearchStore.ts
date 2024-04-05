import { makeAutoObservable } from "mobx";

interface Search {
  type: "game" | "library" | "settings";
  query: string;
}

export class SearchStore_Impl {
  search: Search = { type: "game", query: "" };

  constructor() {
    makeAutoObservable(this);
  }

  setSearch(search: Search) {
    this.search = search;
  }
}

export const SearchStore = new SearchStore_Impl();
