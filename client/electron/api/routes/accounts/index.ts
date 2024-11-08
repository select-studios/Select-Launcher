import { axiosInstance } from "../../../main";
import {
  SignInResponse,
  SignUpResponse,
} from "../../interfaces/IAccountResponses";

export async function signUp(
  email: string,
  backup_email: string,
  username: string,
  password: string
): Promise<SignUpResponse> {
  return await axiosInstance
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

export async function signIn(
  email: string,
  password: string
): Promise<SignInResponse> {
  return await axiosInstance
    .post("accounts/signin", {
      email,
      password,
    })
    .then((res) => {
      if (res.status != 200) return null;
      let response: SignInResponse = res.data;

      return response;
    });
}

// TODO Make the authorization on this internally managed
export async function refresh(refreshToken: string): Promise<string> {
  return axiosInstance
    .post(
      "/accounts/refresh",
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    )
    .then((res) => {
      if (res.status != 200) return null;

      return res.data;
    });
}

export async function logout(accessToken: string) {
  return axiosInstance.post(
    "/accounts/logout",
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

export async function forgotPassword(uuid: string, new_password: string) {
  return axiosInstance.get("/accounts/account/forgotpassword", {
    params: {
      uuid,
      new_password,
    },
  });
}
