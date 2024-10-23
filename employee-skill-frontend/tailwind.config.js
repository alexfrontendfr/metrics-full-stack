module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
primary: "#006CFF", // Blue (Main brand color)
        success: "#63ad0e", // Green (Success)
        warning: "#ffc000", // Orange (Warning)
        error: "#ff003c", // Red (Error)
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
