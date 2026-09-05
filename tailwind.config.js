/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF6",
        ink: "#1C2A39",
        teal: {
          DEFAULT: "#2F6F62",
          dark: "#204b42",
        },
        border: "#D9D4C7",
        slate: "#66707A",
      },
      fontFamily: {
        doc: ["Cambria", "Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
