import { AppBar, Loader } from "@/components";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import { getUser } from "@/handlers/api";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const logout = async () => {
    await fetch("http://localhost:4757/api/accounts/logout", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    }).then(() => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      navigate("/");
    });
  };

  useEffect(() => {
    if (!cookies.accessToken && !cookies.refreshToken) {
      navigate("/");
    } else if (cookies.refreshToken && !cookies.accessToken) {
      fetch("http://localhost:4757/api/accounts/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.refreshToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCookie("accessToken", data.accessToken, {
            path: "/",
            maxAge: 1800,
          });
          setAccessToken(cookies.accessToken);
        })
        .catch((e) => console.error(e));
    }

    accessToken &&
      getUser(accessToken).then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <div className="Home">
      <AppBar />
      <div className="grid place-items-center mt-2">
        <div className="text-center">Hello {user?.username}</div>
        <div className="login__links mt-52">
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
