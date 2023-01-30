import fs from "fs";
import path from "path";
import os from "os";
import download from "download";
import settings from "electron-settings";

export const checkIfGamesDirectoryExists = (): boolean => {
  if (
    fs.existsSync(path.join(os.homedir(), "AppData", "Roaming", "Select Games"))
  ) {
    return true;
  }
  return false;
};

export const downloadGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(
      path.join(os.homedir(), "AppData", "Roaming", "Select Games"),
      () => console.log("created games folder")
    );
  }

  download(
    `https://raw.githubusercontent.com/select-studios/LauncherGames/main/${gameName}.zip`,
    await (await settings.get("locations.libraryLocation")).toString(),
    { decompress: true }
  );
};

export const uninstallGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(
      path.join(os.homedir(), "AppData", "Roaming", "Select Games"),
      () => console.log("created games folder")
    );
  }
  fs.rmSync(
    path.join(os.homedir(), "AppData", "Roaming", "Select Games", gameName),
    { recursive: true, force: true }
  );
};

export const updateGame = () => {
  console.log("unimplemented");
};
