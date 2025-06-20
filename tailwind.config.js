/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,js}", "./components/**/*.{tsx,js}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
