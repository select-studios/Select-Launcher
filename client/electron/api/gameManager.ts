import fs from "fs";
import path from "path";
import os from "os";
import download from "download";
import settings from "electron-settings";
import decompress from "decompress";

export const checkIfGamesDirectoryExists = (): boolean => {
  if (fs.existsSync(settings.getSync("locations.libraryLocation").toString())) {
    return true;
  }
  return false;
};

export const downloadGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
    );
  }

  await download(
    `https://raw.githubusercontent.com/select-studios/LauncherGames/main/${gameName}.zip`,
    settings.getSync("locations.libraryLocation").toString(),
    { decompress: false }
  )
    .then(() => {
      return;
    })
    .catch((e) => {
      console.log(`Failed to download ${gameName} because of ${e}`);
      return null;
    });
};

export const installGame = (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
    );
  }

  if (
    fs.existsSync(
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        `${gameName}.zip`
      )
    )
  ) {
    decompress(
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        `${gameName}.zip`
      ),
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        gameName
      )
    )
      .then(() => {
        return;
      })
      .catch((e) => {
        console.log(`Failed to install ${gameName} because of ${e}`);
        return null;
      });
  } else {
    console.log(`${gameName} not downloaded`);
  }
};

export const cleanupGame = (gameName: string) => {
  fs.rmSync(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      `${gameName}.zip`
    ),
    { force: true }
  );
};

export const uninstallGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
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
