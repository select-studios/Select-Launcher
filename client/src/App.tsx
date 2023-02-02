import { useRoutes, useLocation } from "react-router-dom";
import { Register, Home, Login, Verify } from "@/pages";
import { AnimatePresence } from "framer-motion";
import React from "react";

const App: React.FC = () => {
  const location = useLocation();
  const page = useRoutes([
    {
      path: "/",
      element: <Login />,
      index: true,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/register/:id/verify/:token",
      element: <Verify />,
    },
  ]);

  if (!page) return null;

  return (
    <AnimatePresence mode="wait">
      {/* <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} index />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:id/verify/:token" element={<Verify />} />
        </Routes> */}
      {React.cloneElement(page, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default App;
