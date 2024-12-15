import { ipcRenderer } from "electron";

window.gamesAPI = {
  getStorageLocation: () => ipcRenderer.sendSync("get-storage-location"),
  setStorageLocation: (location: string) =>
    ipcRenderer.sendSync("set-storage-location", location),
  downloadGame: (game: string, accessToken: string) =>
    ipcRenderer.sendSync("download-game", game, accessToken),
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
    signIn: (email: string, password: string) =>
      ipcRenderer.sendSync("accounts-signin", email, password),
    refresh: (refreshToken: string) =>
      ipcRenderer.sendSync("accounts-refresh", refreshToken),
    logout: (accessToken: string) =>
      ipcRenderer.sendSync("accounts-logout", accessToken),
    forgotPassword: (uuid: string, new_password: string) =>
      ipcRenderer.sendSync("accounts-forgotPassword", uuid, new_password),
    edit: {
      editAccount: (username: string, email: string, accessToken: string) =>
        ipcRenderer.sendSync(
          "accounts-edit-editAccount",
          username,
          email,
          accessToken
        ),
      uploadPFP: (avatar_location: string, accessToken: string) =>
        ipcRenderer.sendSync(
          "accounts-edit-uploadPFP",
          avatar_location,
          accessToken
        ),
      addGame: (new_game: string, accessToken: string) =>
        ipcRenderer.sendSync("accounts-edit-addGame", new_game, accessToken),
      removeGame: (remove_game: string, accessToken: string) =>
        ipcRenderer.sendSync(
          "accounts-edit-removeGame",
          remove_game,
          accessToken
        ),
    },
  },
  games: {
    getGamesInfo: () => ipcRenderer.sendSync("games-getGamesInfo"),
  },
  moderation: {
    banUser: (uuid: string, reason: string, accessToken: string) =>
      ipcRenderer.sendSync("moderation-banUser", uuid, reason, accessToken),
    unBan: (uuid: string, accessToken: string) =>
      ipcRenderer.sendSync("moderation-unBan", uuid, accessToken),
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
