import { Loader, LoadingState } from "@/components/loader/loader.component";
import { UserStore } from "@/stores/UserStore";
import { getTokensCookie } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import protectRoute from "../utils/protectRoute";
import { observer } from "mobx-react";
import * as pkgJson from "../../../../package.json";
import { HiUser } from "react-icons/hi";

interface AuthAPIProps {
  children: React.ReactNode;
}

const AuthAPI: React.FC<AuthAPIProps> = ({ children }) => {
  const cookies = getTokensCookie();
  const { user } = UserStore;
  const navigate = useNavigate();

  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });

  useEffect(() => {
    protectRoute(UserStore, cookies, setLoading, navigate);
  }, []);

  return !loading ? (
    <div>
      {children}
      <div className="fixed bottom-0 right-0 m-3 mx-5">
        <div className="font-medium font-montserrat opacity-70">
          Select Launcher v{pkgJson.version}
        </div>
        <div className="font-medium opacity-70">
          <HiUser /> User ID: {user?._id}
        </div>
      </div>
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};

export default observer(AuthAPI);
