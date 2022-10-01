import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    get(val: any) {
      return ipcRenderer.sendSync('electron-store-get', val);
    },
    set(property: any, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    path() {
      ipcRenderer.sendSync('electron-store-path');
    },
  },
  api: {
    getUrl() {
      return ipcRenderer.sendSync('api-url-get');
    },
  },
  gamesApi: {
    async isGitInstalled() {
      return ipcRenderer.sendSync('gamesApi-is-git-installed');
    },
    async getFetchedGames() {
      return ipcRenderer.sendSync('gamesApi-get-fetched-games');
    },
    downloadGame(gameName: string) {
      return ipcRenderer.sendSync('gamesApi-download-game', gameName);
    },
    uninstallGame(gameName: string) {
      return ipcRenderer.sendSync('gamesApi-uninstall-game', gameName);
    },
    getLibrary() {
      return ipcRenderer.sendSync('gamesApi-get-library');
    },
  },
});
