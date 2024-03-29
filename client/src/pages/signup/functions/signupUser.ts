import { API_URI } from "@/handlers/api";
import SignupInterface from "@/interfaces/RegisterInterface";
import { setTokensCookie } from "@/utils/storage";
import { toast } from "react-toastify";

export const signupUser = async (
  data: SignupInterface,
  navigate: any,
  setLoading: any
) => {
  setLoading(true);
  const res = await fetch(`${API_URI}/accounts/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData: any = await res.json();

  if (res.ok) {
    const { user } = resData;
    const { accessToken, refreshToken } = user;

    localStorage.setItem(
      "tokens",
      JSON.stringify({
        accessToken,
        refreshToken,
        expires: Date.now() + 1800000,
      })
    );
    setTokensCookie(accessToken, refreshToken);

    setLoading(false);
    navigate("/home");
  } else {
    setLoading(false);
    toast.error(resData.error);
  }
};
