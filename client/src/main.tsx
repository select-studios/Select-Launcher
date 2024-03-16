import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as dotenv from "dotenv";
import "./assets/styles/index.css";

import { NextUIProvider } from "@nextui-org/react";

dotenv.config({ path: "../.env" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <div className="w-screen h-11 bg-secondaryBG appbar Draggable-Region" />
        <App />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </NextUIProvider>
  </React.StrictMode>
);
