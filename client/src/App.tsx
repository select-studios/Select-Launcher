import { useRoutes, useLocation } from "react-router-dom";
import { Register, Home, Login, Settings } from "@/pages";
import { AnimatePresence } from "framer-motion";
import React from "react";
import UserSettings from "./pages/settings/user/usersettings.page";
import { NotFound_E } from "./pages/errors";

const App: React.FC = () => {
  const location = useLocation();
  const page = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    { path: "/settings", element: <Settings /> },
    { path: "/settings/user", element: <UserSettings /> },
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
