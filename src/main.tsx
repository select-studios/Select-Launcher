import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./samples/node-api";
import "styles/index.css";

import { createTheme, NextUIProvider, Text } from "@nextui-org/react";

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

      link: "#9980FA",
    },
    space: {},
    fonts: {},
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NextUIProvider>
);
