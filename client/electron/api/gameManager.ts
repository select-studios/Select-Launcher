import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import download from "download";
import settings from "electron-settings";
import decompress from "decompress";
import { win } from "../main/index";

import Downloader from "nodejs-file-downloader";

export const checkIfGamesDirectoryExists = (): boolean => {
  if (fs.existsSync(settings.getSync("locations.libraryLocation").toString())) {
    return true;
  }
  return false;
};

export const downloadGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("Created games folder.")
    );
  }

  const downloader = new Downloader({
    url: `https://gitlab.com/akshit.singla.dps/launcher-games/-/raw/main/${gameName}.zip?inline=false`, //If the file name already exists, a new file with the name 200MB1.zip is created.
    directory: settings.getSync("locations.libraryLocation").toString(), //This folder will be created, if it doesn't exist.
    maxAttempts: 3, //Default is 1.
    onError: function (error) {
      //You can also hook into each failed attempt.
      console.log("Error from attempt ", error);
    },
    onProgress: function (percentage, chunk, remainingSize) {
      win.webContents.send("downloading", {
        gameName,
        percentage,
        remainingSize,
        msg: `Downloading... ${Number(percentage).toFixed(0)}% done.`,
      });
    },
  });

  // download(
  //   `https://raw.githubusercontent.com/select-studios/LauncherGames/main/${gameName}.zip`,
  //   settings.getSync("locations.libraryLocation").toString(),
  //   { decompress: false }
  // )
  //   .then(() => {
  //     installGame(gameName);
  //     return;
  //   })
  //   .catch((e) => );

  try {
    downloader
      .download()
      .then(() => {
        win.webContents.send("downloading", {
          gameName,
          msg: `Installing ${gameName}...`,
        });
        installGame(gameName);
      })
      .then(() => {
        win.webContents.send("downloading", {
          gameName,
          msg: ``,
        });
        console.log("Finished installing the game.");
      });
  } catch (error) {
    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log("Download failed", error);
  }
};

export const installGame = (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("Created games folder")
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
      settings.getSync("locations.libraryLocation").toString()
    )
      .then(() => {
        cleanupGame(gameName);
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
  win.webContents.send("downloading", {});
  win.webContents.send("finish-download", `Finished installing ${gameName}!`);
};

export const uninstallGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("Created games folder")
    );
  }
  fs.rmSync(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName
    ),
    { recursive: true, force: true }
  );

  win.webContents.send("finish-uninstall", `Finished uninstalling ${gameName}`);
};

export const startGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("Created games folder.")
    );
  }

  execFile(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName,
      `${gameName}.exe`
    )
  );
};

export const updateGame = () => {
  console.log("unimplemented");
};
