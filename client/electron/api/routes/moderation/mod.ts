import { axiosInstance } from "../../../main";
import { IUser } from "../../interfaces/IAccountResponses";

export async function banUser(
  uuid: string,
  reason: string,
  accessToken: string
): Promise<IUser> {
  return axiosInstance
    .put(
      "/accounts/account/ban",
      { uuid, reason },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then((res) => {
      if (res.status != 201) return null;

      return res.data;
    });
}

export async function unBan(uuid: string, accessToken: string): Promise<IUser> {
  return axiosInstance
    .put(
      "/accounts/account/unBan",
      { uuid },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then((res) => {
      if (res.status != 201) return null;

      return res.data;
    });
}
