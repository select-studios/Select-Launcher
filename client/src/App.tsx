import { useRoutes, useLocation } from "react-router-dom";
import { Register, Home, Login, Settings } from "@/pages";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import UserSettings from "./pages/settings/user/usersettings.page";
import { NotFound_E } from "./pages/errors";
import { Detector, Offline, Online } from "react-detect-offline";
import AuthAPI from "./handlers/api/components/Auth";
import Offline_E from "./pages/errors/offline/offline.errorpage";
import { BiWifi, BiWifiOff } from "react-icons/bi";

const App: React.FC = () => {
  const location = useLocation();
  const page = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <AuthAPI>
          <Home />
        </AuthAPI>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/settings",
      element: (
        <AuthAPI>
          <Settings />
        </AuthAPI>
      ),
    },
    {
      path: "/settings/user",
      element: (
        <AuthAPI>
          <UserSettings />
        </AuthAPI>
      ),
    },
    { path: "*", element: <NotFound_E /> },
  ]);

  if (!page) return null;

  return (
    <AnimatePresence mode="wait">
      <Online>{React.cloneElement(page, { key: location.pathname })}</Online>
      <Offline>
        <Offline_E />
      </Offline>
    </AnimatePresence>
  );
};

export default App;
