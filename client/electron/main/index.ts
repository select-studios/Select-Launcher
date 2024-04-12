process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  ipcRenderer,
} from "electron";
import settings from "electron-settings";
import { release } from "os";
import path, { join } from "path";
import fs from "fs";
import runIpcStorageEvents from "./ipc/ipcStorageEvents";
import runIpcGameEvents from "./ipc/ipcGameEvents";
import { checkIfGamesDirectoryExists } from "../api/gameManager";
import { autoUpdater } from "electron-updater";
import runWindowControlEvents from "./ipc/ipcWindowControlEvents";
// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

export let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("select-launcher", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("select-launcher");
}

async function createWindow() {
  win = new BrowserWindow({
    title: "Select Launcher",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    minWidth: 900,
    minHeight: 500,
  });
  win.setMenuBarVisibility(false);

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools({ mode: "right" });
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.setVisualZoomLevelLimits(1, 1);
  win.on("close", () => {
    win = null;
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

const gotTheLock = app.requestSingleInstanceLock();

async function handleFolderOpen() {
  const currentLibraryPath = await (
    await settings.get("locations.libraryLocation")
  ).toString();
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    title: "Select Library Location",
    defaultPath: currentLibraryPath,
    properties: ["openDirectory"],
  });
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", async (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      if (commandLine[3].includes("select-launcher://store")) {
        setTimeout(() => {
          win.webContents.send("verification-success");
        }, 2000);
      }
    }
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(async () => {
    // if (app.isPackaged) {
    //   await checkForUpdates();
    // }

    createWindow();

    // create game storage directory
    if (!checkIfGamesDirectoryExists) {
      fs.mkdir(
        path.join(settings.getSync("locations.libraryLocation").toString()),
        () => console.log("created games folder")
      );
      return;
    }

    ipcMain.handle("dialog:openFolder", handleFolderOpen);
    runIpcStorageEvents();
    runIpcGameEvents();
    runWindowControlEvents(win);
  });

  // Handle the protocol. In this case, we choose to show an Error Box.
  app.on("open-url", (event, url) => {
    dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
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

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

app.on("ready", () => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available", (info) => {
  win.webContents.send(
    "update_available",
    `Updates are available! v${info.version} is ready to be installed.\n\nPlease wait while we update your Launcher.`
  );
});
autoUpdater.on("update-downloaded", () => {
  win.webContents.send(
    "update_downloaded",
    `Update has been downloaded!\n\nRestarting now...`
  );

  app.relaunch();
  app.quit();
});
