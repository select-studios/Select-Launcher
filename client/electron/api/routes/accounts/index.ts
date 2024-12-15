import { axiosInstance } from "../../../main";
import {
  ISignInResponse,
  ISignUpResponse,
} from "../../interfaces/IAccountResponses";

export async function signUp(
  email: string,
  backup_email: string,
  username: string,
  password: string
): Promise<ISignUpResponse> {
  let user = await axiosInstance
    .post("accounts/signup", {
      email,
      backup_email,
      username,
      password,
    })
    .then((res) => {
      if (res.status != 200) return null;
      let response: ISignUpResponse = res.data;

      return response;
    });

  return user;
}

export async function signIn(
  email: string,
  password: string
): Promise<ISignInResponse> {
  let user = await axiosInstance
    .post("accounts/signin", {
      email,
      password,
    })
    .then((res) => {
      if (res.status != 200) return null;
      let response: ISignInResponse = res.data;

      return response;
    });

  return user;
}

export async function refresh(refreshToken: string): Promise<string> {
  return axiosInstance
    .post(
      "/accounts/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer refresh`,
        },
      }
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
