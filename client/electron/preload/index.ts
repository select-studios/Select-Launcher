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
  installGame: (game: string) => ipcRenderer.sendSync("install-game", game),
  cleanupGame: (game: string) => ipcRenderer.sendSync("cleanup-game", game),
};

window.filesAPI = {
  openFolder: () => ipcRenderer.invoke("dialog:openFolder"),
};
