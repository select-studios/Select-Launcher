import { ipcMain } from "electron";
import { downloadGame, installGame, cleanupGame } from "../../api/gameManager";

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
}

export default runIpcGameEvents;
