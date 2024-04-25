import { makeAutoObservable } from "mobx";

type Theme =
  | "light"
  | "midnight"
  | "midnight-purple"
  | "minecraft"
  | "spearmint"
  | "aquatica"
  | "discord";

export class ThemeStore_Impl {
  theme: Theme = "midnight";

  constructor() {
    makeAutoObservable(this);
  }

  getTheme() {
    const theme = (localStorage.getItem("theme") as Theme) || "midnight";

    document.getElementById("mainApp")!.className =
      theme + " text-foreground bg-background";

    this.theme = theme;

    return theme;
  }

  setTheme(theme: Theme) {
    localStorage.setItem("theme", theme);
    document.getElementById("mainApp")!.className =
      theme + " text-foreground bg-background";

    this.theme = theme;
  }
}

export const ThemeStore = new ThemeStore_Impl();
