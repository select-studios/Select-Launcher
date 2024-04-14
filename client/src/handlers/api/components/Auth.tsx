import { Loader, LoadingState } from "@/components/loader/loader.component";
import { UserStore } from "@/stores/UserStore";
import { getTokensCookie } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import protectRoute from "../utils/protectRoute";
import { observer } from "mobx-react";
import { getUser } from "..";

interface AuthAPIProps {
  children: React.ReactNode;
  getUserData?: boolean;
}

const AuthAPI: React.FC<AuthAPIProps> = ({ children, getUserData = false }) => {
  const cookies = getTokensCookie();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });

  useEffect(() => {
    protectRoute(UserStore, cookies, setLoading, navigate, getUserData);
  }, []);

  return !loading ? <div>{children}</div> : <Loader msg={loading.msg} />;
  // return <Loader msg={loading.msg} />;
};

export default observer(AuthAPI);
