import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./samples/node-api";
import "styles/index.css";
import * as dotenv from "dotenv";

import { createTheme, NextUIProvider, Text } from "@nextui-org/react";
import { CookiesProvider } from "react-cookie";

dotenv.config({ path: "../.env" });

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "#cec2fd",
      primaryLightHover: "#baa9fc",
      primaryLightActive: "#a691fb",
      primaryLightContrast: "#7f60f9",
      primary: "#9980FA",
      primaryBorder: "#9378fa",
      primaryBorderHover: "#7f60f9",
      primarySolidHover: "#6b47f8",
      primarySolidContrast: "$white",
      primaryShadow: "#9378fa",

      secondary: "#fff",

      link: "#9980FA",
    },
    space: {},
    fonts: {},
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider theme={theme}>
    <CookiesProvider>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </CookiesProvider>
  </NextUIProvider>
);
