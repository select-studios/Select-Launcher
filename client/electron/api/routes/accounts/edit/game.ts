import { axiosInstance } from "../../../../main";
import { User } from "../../../interfaces/IAccountResponses";

async function addGame(game: string) {
  // TODO Implement
}

// TODO Implement internally managed accessToken
async function removeGame(remove_game: string, accessToken): Promise<User> {
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
