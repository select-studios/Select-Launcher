import GameInfo from "@/interfaces/GameInfoInterface";
import { UserStore, UserStore_Impl } from "@/stores/UserStore";
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

export const getAllUsers = async () => {
  const res = await fetch(`${API_URI}/accounts?pass=ssadmin12345`);

  const resData = await res.json();

  if (res.ok) {
    return resData.users;
  } else {
    Log.error("Error getting USERS information.", "Authentication");
    throw new Error();
  }
};

export const banUser = async (
  id: string,
  reason: string,
  accessToken: string
) => {
  const body = {
    id,
    reason,
  };

  const res = await fetch(`${API_URI}/accounts/account/ban`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resData = await res.json();

  if (res.ok) {
    return resData.user;
  }

  return null;
};

export const unbanUser = async (id: string, accessToken: string) => {
  const body = {
    id,
  };

  const res = await fetch(`${API_URI}/accounts/account/unban`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resData = await res.json();

  if (res.ok) {
    return resData.user;
  }

  return null;
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

export const logout = async (accessToken: string, navigate: any) => {
  await fetch(`${API_URI}/accounts/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(() => {
    localStorage.clear();
    UserStore.user = null;

    navigate("/");
  });
};

export const sendVerificationLink = async (
  accessToken: string | number | null
) => {
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
    return resData.newUser;
  } else {
    Log.error("Error editing account.", "Authentication");
    throw new Error();
  }
};
