/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1120",
        nebula: "#1f2a44",
        aurora: "#67e8f9",
        ember: "#f97316",
      },
      boxShadow: {
        glow: "0 0 30px rgba(103, 232, 249, 0.15)",
      },
    },
  },
  plugins: [],
};
