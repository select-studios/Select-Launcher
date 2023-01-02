/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#242425",
        secondary: "#282A2D",
        tertiary: "#393C40",

        "primary-base": "#9980FA",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
