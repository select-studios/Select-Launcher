import { AppBar, Loader } from "@/components";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/protectRoute";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);
  }, []);
  return !loading ? (
    <div className="home">
      <AppBar dashboard={true} user={user} />
      <div className="mt-5 flex justify-center">
        <Button
          onClick={() =>
            logout(cookies.accessToken).then(() => {
              removeCookie("accessToken");
              removeCookie("refreshToken");
              navigate("/");
            })
          }
        >
          Logout
        </Button>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
