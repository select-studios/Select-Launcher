import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import download from "download";
import settings from "electron-settings";
import decompress from "decompress";
import { win } from "../main/index";
import { createWriteStream } from "original-fs";
import Axios from "axios";
import * as stream from "stream";
import { promisify } from "util";
import request from "request";

export async function downloadFile(
  fileUrl: string,
  outputLocationPath: string
): Promise<any> {
  request(fileUrl)
    .pipe(fs.createWriteStream(outputLocationPath))
    .on("close", function () {
      console.log("File written!");
    });
}

export const checkIfGamesDirectoryExists = (): boolean => {
  if (fs.existsSync(settings.getSync("locations.libraryLocation").toString())) {
    return true;
  }
  return false;
};

export const downloadGame = (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
    );
  }

  // download(
  //   `https://raw.githubusercontent.com/select-studios/LauncherGames/main/${gameName}.zip`,
  //   settings.getSync("locations.libraryLocation").toString(),
  //   { decompress: false }
  // )
  //   .then(() => {
  //     installGame(gameName);
  //     return;
  //   })
  //   .catch((e) => );

  downloadFile(
    `https://raw.githubusercontent.com/select-studios/LauncherGames/main/${gameName}.zip`,
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName + ".zip"
    )
  )
    .then(() => installGame(gameName))
    .catch((e) => {
      console.log(`Failed to download ${gameName} because of ${e}`);
      return null;
    });
};

export const installGame = (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
    );
  }

  if (
    fs.existsSync(
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        `${gameName}.zip`
      )
    )
  ) {
    decompress(
      path.join(
        settings.getSync("locations.libraryLocation").toString(),
        `${gameName}.zip`
      ),
      settings.getSync("locations.libraryLocation").toString()
    )
      .then(() => {
        cleanupGame(gameName);
        return;
      })
      .catch((e) => {
        console.log(`Failed to install ${gameName} because of ${e}`);
        return null;
      });
  } else {
    console.log(`${gameName} not downloaded`);
  }
};

export const cleanupGame = (gameName: string) => {
  fs.rmSync(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      `${gameName}.zip`
    ),
    { force: true }
  );
  win.webContents.send("finish-download", `Finished downloading ${gameName}`);
};

export const uninstallGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
    );
  }
  fs.rmSync(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName
    ),
    { recursive: true, force: true }
  );
  win.webContents.send("finish-uninstall", `Finished uninstalling ${gameName}`);
};

export const startGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(settings.getSync("locations.libraryLocation").toString(), () =>
      console.log("created games folder")
    );
  }

  execFile(
    path.join(
      settings.getSync("locations.libraryLocation").toString(),
      gameName,
      `${gameName}.exe`
    )
  );
};

export const updateGame = () => {
  console.log("unimplemented");
};
