/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      text: "#050315",
      background: "#fbfbfe",
      primary: "#474646",
      secondary: "#b6b6b6",
      accent: "#141414",
    },
    fontFamily: {
      heading: "Lunasima",
      body: "Urbanist",
    },
    fontSize: {
      sm: "0.800rem",
      base: "1rem",
      xl: "1.250rem",
      "2xl": "1.563rem",
      "3xl": "1.954rem",
      "4xl": "2.442rem",
      "5xl": "3.053rem",
    },

    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@designbycode/tailwindcss-text-stroke")],
};
