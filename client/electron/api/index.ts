import axios from "axios";
import { app } from "electron";
import { SignUpResponse } from "./interfaces/IAccountResponses";

const API_URL = app.isPackaged ? "prod url" : "http://localhost:4757/api/v2/"; // TODO Add correct prod URL

const instance = axios.create({
  baseURL: API_URL,
  headers: { Authentication: "Bearer token" },
});

/// Initializes connection with the server
export function testConnection() {
  // TODO check for stored user logins
  return instance.get("games/info").then((res) => {
    if (res.status === 200) {
      console.log("Select server is online!");
      return true;
    } else {
      console.log("Could not reach select server!");
      return false;
    }
  });
}

export async function signUp(
  email: string,
  backup_email: string,
  username: string,
  password: string
): Promise<SignUpResponse> {
  return await instance
    .post("accounts/signup", {
      email,
      backup_email,
      username,
      password,
    })
    .then((res) => {
      if (res.status != 200) return null;
      let response: SignUpResponse = res.data;

      return response;
    });
}
