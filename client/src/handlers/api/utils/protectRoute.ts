import { API_URI, getUser } from "..";

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
    fetch(`${API_URI}/accounts/refresh`, {
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
          setUser(userData);
          console.log(userData);
          setLoading(false);
        });
      })
      .catch((e) => console.error(e));
  } else {
    getUser(cookies.accessToken).then((data) => {
      setUser(data);
      console.log(data, "from protectRoute");
      setLoading(false);
    });
  }
};

export default protectRoute;
