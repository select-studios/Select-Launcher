import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import settings from "electron-settings";
import decompress from "decompress";
import { win } from "../main/index";

import Downloader from "nodejs-file-downloader";

/**
 * Check if the games directory actually exists and creates it if it does not.
 *
 * @returns {void}
 */
export const checkIfGamesDirectoryExistsAndCreate = (): void => {
  if (
    !fs.existsSync(settings.getSync("locations.libraryLocation").toString())
  ) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder"),
    );
  }
};

/**
 * Downloads the provided game into the library directory.
 *
 * @param {string} gameName - The name of the game to be downloaded
 */
export const downloadGame = async (gameName: string) => {
  checkIfGamesDirectoryExistsAndCreate();

  const downloader = new Downloader({
    url: `https://gitlab.com/akshit.singla.dps/launcher-games/-/raw/main/${gameName}.zip?inline=false`,
    directory: settings.getSync("locations.libraryLocation").toString(),
    maxAttempts: 3,
    onError: (error) => {
      console.log("Error from attempt ", error);
    },
    onProgress: (percentage, chunk, remainingSize) => {
      console.log("% ", percentage);

      win.webContents.send("downloading", {
        gameName,
        percentage,
        remainingSize,
        msg: `Downloading... ${Number(percentage).toFixed(0)}% done.`,
      });
    },
  });

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
          msg: "",
        });
        console.log("Finished installing the game.");
      });
  } catch (error) {
    //TODO:Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log("Download failed", error);
  }
};

/**
 * Install the give downloaded game.
 *
 * @param {string} gameName - The game to be installed.
 */
export const installGame = (gameName: string) => {
  checkIfGamesDirectoryExistsAndCreate();

  if (
    fs.existsSync(
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        `${gameName}.zip`,
      ),
    )
  ) {
    // Decompress the installed zip
    decompress(
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        `${gameName}.zip`,
      ),
      settings.getSync("locations.libraryLocation").toString(),
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

/**
 * Deletes the zip file downloaded after it has been extracted.
 *
 * @param {string} gameName - The game to be cleaned up.
 */
export const cleanupGame = (gameName: string) => {
  fs.rmSync(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      `${gameName}.zip`,
    ),
    { force: true },
  );
  win.webContents.send("downloading", {});
  win.webContents.send("finish-download", `Finished installing ${gameName}!`);
};

/**
 * Uninstall the given game.
 *
 * @param {string} gameName - The game to be uninstalled.
 */
export const uninstallGame = async (gameName: string) => {
  checkIfGamesDirectoryExistsAndCreate();

  fs.rmSync(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName,
    ),
    { recursive: true, force: true },
  );

  win.webContents.send("finish-uninstall", `Finished uninstalling ${gameName}`);
};

/**
 * Start the given game's executable file.
 *
 * @param {string} gameName - The gam to be started
 */
export const startGame = async (gameName: string) => {
  checkIfGamesDirectoryExistsAndCreate();

  execFile(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName,
      `${gameName}.exe`,
    ),
  );
};

export const updateGame = () => {
  console.log("unimplemented");
};
