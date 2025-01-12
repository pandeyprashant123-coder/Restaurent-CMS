/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      maxHeight: {
        96: "35rem",
      },
    },
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   white: "#ffffff",
    //   heroColor: "#006fbd",
    // },
  },
  plugins: [require("flowbite/plugin")],
};
