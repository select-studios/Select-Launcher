import { ipcRenderer } from "electron";

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
  addInstalledGames: (gameName: string) =>
    ipcRenderer.sendSync("add-installed-games", gameName),
  getInstalledGames: () => ipcRenderer.sendSync("get-installed-games"),
  removeInstalledGames: (gameName: string) =>
    ipcRenderer.sendSync("remove-installed-games", gameName),
};

window.selectAPI = {
  testConnection: () => ipcRenderer.sendSync("test-connection"),
  accounts: {
    signUp: (
      username: string,
      email: string,
      backup_email: string,
      password: string
    ) =>
      ipcRenderer.sendSync(
        "accounts-signup",
        username,
        email,
        backup_email,
        password
      ),
  },
};

window.windowControls = {
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
};

window.filesAPI = {
  openFolder: () => ipcRenderer.invoke("dialog:openFolder"),
};

window.authAPI = {
  onVerificationSuccessful: () => ipcRenderer.sendSync("verification-success"),
};
