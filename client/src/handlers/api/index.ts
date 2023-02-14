import GameInfo from "@/interfaces/GameInfoInterface";
import { Log } from "@/utils/lib/Log";

export const API_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4757/api"
    : "https://selectlauncherapi.up.railway.app/api";

Log.ready("API URI is ready on " + API_URI, "API Handler");

export const getUser = async (accessToken: string) => {
  const res = await fetch(`${API_URI}/accounts/account`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const resData = await res.json();

  if (res.ok) {
    return resData.user;
  } else {
    Log.error("Error getting USER information.", "Authentication");
  }
};

export const getGameInfo = async () => {
  const res = await fetch(`${API_URI}/games/info`, {
    method: "GET",
  });

  const resData: GameInfo[] = await res.json();

  if (res.ok) {
    Log.success("GAME information retrieved.", "Games Handler", resData);
    return resData;
  } else {
    Log.error("Error getting GAME information.", "Games Handler");
    return undefined;
  }
};

export const logout = async (
  accessToken: string,
  setLoading: any,
  navigate: any
) => {
  await fetch(`${API_URI}/accounts/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(() => {
    setLoading({ state: true, msg: "Logging out..." });
    localStorage.clear();

    navigate("/");
  });
};

export const sendVerificationLink = async (accessToken: string) => {
  await fetch(`${API_URI}/accounts/verify/link`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(async (res) => {
    const data = await res.json();

    return data.msg;
  });
};
