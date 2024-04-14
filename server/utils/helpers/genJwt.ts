import { Logger } from "../../app";
import { User } from "../../interfaces";
import * as jwt from "jsonwebtoken";

export const getAccessToken = (user: User) => {
  let accessToken: string;
  try {
    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
  } catch (error) {
    Logger.error("There was an error.", error, "JWT");
    return error;
  }

  return accessToken;
};

export const getRefreshToken = (user: User) => {
  let refreshToken: string;
  try {
    refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });
  } catch (error) {
    console.log(error);
    return error;
  }

  return refreshToken;
};
