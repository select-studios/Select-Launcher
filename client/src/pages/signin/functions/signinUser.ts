import { API_URI } from "@/handlers/api";
import SigninInterface from "@/interfaces/SigninInterface";
import { UserStore } from "@/stores/UserStore";
import { setTokensCookie } from "@/utils/storage";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const signinUser = async (data: SigninInterface, navigate: any) => {
  await fetch(`${API_URI}/accounts/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const resData = await res.json();

    if (res.ok) {
      const { accessToken, refreshToken } = resData.user;
      console.log(resData);

      setTokensCookie(accessToken, refreshToken);
      UserStore.setUser({
        ...resData.user,
        tokens: { accessToken, refreshToken },
      });

      navigate("/home");
    } else {
      toast.error(resData.error);
    }
  });
};
