import { ipcMain } from "electron";
import settings from "electron-settings";
import path from "path";
import { homedir } from "os";

function runIpcStorageEvents(): void {
  ipcMain.on("get-storage-location", async (event) => {
    const location = await settings.get("locations.libraryLocation");

    if (location === undefined) {
      await settings.set("locations", {
        libraryLocation: path.join(
          homedir(),
          "AppData",
          "Roaming",
          "Select Games"
        ),
      });
      console.log("set library locations");
      const newLocation = await settings.get("locations.libraryLocation");
      event.returnValue = newLocation;
    } else {
      event.returnValue = location;
    }
  });

  ipcMain.on("set-storage-location", async (event, location) => {
    await settings.set("locations", {
      libraryLocation: location,
    });
    const newLocation = await settings.get("locations.libraryLocation");
    event.returnValue = newLocation;
  });
}

export default runIpcStorageEvents;
