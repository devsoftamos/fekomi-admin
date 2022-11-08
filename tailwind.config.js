/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        primary: "#004976",
        white: "#fff",
        grey: "#989B9C",
        blue: "#6FC8FF",
        lightblue: "#E5F1FF",
        deepGrey: "#D0D0D0",
        deepBlue: "#2F93F6",
        secondary: "#F6F6F6",
      },
    },
  },
  plugins: [require('daisyui')],
}