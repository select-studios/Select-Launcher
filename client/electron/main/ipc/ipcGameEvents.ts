import { ipcMain } from "electron";
import {
  downloadGame,
  installGame,
  cleanupGame,
  uninstallGame,
  startGame,
} from "../../api/gameManager";

// States that a game can be in
type gameEventStates =
  | "downloading"
  | "installing"
  | "cleaning up"
  | "uninstalling";

/**
 * runIpcGameEvents.
 */
function runIpcGameEvents() {
  ipcMain.on("download-game", async (event, game) => {
    const result = await downloadGame(game);
    processError(result, "downloading", event, game);
  });

  ipcMain.on("install-game", async (event, game) => {
    const result = await installGame(game);
    processError(result, "installing", event, game);
  });

  ipcMain.on("cleanup-game", async (event, game) => {
    cleanupGame(game);
    event.returnValue = `successfully cleaned up ${game}`; // TODO:add error checking
  });

  ipcMain.on("uninstall-game", async (event, game) => {
    uninstallGame(game);
    event.returnValue = `successfully uninstalled ${game}`; // TODO:add error checking
  });

  ipcMain.on("start-game", async (event, game) => {
    startGame(game);
    event.returnValue = `successfully started ${game}`; // TODO:add error checking
  });

  ipcMain.on("get-installed-games", async (e, games) => {});

  ipcMain.on("set-installed-games", async (e, games) => {});
}

//#region Helper functions
/**
 * Common function to parse errors game state.
 *
 * @param {any} result - the result to the performed operating
 * @param {gameEventStates} occuredInState - state during which the operation occured
 * @param {Electron.IpcMainEvent} event - ipc event which triggered this function
 * @param {any} game - game on which the operation is being performed
 * @returns {void}
 */
function processError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any,
  occuredInState: gameEventStates,
  event: Electron.IpcMainEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  game: any,
): void {
  if (result == null) {
    event.returnValue = `an error occured while ${occuredInState}`;
  } else {
    event.returnValue = `${occuredInState} completed successfully for ${game}`;
  }
}
//#endregion

export default runIpcGameEvents;
