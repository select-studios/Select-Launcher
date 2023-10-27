import { ipcMain } from "electron";
import settings from "electron-settings";
import path from "path";
import { homedir } from "os";

function runIpcStorageEvents(): void {
  ipcMain.on("get-storage-location", (event) => {
    event.returnValue = getLibraryLocation();
  });

  ipcMain.on("set-storage-location", (event, location) => {
    event.returnValue = setLibraryLocation(location);
  });
}

//#region Helper Functions
/**
 * Sets library location to the provided location and returns it.
 *
 * @param {any} location - The location to be set.
 * @returns {string} - The new set location.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setLibraryLocation(location: any): string {
  settings.setSync("locations", {
    libraryLocation: location,
  });
  const newLocation = settings.getSync("locations.libraryLocation");
  return newLocation.toString();
}

/**
 * Gets the current library location and returns it.
 *
 * @returns {string} - The current library location
 */
function getLibraryLocation(): string {
  const location = settings.getSync("locations.libraryLocation");

  if (location === undefined) {
    // If location is not initialized set it.
    setLibraryLocation(
      path.join(homedir(), "AppData", "Roaming", "Select Games"),
    );
    console.log("set library locations");
    const newLocation = settings.getSync("locations.libraryLocation");
    return newLocation.toString();
  } else {
    return location.toString();
  }
}
//#endregion

export default runIpcStorageEvents;
