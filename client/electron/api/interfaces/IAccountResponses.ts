export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  backup_email: string;
  username: string;
  password: string;
}

export interface ISignInResponse {
  user: IUser;
  access_token: string;
  refresh_token: string;
}

export interface ISignUpResponse {
  user: IUser;
  access_token: string;
}

export interface IUser {
  uuid: string;
  email: string;
  backup_email: string;
  username: string;
  password: string;
  verified: boolean;
  moderator: boolean;
  banned: boolean;
  ban_reason: null;
  refresh_token: string;
  purchased_games: string[];
}
