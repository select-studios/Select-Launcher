import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as dotenv from "dotenv";
import Titlebar from "./components/titlebar/titlebar";
import "./assets/styles/index.css";
import "animate.css";

import { NextUIProvider } from "@nextui-org/react";

dotenv.config({ path: "../.env" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main>
      <NextUIProvider>
        <Router>
          <div className="font-sans">
            <Titlebar />
            <App />

            <ToastContainer position="bottom-right" theme="dark" />
          </div>
        </Router>
      </NextUIProvider>
    </main>
  </React.StrictMode>
);
