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

  ipcMain.on("get-installed-games", async (e, games) => {});

  ipcMain.on("set-installed-games", async (e, games) => {});
}

export default runIpcGameEvents;
