import { Alert, AppBar, Loader, Sidebar } from "@/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/protectRoute";
import { LoadingState } from "@/components/loader/loader.component";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });
  const navigate = useNavigate();

  const logoutClient = () => {
    logout(cookies.refreshToken, setLoading, removeCookie, navigate);
  };

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);
  }, []);

  return !loading ? (
    <>
      <AppBar dashboard={true} user={user} logoutFn={logoutClient} />
      <div className="home mt-10 inline-block w-full">
        <div className="flex justify-center">Hello!</div>
      </div>
      <Sidebar />
    </>
  ) : (
    <Loader msg={loading.msg} />
  );
};
