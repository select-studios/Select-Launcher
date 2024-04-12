import { makeAutoObservable } from "mobx";

type Theme = "light" | "dark" | "accent";

export class ThemeStore_Impl {
  theme: Theme = "dark";

  constructor() {
    makeAutoObservable(this);
  }

  getTheme() {
    const theme = (localStorage.getItem("theme") as Theme) || "dark";

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
