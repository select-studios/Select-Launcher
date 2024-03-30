import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as dotenv from "dotenv";
import "./assets/styles/index.css";

import { Chip, NextUIProvider } from "@nextui-org/react";

dotenv.config({ path: "../.env" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <div className="font-sans">
          <div className="w-screen mb-2 text-sm h-full tracking-wider font-heading bg-primaryBG p-1 pl-5 appbar Draggable-Region">
            Select Launcher{" "}
            <Chip size="sm" color="primary" className="ml-2">
              v3
            </Chip>
          </div>
          <App />
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </Router>
    </NextUIProvider>
  </React.StrictMode>
);
