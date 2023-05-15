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
import AdminDashboard from "./pages/admin/dashboard/admindashboard.page";

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
    {
      path: "/admin/dashboard",
      element: (
        <AuthAPI>
          <AdminDashboard />
        </AuthAPI>
      ),
    },
    { path: "*", element: <NotFound_E /> },
  ]);

  if (!page) return null;

  return (
    <AnimatePresence mode="wait">
      <Detector
        render={({ online }) => {
          if (!online) {
            setTimeout(() => {
              return <Offline_E />;
            }, 5000);
          }

          return React.cloneElement(page, { key: location.pathname });
        }}
      />
    </AnimatePresence>
  );
};

export default App;
