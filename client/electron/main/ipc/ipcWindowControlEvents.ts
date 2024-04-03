import { BrowserWindow, ipcMain, app } from "electron";

function runWindowControlEvents(window: BrowserWindow) {
  let maximizeToggle = false;

  ipcMain.on("close-window", (event) => {
    app.quit();
  });

  ipcMain.on("minimize-window", (event) => {
    window.minimize();
  });

  ipcMain.on("maximize-window", (event) => {
    if (maximizeToggle) {
      window.unmaximize();
    } else {
      window.maximize();
    }
    maximizeToggle = !maximizeToggle;
  });
}

export default runWindowControlEvents;
