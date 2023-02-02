export interface IGamesAPI {
  getStorageLocation: () => void;
  setStorageLocation: (location: string) => void;
  downloadGame: (game: string) => void;
  installGame: (game: string) => void;
  cleanupGame: (game: string) => void;
}

declare global {
  interface Window {
    gamesAPI: IGamesAPI;
  }
}
