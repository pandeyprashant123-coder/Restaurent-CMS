/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        seminormal: "480", // Custom font-weight between normal and medium
      },
      colors: {
        customBlue: "#1e40af", // Custom color name and value
        customGreen: {
          light: "#d1fae5",
          DEFAULT: "#10b981",
          dark: "#047857",
          orange: "#FF7918",
        },
        highlight: "#eff3f8",
        background: "#272727",
        trendsdark: "#3d2f25",
        mild: "#f6e9e1",
        restaurantcardhover: "#f3e6de",
      },
      backgroundImage: {
        darkmiddle: "linear-gradient(to top, #93501f, #93501f)",
        gradient: "linear-gradient(to top, #f7dbc8, #ffffff)",
        gradientmid: "linear-gradient(to top,#1c3aa3, #778cd5)",
      },
    },
  },
  plugins: [],
};
