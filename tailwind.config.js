/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayishBlue: "hsl(239, 57%, 85%)",
        modalBackground: "rgba(0,0,0,0.1)"
      },
    },
  },
  plugins: [],
};
