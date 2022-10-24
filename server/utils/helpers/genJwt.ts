import { User } from "../../interfaces";
import * as jwt from "jsonwebtoken";

export const getAccessToken = (user: User) => {
  let accessToken;
  try {
    accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
  } catch (error) {
    console.log(error);
    return error;
  }

  return accessToken;
};

export const getRefreshToken = (user: User) => {
  let refreshToken;
  try {
    refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
    return error;
  }

  return refreshToken;
};
