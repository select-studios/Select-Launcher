export default interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  moderator: boolean;
  verified: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  banned: boolean;
}
