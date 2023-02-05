import { AppBar, Sidebar } from "@/components";
import { Loader, LoadingState } from "@/components/loader/loader.component";
import { logout } from "@/handlers/api";
import protectRoute from "@/handlers/api/protectRoute";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [user, setUser] = useState<any>();
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
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <div className="home w-full">
          <AppBar dashboard={true} user={user} logoutFn={logoutClient} />

          <div className="flex">
            <Sidebar active="settings" />

            <div className="mt-10">settings</div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};

export { Settings };
