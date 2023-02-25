import { useRoutes, useLocation } from "react-router-dom";
import { Register, Home, Login, Settings } from "@/pages";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import UserSettings from "./pages/settings/user/usersettings.page";
import { NotFound_E } from "./pages/errors";
import AuthAPI from "./handlers/api/components/Auth";

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
      {React.cloneElement(page, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default App;
