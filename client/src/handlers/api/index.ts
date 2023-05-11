import GameInfo from "@/interfaces/GameInfoInterface";
import { UserStore_Impl } from "@/stores/UserStore";
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
    throw new Error();
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

<<<<<<< HEAD
export const logout = async (accessToken: string, navigate: any) => {
=======
export const logout = async (
  userStore: UserStore_Impl,
  accessToken: string,
  setLoading: any,
  navigate: any
) => {
>>>>>>> 32999b28f96302a93b3b8225741534a15efdef86
  await fetch(`${API_URI}/accounts/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(() => {
    localStorage.clear();
    userStore.user = null;

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

export const editAccount = async (
  accessToken: string,
  put: {
    username?: string;
    email?: string;
    password?: string;
  }
) => {
  const res = await fetch(`${API_URI}/accounts/account/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(put),
  });

  const resData = await res.json();
  console.log(resData);

  if (res.ok) {
    return resData.user;
  } else {
    Log.error("Error editing account.", "Authentication");
    throw new Error();
  }
};
