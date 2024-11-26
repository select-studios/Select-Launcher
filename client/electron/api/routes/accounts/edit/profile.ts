import { axiosInstance } from "../../../../main";

// TODO Internally managed state of accessToken
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

export async function uploadPFP(avatar: string) {
  // TODO Implement a loading API
}
