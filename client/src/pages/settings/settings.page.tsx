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

            <div className="login text-white flex-col h-screen items-center justify-center px-5">
              <div className="login__box bg-secondary rounded-md shadow-xl w-screen">
                <section className="account__strip traking-normal flex items-center justify-center bg-tertiary rounded-t-md">
                  <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
                    Account
                  </h2>
                </section>
                <section className="login__content flex flex-col ml-5 mr-5">
                  <h2 className="text-lg font-semibold mt-5">
                    We are so glad to have you back!
                  </h2>
                </section>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};

export { Settings };
