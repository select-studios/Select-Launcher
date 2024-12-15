declare global {
  interface Window {
    gamesAPI: {
      getStorageLocation(): string;
      setStorageLocation(location: string): string;
      downloadGame(game: string, accessToken: string): string;
      installGame(game: string): string;
      cleanupGame(game: string): string;
      uninstallGame(game: string): string;
      startGame(game: string): string;
      addInstalledGames(gameName: string): string;
      getInstalledGames(): string;
      removeInstalledGames(gameName: string): string;
    };
    filesAPI: {
      openFolder: () => string | undefined;
    };
    windowControls: {
      minimizeWindow(): void;
      maximizeWindow(): void;
      closeWindow(): void;
    };
    authAPI: {
      onVerificationSuccessful: () => void;
    };
    selectAPI: {
      accounts: {
        signUp: (
          username: string,
          email: string,
          backup_email: string,
          password: string
        ) => void;
        signIn: (email: string, password: string) => void;
        refresh: (refreshToken: string) => void;
        logout: (accessToken: string) => void;
        forgotPassword: (uuid: string, new_password: string) => void;
        edit: {
          editAccount: (
            username: string,
            email: string,
            accessToken: string
          ) => void;
          uploadPFP: (avatar_location: string, accessToken: string) => void;
          addGame: (new_game: string, accessToken: string) => void;
          removeGame: (remove_game: string, accessToken: string) => void;
        };
      };
      games: {
        getGamesInfo: () => void;
      };
      moderation: {
        banUser: (uuid: string, reason: string, accessToken: string) => void;
        unBan: (uuid: string, accessToken: string) => void;
      };
    };
  }
}

export {};
