import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';

const tmpdir = os.tmpdir();
export const CheckTmpDir = (): boolean => {
  const files = fs.existsSync(
    path.join(tmpdir, 'SelectLauncher', 'LauncherGamesInfo')
  );

  if (files) {
    console.log('Found Launcher Info folder!');
    return true;
  }
  return false;
};

export const CreateTmpDir = () => {
  fs.mkdir(path.join(tmpdir, 'SelectLauncher'), (err) => {
    if (err) console.log(err);
    else console.log('Created tmp dir');
  });
};

export const CloneGameInfo = () => {
  process.chdir(path.join(tmpdir, 'SelectLauncher'));
  exec(
    'git clone https://github.com/select-studios/LauncherGamesInfo.git',
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
      } else {
        console.log('Cloned game info!');
      }
    }
  );
};

export const FetchNewGames = async () => {
  process.chdir(path.join(tmpdir, 'SelectLauncher', 'LauncherGamesInfo'));
  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
    } else {
      console.log('Fetched latest games!');
    }
  });
};
