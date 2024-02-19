import { app } from "electron";
import { release } from "os";
import path, { join } from "path";

/**
 * Sets up global variables.
 */
export function globalSetup() {
  // Global Variable Setups
  process.env.DIST_ELECTRON = join(__dirname, "../..");
  process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
  process.env.PUBLIC = app.isPackaged
    ? process.env.DIST
    : join(process.env.DIST_ELECTRON, "../public");

  // Disable GPU Acceleration for Windows 7
  if (release().startsWith("6.1")) app.disableHardwareAcceleration();
  // Set application name for Windows 10+ notifications
  if (process.platform === "win32") app.setAppUserModelId(app.getName());

  // Make sure only one instance of the app is running
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
  }

  // Sets the certain external links to be opened with the select launcher.
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient("select-launcher", process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient("select-launcher");
  }
}
