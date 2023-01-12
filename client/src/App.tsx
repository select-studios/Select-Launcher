import { useState } from "react";
import { Button } from "@nextui-org/react";

import {
  HashRouter,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Home, Login } from "@/pages";

const App: React.FC = () => {
  return (
    <>
      <HashRouter>
        <section>
          <Routes>
            <Route path="/" element={<Login />} index />
            <Route path="/home" element={<Home />} />
          </Routes>
        </section>
      </HashRouter>
    </>
  );
};

export default App;
