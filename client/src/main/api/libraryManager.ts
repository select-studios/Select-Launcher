/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import os from 'os';

interface LibraryItem {
  name: string;
  description: string;
  logo: string;
  tags: string[];
}

export const getLibrary = (): Map<string, LibraryItem> => {
  const library: Map<string, LibraryItem> = new Map<string, LibraryItem>();
  fs.readdirSync(
    path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games')
  ).forEach((gameFolder) => {
    const currentGame: LibraryItem = {
      name: '',
      description: '',
      logo: '',
      tags: [],
    };
    fs.readdirSync(
      path.join(
        os.tmpdir(),
        'SelectLauncher',
        'LauncherGamesInfo',
        `${gameFolder}_info`
      )
    ).forEach((file) => {
      switch (file) {
        case '.git':
          break;
        case 'desc.txt':
          currentGame.description = fs.readFileSync(
            path.join(
              os.tmpdir(),
              'SelectLauncher',
              'LauncherGamesInfo',
              `${gameFolder}_info`,
              'desc.txt'
            ),
            'utf8'
          );
          break;
        case 'tags.txt':
          currentGame.tags = fs
            .readFileSync(
              path.join(
                os.tmpdir(),
                'SelectLauncher',
                'LauncherGamesInfo',
                `${gameFolder}_info`,
                'tags.txt'
              ),
              'utf8'
            )
            .split(',');
          break;
        case 'logo.png':
          currentGame.logo = path.join(
            os.tmpdir(),
            'SelectLauncher',
            'LauncherGamesInfo',
            `${gameFolder}_info`,
            'logo.png'
          );
          break;

        default:
          break;
      }
    });
    currentGame.name = gameFolder;
    library.set(gameFolder, currentGame);
  });

  return library;
};
