import { axiosInstance } from "../../../../main";
import fs from "fs";
import FormData from "form-data";

export async function editAccount(
  username: string,
  email: string,
  accessToken: string
) {
  return axiosInstance.post(
    "/accounts/account/edit",
    {
      username,
      email,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

export async function uploadPFP(avatar_location: string, accessToken: string) {
  let data = new FormData();
  data.append("avatar", fs.createReadStream(avatar_location));
  return axiosInstance.put("accounts/account/edit/pfp", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...data.getHeaders(),
    },
  });
}
