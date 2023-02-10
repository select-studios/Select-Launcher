import GameInfo from "@/interfaces/GameInfoInterface";

const API_URI = process.env.REACT_APP_SERVER_API_URI;

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
    console.error("Error getting user!", resData);
  }
};

export const getGameInfo = async () => {
  const res = await fetch(`${API_URI}/games/info`, {
    method: "GET",
  });

  const resData: GameInfo[] = await res.json();

  if (res.ok) {
    return resData;
  } else {
    console.error("Error getting Game Info!");
    return undefined;
  }
};

export const logout = async (
  accessToken: string,
  setLoading: any,
  removeCookies: any,
  navigate: any
) => {
  await fetch(`${API_URI}/accounts/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(() => {
    setLoading({ state: true, msg: "Logging out..." });
    removeCookies("accessToken");
    removeCookies("refreshToken");

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
