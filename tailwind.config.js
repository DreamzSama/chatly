/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#2B2638",
        primary: "#6E54B5",
        pColor: "#8994AE",
        mainBg: "#0B0A16"
      }
    },
  },
  plugins: [],
}

