import { Alert, AppBar, Loader } from "@/components";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/protectRoute";
import {
  alertDefault,
  AlertProps,
  removeAlert,
} from "@/components/alert/alert.component";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = useState<string>("");
  const [alert, setAlert] = useState<AlertProps>(alertDefault);
  const navigate = useNavigate();

  const logoutClient = () => {
    logout(cookies.accessToken).then(async () => {
      setLoading(true);
      setLoadingMsg("Logging out...");

      removeCookie("accessToken");
      removeCookie("refreshToken");
      navigate("/");
    });
  };

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);
    if (!user?.verified)
      setAlert({
        show: true,
        msg: "Please check your mail with instructions on how to verify your account.",
        type: "error",
        hide: false,
      });
    else
      setAlert({
        show: true,
        msg: "Logged in successfully!",
        type: "success",
        hide: true,
      });
  }, []);

  removeAlert(alert, setAlert);

  return !loading ? (
    <div className="home">
      <AppBar dashboard={true} user={user} logoutFn={logoutClient} />
      <div className="mt-5 flex justify-center">Hello!</div>
      <Alert msg={alert.msg} show={alert.show} type={alert.type} />
    </div>
  ) : (
    <Loader msg={loadingMsg} />
  );
};
