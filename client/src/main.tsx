import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as dotenv from "dotenv";

import { NextUIProvider } from "@nextui-org/react";
import theme from './config/theme';

dotenv.config({ path: "../.env" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider theme={theme}>
    <React.StrictMode>
      <Router>
        <App />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </React.StrictMode>
  </NextUIProvider>,
);
