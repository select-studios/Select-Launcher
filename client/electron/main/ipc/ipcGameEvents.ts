import { ipcMain } from "electron";
import {
  downloadGame,
  installGame,
  cleanupGame,
  uninstallGame,
  startGame,
} from "../../api/gameManager";
import settings from "electron-settings";

function runIpcGameEvents() {
  ipcMain.on("download-game", async (event, game) => {
    const result = await downloadGame(game);
    if (result === null) {
      event.returnValue = `failed to download ${game}`;
    } else {
      event.returnValue = `download of ${game} successful`;
    }
  });
  ipcMain.on("install-game", async (event, game) => {
    const result = await installGame(game);

    if (result === null) {
      event.returnValue = `failed to install ${game}`;
    } else {
      event.returnValue = `install of ${game} successful`;
    }
  });
  ipcMain.on("cleanup-game", async (event, game) => {
    cleanupGame(game);
    event.returnValue = `successfully cleaned up install of ${game}`;
  });
  ipcMain.on("uninstall-game", async (event, game) => {
    uninstallGame(game);
    event.returnValue = `successfully uninstalled ${game}`;
  });
  ipcMain.on("start-game", async (event, game) => {
    startGame(game);
    event.returnValue = `successfully started ${game}`;
  });

  ipcMain.on("add-installed-games", async (event, gameName: string) => {
    const installedGames = settings.getSync("library.installedGames");

    if (installedGames === undefined) {
      await settings.set("library", {
        installedGames: [],
      });
    }

    await settings.set("library", {
      installedGames: [
        gameName,
        ...(settings.getSync("library.installedGames") as any),
      ],
    });

    event.returnValue =
      "Successfully added " + gameName + " to installed games.";
  });

  ipcMain.on("get-installed-games", async (event) => {
    const installedGames = settings.getSync("library.installedGames");

    if (installedGames === undefined) {
      settings.setSync("library", {
        installedGames: [],
      });
    }

    event.returnValue = settings.getSync("library.installedGames");
  });
}

export default runIpcGameEvents;
