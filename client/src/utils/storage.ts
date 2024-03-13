/**
 * Model for the stored cookies.
 */
interface cookies {
  accessToken: number | null;
  refreshToken: number | null;
}

/**
 * Checks if a given timestamp has expired by comparing it with current time
 * @param {number} expires
 * @returns {boolean}
 */
const checkIfNotExpired = (expires: number) => {
  return new Date().getTime() < expires;
};

/**
 * Stores the access and refresh tokens from the server in the electron cookies
 * @param {string} accessToken
 * @param {string} refreshToken
 * @returns {void}
 */
export const setTokensCookie = (
  accessToken: string,
  refreshToken: string
): void => {
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

/**
 * Gets the access and refresh token stored in electron cookies
 * @returns {cookies}
 */
export const getTokensCookie = () => {
  const accessTokenCookie = localStorage.getItem("accessToken");
  const refreshTokenCookie = localStorage.getItem("refreshToken");

  let cookies: cookies = { accessToken: null, refreshToken: null };

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
