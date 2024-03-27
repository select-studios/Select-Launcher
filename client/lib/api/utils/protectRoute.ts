import { UserStore_Impl } from "@/stores/UserStore";
import { Log } from "@lib/util/Log";
import { getTokensCookie, setTokensCookie } from "@lib/util/cookies/storage";
import { API_URI, getUser } from "../admin";

const protectRoute = (
  userStore: UserStore_Impl,
  cookies: any,
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
        const { accessToken } = data;
        setTokensCookie(accessToken, cookies.refreshToken);
        Log.success("New access token has been set.", "Authentication");

        getUser(accessToken).then((userData) => {
          if (!data) return navigate("/");

          userStore.setUser({
            ...userData,
            tokens: {
              accessToken,
              refreshToken: cookies.refreshToken,
            },
          });
          Log.success(
            "User information retrieved.",
            "Authentication",
            userData
          );

          setLoading(false);
        });
      })
      .catch((e) => {
        Log.error(
          "There was an error generating a new access token.",
          "Authentication",
          e
        );

        localStorage.removeItem("refreshToken");

        navigate("/");
      });
  } else {
    getUser(cookies.accessToken)
      .then((data) => {
        const { accessToken, refreshToken } = cookies;

        if (!data) return navigate("/");
        userStore.setUser({ ...data, tokens: { accessToken, refreshToken } });
        Log.success("User information retrieved.", "Authentication", data);
        setLoading(false);
      })
      .catch((e) => {
        Log.error("There was an error getting the user.", "Authentication", e);
        navigate("/");
      });
  }
};

export default protectRoute;
