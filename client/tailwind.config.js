/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
import themes from "./themes.json";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBG: "var(--primaryBG)",
        secondaryBG: "var(--secondaryBG)",
        tertiaryBG: "var(--tertiaryBG)",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      heading: ["Titan One", "sans-serif"],
    },
  },
  important: true,
  safelist: [
    "border-yellow-600",
    "border-green-600",
    "border-red-600",
    "border-yellow-400",
    "border-primary-base",
  ],

  plugins: [
    nextui({
      themes: themes,
      defaultTheme: "dark",
    }),
    require("@tailwindcss/typography"),
  ],
};
