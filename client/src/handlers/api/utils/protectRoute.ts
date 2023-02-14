import { Log } from "@/utils/lib/Log";
import { getTokensCookie, setTokensCookie } from "@/utils/storage";
import { API_URI, getUser } from "..";

const protectRoute = (
  cookies: any,
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
        const { accessToken } = data;
        setTokensCookie(accessToken, cookies.refreshToken);
        Log.success("New access token has been set.", "Authentication");

        getUser(accessToken).then((userData) => {
          setUser(userData);
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
        navigate("/");
      });
  } else {
    getUser(cookies.accessToken)
      .then((data) => {
        setUser(data);
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
