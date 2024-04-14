import { Card, CardHeader, Chip } from "@nextui-org/react";
import React, { FC } from "react";
import themes from "../../../../../themes.json";
import { ThemeStore } from "@/stores/ThemeStore";
import { UserStore } from "@/stores/UserStore";

interface IProps {
  theme:
    | "light"
    | "dark"
    | "accent"
    | "minecraft"
    | "spearmint"
    | "aquatica"
    | "discord";
}

/**
 * @author
 * @function @AppSettingsThemeCard
 **/

export const AppSettingsThemeCard: FC<IProps> = ({ theme }) => {
  const themeColors = themes[theme].colors;
  const themeDescriptions = {
    light: "For all the light-headed gamers <3",
    dark: "Yeah. That's what we like.",
    accent: "Give the Launcher a splash of colour!",
    minecraft: "True gamer.",
    spearmint: "Runnin' hot.",
    aquatica: "The blue one.",
    discord: "Womp womp.",
  };

  return (
    <div
      className={"rounded-xl p-4 py-3 h-40 mr-5 cursor-pointer"}
      onClick={() => ThemeStore.setTheme(theme)}
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.foreground,
      }}
    >
      <p className="text-xl uppercase font-heading">{theme}</p>
      <p className="mt-1 text-sm font-medium">{themeDescriptions[theme]}</p>
      <div className="flex absolute bottom-0 mb-7 ">
        <div
          className="rounded-full p-4 mr-2"
          style={{ backgroundColor: themeColors.primary.DEFAULT }}
        ></div>
        <div
          className="rounded-full p-4 mr-2"
          style={{ backgroundColor: themeColors.content1 }}
        ></div>
        <div
          className="rounded-full p-4 mr-2"
          style={{ backgroundColor: themeColors.content2 }}
        ></div>
        <div
          className="rounded-full p-4 mr-2"
          style={{ backgroundColor: themeColors.foreground }}
        ></div>
      </div>
    </div>
  );
};
