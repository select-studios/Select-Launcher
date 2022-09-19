/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  CheckTmpDir,
  CloneGameInfo,
  CreateTmpDir,
  FetchNewGames,
} from './api/check';
import { downloadGame, uninstallGame } from './api/gameManager';
import { getLibrary, loadLibrary } from './api/libraryManager';
import game from './interfaces/game';

const store = new Store();
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('gamesApi-download-game', async (event, gameName) => {
  await downloadGame(gameName);
  event.returnValue = 'Initiated Download';
});
ipcMain.on('gamesApi-uninstall-game', async (event, gameName) => {
  await uninstallGame(gameName);
  event.returnValue = 'Initiated Uninstall';
});
ipcMain.on('gamesApi-get-library', async (event) => {
  event.returnValue = getLibrary();
});
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});
ipcMain.on('electron-store-path', async (event) => {
  event.returnValue = store.path;
});

ipcMain.on('api-url-get', async (event) => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    event.returnValue = 'http://localhost:4757/';
  } else if (
    process.env.NODE_ENV === 'production' ||
    process.env.DEBUG_PROD === 'false'
  ) {
    event.returnValue = 'https://web-production-7960.up.railway.app/';
  }
});

ipcMain.on('gamesApi-get-fetched-games', async (event) => {
  const fetchedGames: game[] = [];

  await fs
    .readdirSync(path.join(os.tmpdir(), 'SelectLauncher', 'LauncherGamesInfo'))
    .forEach(async (dir) => {
      if (dir === '.git') {
        return;
      }
      const currentGame: game = {
        name: '',
        description: '',
        tags: [],
        logo: '',
      };
      const gameName = dir.split('_');
      gameName.pop();

      currentGame.name = gameName.join(' ');
      await fs
        .readdirSync(
          path.join(os.tmpdir(), 'SelectLauncher', 'LauncherGamesInfo', dir)
        )
        .forEach((file) => {
          if (file === 'desc.txt') {
            const data = fs.readFileSync(
              path.join(
                os.tmpdir(),
                'SelectLauncher',
                'LauncherGamesInfo',
                dir,
                'desc.txt'
              ),
              'utf8'
            );
            currentGame.description = data;
          } else if (file === 'tags.txt') {
            const data = fs.readFileSync(
              path.join(
                os.tmpdir(),
                'SelectLauncher',
                'LauncherGamesInfo',
                dir,
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
              dir,
              'logo.png'
            );
          }
        });
      fetchedGames.push(currentGame);
    });

  event.returnValue = fetchedGames;
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  // Get game info from github
  if (CheckTmpDir()) {
    FetchNewGames();
    loadLibrary();
  } else {
    CreateTmpDir();
    CloneGameInfo();
    loadLibrary();
  }
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
