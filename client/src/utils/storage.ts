const checkIfNotExpired = (expires: number) => {
  return new Date().getTime() < expires;
};

export const setTokensCookie = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(
    "accessToken",
    JSON.stringify({
      accessToken,
      expires: new Date().getTime() + 1800 * 1000,
    })
  );

  localStorage.setItem(
    "refreshToken",
    JSON.stringify({
      refreshToken,
      expires: new Date().getTime() + 60 * 60 * 24 * 1000 * 30,
    })
  );
};

export const getTokensCookie = () => {
  const accessTokenCookie = localStorage.getItem("accessToken");
  const refreshTokenCookie = localStorage.getItem("refreshToken");

  let cookies = { accessToken: null, refreshToken: null };

  if (accessTokenCookie?.length) {
    const { accessToken, expires } = JSON.parse(accessTokenCookie);

    if (checkIfNotExpired(expires)) {
      cookies = { ...cookies, accessToken };
    } else localStorage.removeItem("accessToken");
  }

  if (refreshTokenCookie?.length) {
    const { refreshToken, expires } = JSON.parse(refreshTokenCookie);

    if (checkIfNotExpired(expires)) {
      cookies = { ...cookies, refreshToken };
    } else localStorage.removeItem("refreshToken");
  }

  return cookies;
};
