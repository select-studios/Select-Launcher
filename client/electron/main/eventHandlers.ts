import { BrowserWindow, dialog, app, ipcMain } from "electron";
import settings from "electron-settings";
import { autoUpdater } from "electron-updater";

/**
 * Provides handlers to critical events in the app's lifecycle such as auto updaters, url handles etc..
 *
 * @param {BrowserWindow} win - The window which the handlers will hook on to
 * @param {string} preload - The preload file
 * @param {string} indexHtml - The index html file
 */
export async function callHandlers(
  win: BrowserWindow,
  preload: string,
  indexHtml: string,
) {
  // Quits when all windows are closed
  app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin") app.quit();
  });

  // Handles external websites linking back to the application.
  app.on("open-url", (event, url) => {
    dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
  });

  //#region Folder dialog handler
  // handles the dialog box to open folders.
  ipcMain.handle("dialog:openFolder", handleFolderOpen);

  /**
   * Handles opening external folders
   */
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
  //#endregion

  // handles child windows
  ipcMain.handle("open-win", (event, arg) => {
    const childWindow = new BrowserWindow({
      webPreferences: {
        preload,
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
      childWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${arg}`);
    } else {
      childWindow.loadFile(indexHtml, { hash: arg });
    }
  });

  //#region auto updates
  // This section handles auto updates
  app.on("ready", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
  autoUpdater.on("update-available", (info) => {
    win.webContents.send(
      "update_available",
      `Updates are available! v${info.version} is ready to be installed.\n\nFeel free to use the app while the update is being downloaded.`,
    );
  });
  autoUpdater.on("update-downloaded", () => {
    win.webContents.send(
      "update_downloaded",
      "Update has been downloaded! We will launch the next version when you restart the app.",
    );
  });
  //#endregion
}

/**
 * Handles account verification links.
 *
 * @param {BrowserWindow} win - The window for which the verification is taking place in.
 */
export async function handleExternAuthentication(win: BrowserWindow) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      win.reload();
      console.log(commandLine);
      if (commandLine[3].includes("select-launcher://home")) {
        dialog.showMessageBox({
          type: "info",
          title: "Select Launcher",
          message: "Account verification successful!",
        });
      }
    }
  });
}
