import { ipcRenderer } from "electron";

// Contains all the methods exported to the renderer process.
window.gamesAPI = {
  getStorageLocation: () => ipcRenderer.sendSync("get-storage-location"),
  setStorageLocation: (location: string) =>
    ipcRenderer.sendSync("set-storage-location", location),
  downloadGame: (game: string) => ipcRenderer.sendSync("download-game", game),
  cancelDownloadGame: (game: string) =>
    ipcRenderer.sendSync("cancel-download-game", game),
  installGame: (game: string) => ipcRenderer.sendSync("install-game", game),
  cleanupGame: (game: string) => ipcRenderer.sendSync("cleanup-game", game),
  uninstallGame: (game: string) => ipcRenderer.sendSync("uninstall-game", game),
  startGame: (game: string) => ipcRenderer.sendSync("start-game", game),
};

window.filesAPI = {
  openFolder: () => ipcRenderer.invoke("dialog:openFolder"),
};
