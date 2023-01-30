export interface IGamesAPI {
  getStorageLocation: () => void;
  setStorageLocation: (location: string) => void;
}

declare global {
  interface Window {
    gamesAPI: IGamesAPI;
  }
}
