import { Alert, AppBar, Loader } from "@/components";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/protectRoute";
import { removeAlert } from "@/components/alert/alert.component";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = useState<string>("");
  const [alert, setAlert] = useState<{
    show: boolean;
    msg: string;
    type: "success" | "error";
  }>({ show: false, msg: "", type: "error" });
  const navigate = useNavigate();

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);
    setAlert({ show: true, msg: "Logged in successfully!", type: "success" });
  }, []);

  removeAlert(alert, setAlert);

  return !loading ? (
    <div className="home">
      <AppBar dashboard={true} user={user} />
      <div className="mt-5 flex justify-center">
        <Button
          onClick={() =>
            logout(cookies.accessToken).then(async () => {
              setLoading(true);
              setLoadingMsg("Logging out...");

              removeCookie("accessToken");
              removeCookie("refreshToken");
              navigate("/");
            })
          }
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            window.electron.gamesAPI.sendMessage("Test Dialog");
          }}
        >
          Show Dialog
        </Button>
      </div>
      <Alert msg={alert.msg} show={alert.show} type={alert.type} />
    </div>
  ) : (
    <Loader msg={loadingMsg} />
  );
};
