import { Card, CardHeader, Chip } from "@nextui-org/react";
import React, { FC } from "react";
import themes from "../../../../../themes.json";
import { ThemeStore } from "@/stores/ThemeStore";

interface IProps {
  theme: "light" | "dark" | "accent";
}

/**
 * @author
 * @function @AppSettingsThemeCard
 **/

export const AppSettingsThemeCard: FC<IProps> = ({ theme }) => {
  const themeColors = themes[theme].colors;

  return (
    <div
      className={"rounded-xl p-4 py-3 h-32 mr-5 cursor-pointer"}
      onClick={() => ThemeStore.setTheme(theme)}
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.foreground,
      }}
    >
      <p className="text-xl uppercase font-heading">{theme}</p>
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
