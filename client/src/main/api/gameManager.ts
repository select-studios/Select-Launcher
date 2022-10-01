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


// BUG HERE 
// FOR SOME REASON THE CODE WANTS TO SEE "${GAMENAME}.zip as a whole thing"
// so when its looking for the _info files its looking for "AceRace.zip_info"
// as appose to AceRace_info

// I've tried everything and it insists on being a cunt.

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

        // Delete zip
        fs.unlink(
          path.join(
            os.homedir(),
            'AppData',
            'Roaming',
            'Select Games',
            `${gameName}.zip`
          ),
          (error) => {
            if (error) {
              console.log(
                `Error occurred while uninstalling ${gameName}: ${error}`
              );
            }
          }
        );
      }
    }
  );
};

export const uninstallGame = async (gameName: string) => {
  if (!checkIfGamesDirectoryExists()) {
    fs.mkdir(
      path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games'),
      () => console.log('created games folder')
    );
  }
  fs.rmSync(
    path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games', gameName),
    { recursive: true, force: true }
  );
};

export const updateGame = () => {
  console.log('unimplemented');
};
