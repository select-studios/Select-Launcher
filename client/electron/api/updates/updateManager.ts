import { Release } from "../interfaces/release";
import axios from "axios";
import { neq, SemVer, parse } from "semver";
import { app } from "electron";
import { execFile } from "child_process";

export async function checkForUpdates() {
  var releases: Release[] = await axios
    .get("https://api.github.com/repos/select-studios/Select-Launcher/releases")
    .then((res) => res.data);
  var currentRelease = app.getVersion();
  var latestRelease: SemVer = parse(releases[0].tag_name);

  if (neq(latestRelease, currentRelease)) {
    update(latestRelease.format());
  }
}

function update(version: string) {
  console.log("starting updater");
  const pathToUpdater = process.execPath.replace(
    "Select Launcher.exe",
    "updater.exe"
  );
  execFile(`Start-Process`, [
    `-FilePath "${pathToUpdater}"`,
    "-Verb RunAs",
    `-ArgumentList "--version=\"${version}\""`,
  ]);
}
