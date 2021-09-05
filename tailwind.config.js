module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: (theme) => theme("colors"),
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      colors: {
        primary: "#070C2B",
        smoothPrimary: "#343759",
        accent: "#FDAFDD",
        smoothAccent: "#FFE5FD",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
