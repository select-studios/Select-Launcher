export const getUser = async (accessToken: string) => {
  const res = await fetch("http://localhost:4757/api/accounts/account", {
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
