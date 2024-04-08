import { ipcRenderer } from "electron";

// function domReady(
//   condition: DocumentReadyState[] = ["complete", "interactive"]
// ) {
//   return new Promise((resolve) => {
//     if (condition.includes(document.readyState)) {
//       resolve(true);
//     } else {
//       document.addEventListener("readystatechange", () => {
//         if (condition.includes(document.readyState)) {
//           resolve(true);
//         }
//       });
//     }
//   });
// }

// const safeDOM = {
//   append(parent: HTMLElement, child: HTMLElement) {
//     if (!Array.from(parent.children).find((e) => e === child)) {
//       return parent.appendChild(child);
//     }
//   },
//   remove(parent: HTMLElement, child: HTMLElement) {
//     if (Array.from(parent.children).find((e) => e === child)) {
//       return parent.removeChild(child);
//     }
//   },
// };

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
