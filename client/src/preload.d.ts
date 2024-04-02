declare global {
  interface Window {
    gamesAPI: {
      getStorageLocation(): string;
      setStorageLocation(location: string): string;
      downloadGame(game: string): string;
      installGame(game: string): string;
      cleanupGame(game: string): string;
      uninstallGame(game: string): string;
      startGame(game: string): string;
      addInstalledGames(gameName: string): string;
      getInstalledGames(): string;
    };
    filesAPI: {
      openFolder: () => string | undefined;
    };
    windowControls: {
      minimizeWindow(): void;
      maximizeWindow(): void;
      closeWindow(): void;
    };
  }
}

export {};
