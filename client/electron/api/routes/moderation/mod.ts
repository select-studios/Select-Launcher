import { axiosInstance } from "../../../main";
import { User } from "../../interfaces/IAccountResponses";

// TODO Internal Access Token management
async function banUser(
  uuid: string,
  reason: string,
  accessToken: string
): Promise<User> {
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

// TODO Internal Access Token management
async function unBan(uuid: string, accessToken: string): Promise<User> {
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
