declare global {
  interface Window {
    electron: {
      gamesAPI: {
        sendMessage(message: string): void;
      };
    };
  }
}

export {};
