import { ISelectAPI } from "./api/interfaces/ISelectAPI";

export interface IGamesAPI {
  getStorageLocation: () => void;
  setStorageLocation: (location: string) => void;
  downloadGame: (game: string, accessToken: string) => void;
  installGame: (game: string) => void;
  cleanupGame: (game: string) => void;
  uninstallGame: (game: string) => void;
  startGame: (game: string) => void;
  cancelDownloadGame: (game: string) => void;
  addInstalledGames: (gameName: string) => void;
  getInstalledGames: () => void;
  removeInstalledGames: (gameName: string) => void;
}

export interface IWindowControls {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
}

export interface IFilesAPI {
  openFolder: () => void;
}

export interface IAuthAPI {
  onVerificationSuccessful: () => void;
}

declare global {
  interface Window {
    gamesAPI: IGamesAPI;
    filesAPI: IFilesAPI;
    windowControls: IWindowControls;
    authAPI: IAuthAPI;
    selectAPI: ISelectAPI;
  }
}
