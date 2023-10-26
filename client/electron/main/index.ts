import { app, BrowserWindow, shell } from "electron";
import settings from "electron-settings";
import path, { join } from "path";
import fs from "fs";
import runIpcStorageEvents from "./ipc/ipcStorageEvents";
import runIpcGameEvents from "./ipc/ipcGameEvents";
import { checkIfGamesDirectoryExists } from "../api/gameManager";
import { callHandlers, handleExternAuthentication } from "./eventHandlers";
import { globalSetup } from "./globalSetup";

// global scoped constants
export let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
globalSetup();

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

callHandlers(win, preload, indexHtml);

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  handleExternAuthentication(win);

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(async () => {
    createWindow();

    // create game storage directory
    if (!checkIfGamesDirectoryExists) {
      fs.mkdir(
        path.join(settings.getSync("locations.libraryLocation").toString()),
        () => console.log("created games folder"),
      );
      return;
    }

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
