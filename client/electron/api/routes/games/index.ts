import { axiosInstance } from "../../../main";
import { IGameInfo } from "../../interfaces/IGames";

export async function getGamesInfo(): Promise<IGameInfo> {
  let info = await axiosInstance.get("games/info").then((res) => {
    if (res.status != 200) return null;
    let response: IGameInfo = res.data;

    return response;
  });

  return info;
}

// NOTE: Downloading the games takes place in the game manager because of some voodoo magic I programmed before
// that I no longer understand.
