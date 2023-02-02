const API_URI = "http://localhost:4757/api";

export const getUser = async (accessToken: string) => {
  const res = await fetch(`${API_URI}/accounts/account`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const resData = await res.json();
  console.log(resData);
  console.log(resData.user);

  if (res.ok) {
    return resData.user;
  } else {
    console.error("Error getting user!", resData);
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
    setLoading({ state: true, message: "Logging out..." });
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
    console.log(data);

    return data.msg;
  });
};
