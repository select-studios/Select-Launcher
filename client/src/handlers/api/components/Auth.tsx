import { Loader, LoadingState } from "@/components/loader/loader.component";
import { UserStore_Impl } from "@/stores/UserStore";
import { getTokensCookie } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import protectRoute from "../utils/protectRoute";

interface AuthAPIProps {
  userStore: UserStore_Impl;
  children: React.ReactNode;
}

const AuthAPI: React.FC<AuthAPIProps> = ({ userStore, children }) => {
  const cookies = getTokensCookie();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });

  useEffect(() => {
    protectRoute(userStore, cookies, setLoading, navigate);
  }, []);

  return !loading ? <div>{children}</div> : <Loader msg={loading.msg} />;
};

export default AuthAPI;
