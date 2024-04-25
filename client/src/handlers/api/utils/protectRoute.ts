import { UserStore, UserStore_Impl } from "@/stores/UserStore";
import { Log } from "@/utils/lib/Log";
import { getTokensCookie, setTokensCookie } from "@/utils/storage";
import { API_URI, getUser } from "..";

const protectRoute = (
  userStore: UserStore_Impl,
  cookies: any,
  setLoading: any,
  navigate: any,
  getUserData?: boolean
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
        }).catch((e) => {
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("accessToken")
          Log.success("Removed previous session storage.")
          navigate("/")
        });
      })
      .catch((e) => {
        Log.error(
          "There was an error generating a new access token.",
          "Authentication",
          e
        );

        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        navigate("/");
      });
  } else {
    if (getUserData) {
      getUser(cookies.accessToken)
        .then((data) => {
          const { accessToken, refreshToken } = cookies;

          if (!data) return navigate("/");
          userStore.setUser({ ...data, tokens: { accessToken, refreshToken } });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data, tokens: { accessToken, refreshToken } })
          );
          Log.success("User information retrieved.", "Authentication", data);
          setLoading(false);
        })
        .catch((e) => {
          Log.error(
            "There was an error getting the user.",
            "Authentication",
            e
          );
          navigate("/");
        });
    } else {
      const user = localStorage.getItem("user");
      if (!user || !user.length) navigate("/store");

      const userData = JSON.parse(user!);
      UserStore.setUser(userData);
      setLoading(false);
    }
  }
};

export default protectRoute;
