/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%":   { transform: "translateX(-100%)" },
          "50%":  { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        loading: "loading 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}