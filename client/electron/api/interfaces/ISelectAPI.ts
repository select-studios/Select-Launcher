export interface ISelectAPI {
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
}
