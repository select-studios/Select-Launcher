export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  backup_email: string;
  username: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface SignUpResponse {
  user: User;
  access_token: string;
}

export interface User {
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
