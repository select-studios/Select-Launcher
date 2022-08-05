import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import decompress from 'decompress';

const checkIfGamesDirectoryExists = (): boolean => {
  if (
    fs.existsSync(path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games'))
  ) {
    return true;
  }
  return false;
};

export const downloadGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(
      path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games'),
      () => console.log('created games folder')
    );
  }
  process.chdir(path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games'));
  exec(
    `curl -0 "https://raw.githubusercontent.com/select-studios/LauncherGames/main/${gameName}.zip" -o ${gameName}.zip`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(`An error occured while downloading ${gameName}: ${err}`);
      } else {
        decompress(
          path.join(
            os.homedir(),
            'AppData',
            'Roaming',
            'Select Games',
            `${gameName}.zip`
          ),
          path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games')
        );
        console.log(`successfully downloaded ${gameName}`);
      }
    }
  );
};

export const uninstallGame = () => {
  console.log('unimplemented');
};

export const updateGame = () => {
  console.log('unimplemented');
};
