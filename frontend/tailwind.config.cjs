module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./tests/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1021",
        nebula: "#111a33",
        aurora: "#1f2a4c",
        glow: "#7fd8ff",
        pulse: "#ff8bf1"
      },
      boxShadow: {
        glow: "0 0 30px rgba(127,216,255,0.2)",
        pulse: "0 0 40px rgba(255,139,241,0.25)"
      }
    }
  },
  plugins: []
};
