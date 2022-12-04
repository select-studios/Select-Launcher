import { User } from "../../interfaces";
import * as jwt from "jsonwebtoken";

export const getAccessToken = (user: any) => {
  let accessToken;
  try {
    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
  } catch (error) {
    console.log(error);
    return error;
  }

  return accessToken;
};

export const getRefreshToken = (user: any) => {
  let refreshToken;
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