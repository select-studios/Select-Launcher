import { useRoutes, useLocation } from "react-router-dom";
import { Register, Home, Login, Settings } from "@/pages";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import UserSettings from "./pages/settings/user/usersettings.page";
import { NotFound_E } from "./pages/errors";
import { UserStore } from "./stores/UserStore";
import AuthAPI from "./handlers/api/components/Auth";

const App: React.FC = () => {
  const location = useLocation();
  const page = useRoutes([
    {
      path: "/",
      element: <Login userStore={UserStore} />,
    },
    {
      path: "/home",
      element: (
        <AuthAPI userStore={UserStore}>
          <Home userStore={UserStore} />
        </AuthAPI>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    { path: "/settings", element: <Settings userStore={UserStore} /> },
    { path: "/settings/user", element: <UserSettings /> },
    { path: "*", element: <NotFound_E /> },
  ]);

  if (!page) return null;

  return (
    <AnimatePresence mode="wait">
      {/* 
      Routes
        ROUTE 1 (NOT PROTECTED LOGIN)
        <AUTHAPI>
          ROUTE 2 (HOME, PROTECTED)
          ROUTE 3 (settings, protected)
       */}
      {React.cloneElement(page, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default App;
