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

export const getLibrary = async (): Promise<LibraryItem[]> => {
  const library: LibraryItem[] = [];
  const currentGame: LibraryItem = {
    name: '',
    description: '',
    tags: [],
    logo: '',
  };
  await fs
    .readdirSync(path.join(os.homedir(), 'AppData', 'Roaming', 'Select Games'))
    .forEach(async (gameFolder) => {
      await fs
        .readdirSync(
          path.join(
            os.tmpdir(),
            'SelectLauncher',
            'LauncherGamesInfo',
            `${gameFolder}_info`
          )
        )
        .forEach(async (file) => {
          currentGame.name = gameFolder;
          if (file === '.git') {
            return;
          }
          if (file === 'desc.txt') {
            const data = await fs.readFileSync(
              path.join(
                os.tmpdir(),
                'SelectLauncher',
                'LauncherGamesInfo',
                `${gameFolder}_info`,
                'desc.txt'
              ),
              'utf8'
            );
            currentGame.description = data;
          } else if (file === 'tags.txt') {
            const data = await fs.readFileSync(
              path.join(
                os.tmpdir(),
                'SelectLauncher',
                'LauncherGamesInfo',
                `${gameFolder}_info`,
                'tags.txt'
              ),
              'utf8'
            );
            const tags = data.split(',');
            currentGame.tags = tags;
          } else if (file === 'logo.png') {
            currentGame.logo = path.join(
              os.tmpdir(),
              'SelectLauncher',
              'LauncherGamesInfo',
              `${gameFolder}_info`,
              'logo.png'
            );
          }
        });
      library.push(currentGame);
    });

  return library;
};
