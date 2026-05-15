/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        senda: {
          50: "#f1f8f1",
          100: "#dcedde",
          200: "#bbdbc0",
          300: "#8fc097",
          400: "#5fa069",
          500: "#3d8348",
          600: "#2c6936",
          700: "#23532c",
          800: "#1d4225",
          900: "#18361f",
          950: "#0c1e11",
        },
        ink: {
          50: "#f6f7f6",
          100: "#e3e6e3",
          200: "#c7cdc7",
          300: "#a3aca3",
          400: "#7c887d",
          500: "#5d6a5e",
          600: "#48544a",
          700: "#3a443c",
          800: "#303832",
          900: "#1f241f",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 16, 0.04), 0 8px 24px -8px rgba(16, 24, 16, 0.08)",
      },
    },
  },
  plugins: [],
};
