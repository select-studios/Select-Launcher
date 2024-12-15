import { axiosInstance } from "../../../../main";
import { IUser } from "../../../interfaces/IAccountResponses";

export async function addGame(new_game: string, accessToken: string) {
  return axiosInstance
    .patch(
      "accounts/account/edit/addgame",
      { add_game: new_game },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then((res) => {
      return res.data;
    });
}

export async function removeGame(
  remove_game: string,
  accessToken: string
): Promise<IUser> {
  return axiosInstance
    .patch(
      "accounts/account/edit/removegame",
      { remove_game },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then((res) => {
      return res.data;
    });
}
