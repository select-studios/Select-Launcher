import { ipcMain } from "electron";
import settings from "electron-settings";
import path from "path";
import { homedir } from "os";

function runIpcStorageEvents(): void {
  ipcMain.on("get-storage-location", (event) => {
    const location = settings.getSync("locations.libraryLocation");

    if (location === undefined) {
      settings.setSync("locations", {
        libraryLocation: path.join(
          homedir(),
          "AppData",
          "Roaming",
          "Select Games"
        ),
      });
      console.log("set library locations");
      const newLocation = settings.getSync("locations.libraryLocation");
      event.returnValue = newLocation;
    } else {
      event.returnValue = location;
    }
  });

  ipcMain.on("set-storage-location", (event, location) => {
    settings.setSync("locations", {
      libraryLocation: location,
    });
    const newLocation = settings.getSync("locations.libraryLocation");
    event.returnValue = newLocation;
  });
}

export default runIpcStorageEvents;
