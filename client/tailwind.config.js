/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

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
        primaryBG: "#050505",
        secondaryBG: "#090909",
        tertiaryBG: "#121212",

        primary: "#A558F2",
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
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "#050505",
            primary: "#A558F2",
            default: "#121212",
            "default-100": "#121212",
            content1: "#090909",
            content2: "#121212",
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
};
