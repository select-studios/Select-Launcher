export interface IGamesAPI {
  getStorageLocation: () => void;
  setStorageLocation: (location: string) => void;
  downloadGame: (game: string) => void;
  installGame: (game: string) => void;
  cleanupGame: (game: string) => void;
  uninstallGame: (game: string) => void;
  startGame: (game: string) => void;
  cancelDownloadGame: (game: string) => void;
}

export interface IWindowControls {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
}

export interface IFilesAPI {
  openFolder: () => void;
}

declare global {
  interface Window {
    gamesAPI: IGamesAPI;
    filesAPI: IFilesAPI;
    windowControls: IWindowControls;
  }
}
