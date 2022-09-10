import fs from 'fs';
import path from 'path';
import os from 'os';

interface LibraryItem {
  name: string;
  description: string;
  logo: string;
  tags: string[];
}

const library: LibraryItem[] = [];

export const getLibrary = (): LibraryItem[] => {
  return library;
};

export const loadLibrary = () => {
  fs.readdir(
    path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games'),
    (err, games) => {
      if (err) {
        console.log(err);
      } else {
        games.forEach((game) => {
          fs.readdir(
            path.join(
              os.tmpdir(),
              'SelectLauncher',
              'LauncherGamesInfo',
              `${game}_info`
            ),
            (error, gameInfoFiles) => {
              if (error) {
                console.log(error);
              } else {
                const currentGame: LibraryItem = {
                  name: game,
                  description: '',
                  tags: [''],
                  logo: '',
                };
                gameInfoFiles.forEach((gameInfoFile) => {
                  if (gameInfoFile === 'desc.txt') {
                    const data = fs.readFileSync(
                      path.join(
                        os.tmpdir(),
                        'SelectLauncher',
                        'LauncherGamesInfo',
                        `${game}_info`,
                        'desc.txt'
                      ),
                      'utf8'
                    );
                    currentGame.description = data;
                  } else if (gameInfoFile === 'tags.txt') {
                    const data = fs.readFileSync(
                      path.join(
                        os.tmpdir(),
                        'SelectLauncher',
                        'LauncherGamesInfo',
                        `${game}_info`,
                        'tags.txt'
                      ),
                      'utf8'
                    );
                    const tags = data.split(',');
                    currentGame.tags = tags;
                  } else if (gameInfoFile === 'logo.png') {
                    currentGame.logo = path.join(
                      os.tmpdir(),
                      'SelectLauncher',
                      'LauncherGamesInfo',
                      `${game}_info`,
                      'logo.png'
                    );
                  }
                });
                library.push(currentGame);
              }
            }
          );
        });
      }
    }
  );
};
