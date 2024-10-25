export interface ISelectAPI {
  testConnection: () => void;
  accounts: {
    signUp: (
      username: string,
      email: string,
      backup_email: string,
      password: string
    ) => void;
  };
}
