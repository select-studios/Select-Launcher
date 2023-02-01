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

export const logout = async (accessToken: string) => {
  await fetch(`${API_URI}/accounts/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
