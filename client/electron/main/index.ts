process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

import { app, BrowserWindow, shell } from "electron";
import { join } from "path";
import runIpcStorageEvents from "./ipc/ipcStorageEvents";
import runIpcGameEvents from "./ipc/ipcGameEvents";
import { checkIfGamesDirectoryExistsAndCreate } from "../api/gameManager";
import { callHandlers, handleExternAuthentication } from "./eventHandlers";
import { globalSetup } from "./globalSetup";

//#region Global Setups
export let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
globalSetup();
//#endregion

async function createWindow() {
  win = new BrowserWindow({
    title: "Select Launcher",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    minWidth: 1024,
    minHeight: 500,
  });

  // Handle dev tools
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

//#region Handlers
callHandlers(win, preload, indexHtml);

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  handleExternAuthentication(win);

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(async () => {
    createWindow();

    // create game storage directory
    checkIfGamesDirectoryExistsAndCreate();

    runIpcStorageEvents();
    runIpcGameEvents();
  });
}

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
//#endregion
