import { Loader, LoadingState } from "@/components/loader/loader.component";
import { UserStore } from "@/stores/UserStore";
import { getTokensCookie } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import protectRoute from "../utils/protectRoute";
import { observer } from "mobx-react";

interface AuthAPIProps {
  children: React.ReactNode;
}

const AuthAPI: React.FC<AuthAPIProps> = ({ children }) => {
  const cookies = getTokensCookie();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });

  useEffect(() => {
    protectRoute(UserStore, cookies, setLoading, navigate);
  }, []);

  return !loading ? <div>{children}</div> : <Loader msg={loading.msg} />;
};

export default observer(AuthAPI);
