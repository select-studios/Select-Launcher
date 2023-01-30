declare global {
  interface Window {
    gamesAPI: {
      getStorageLocation(): string;
      setStorageLocation(location: string): string;
    };
  }
}

export {};
