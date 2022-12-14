/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      backgroundColor: {
        main: "#FAFAFA",
        second: "#FFA114",
        black: "#111111",
        white: "#F2F2F2"
      },
      borderColor:{
        main: "#1a1a1a",
      },
      textColor:{
        main: "#FFA114",
      }
    },
  },
  plugins: [],
};
