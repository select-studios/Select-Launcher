import { Card, CardHeader, Chip } from "@nextui-org/react";
import React, { FC } from "react";
import themes from "../../../../../themes.json";
import { ThemeStore } from "@/stores/ThemeStore";
import { UserStore } from "@/stores/UserStore";

interface IProps {
  theme:
    | "light"
    | "midnight"
    | "midnight-purple"
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
    light: "It is cold out here ❄️",
    midnight: "Yeah. That's what we like.",
    "midnight-purple": "Give the Launcher a splash of colour!",
    minecraft: "True gamer.",
    spearmint: "Runnin' hot.",
    aquatica: "The blue one.",
    discord: "Womp womp.",
  };

  return (
    <div
      className={"rounded-xl grid mb-5 p-4 py-3 h-40 mr-5 cursor-pointer"}
      onClick={() => ThemeStore.setTheme(theme)}
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.foreground,
      }}
    >
      <div>
        <p className="text-xl uppercase font-heading">
          {theme.split("-").join(" ")}
        </p>
        <p className="mt-1 text-sm font-medium">{themeDescriptions[theme]}</p>
      </div>

      <div className="flex items-end">
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
