import { API_URI } from "@/handlers/api";
import SigninInterface from "@/interfaces/SigninInterface";
import { UserStore } from "@/stores/UserStore";
import { setTokensCookie } from "@/utils/storage";
import { toast } from "react-toastify";

export const signinUser = async (
  data: SigninInterface,
  navigate: any,
  setLoading: any
) => {
  setLoading(true);
  await fetch(`${API_URI}/accounts/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: any) => {
    const resData = await res.json();

    if (res.ok) {
      const { accessToken, refreshToken } = resData.user;

      setTokensCookie(accessToken, refreshToken);
      UserStore.setUser({
        ...resData.user,
        tokens: { accessToken, refreshToken },
      });

      setLoading(false);

      navigate("/store");
    } else {
      if (resData.banReason) {
        navigate("/banned", { state: { banReason: resData.banReason } });
      } else {
        toast.error(resData.error);
      }

      setLoading(false);
    }
  });
};
