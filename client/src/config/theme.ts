import { createTheme } from "@nextui-org/react";

export default createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      primaryLight: "#cec2fd",
      primaryLightHover: "#baa9fc",
      primaryLightActive: "#a691fb",
      primaryLightContrast: "#7f60f9",
      primary: "#9c88ff",
      primaryBorder: "#9378fa",
      primaryBorderHover: "#7f60f9",
      primarySolidHover: "#6b47f8",
      primarySolidContrast: "$white",
      primaryShadow: "#9378fa",

      link: "#3b82f6",
      selection: "3882F6",

      secondary: "#8e44ad",

      background: "#242425",
      tertiary: "#393C40",

      "primary-base": "#9980FA",
    },
    space: {},
    fonts: {
      sans: "'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Montserrat', 'Inter', sans-serif;",
    },
  },
});
