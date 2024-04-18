import { makeAutoObservable } from "mobx";

export type SearchType = "game" | "library" | "settings";

interface Search {
  type: SearchType;
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
