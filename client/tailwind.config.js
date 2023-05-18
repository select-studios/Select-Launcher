/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        secondary: "#181818",
        tertiary: "#272828",

        "primary-base": "#9980FA",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
  },

  plugins: [],
};
