import { getUser } from ".";

const protectRoute = (
  cookies: any,
  setCookie: any,
  setUser: any,
  setLoading: any,
  navigate: any
) => {
  if (!cookies.accessToken && !cookies.refreshToken) {
    navigate("/");
  } else if (cookies.refreshToken && !cookies.accessToken) {
    fetch("http://localhost:4757/api/accounts/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.refreshToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCookie("accessToken", data.accessToken, {
          path: "/",
          maxAge: 1800,
        });

        getUser(data.accessToken).then((userData) => {
          console.log(userData);
          setUser(userData);
          setLoading(false);
        });
      })
      .catch((e) => console.error(e));
  } else {
    getUser(cookies.accessToken).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }
};

export default protectRoute;
