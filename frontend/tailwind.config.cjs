/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b0f1e",
        nebula: "#1a1f3a",
        comet: "#2a3161",
        aurora: "#66f3ff",
        flare: "#ff7ad9",
        ember: "#f9b233"
      },
      boxShadow: {
        glow: "0 0 20px rgba(102, 243, 255, 0.35)",
        flare: "0 0 25px rgba(255, 122, 217, 0.4)"
      }
    }
  },
  plugins: []
};
