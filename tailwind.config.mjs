/** @type {Config} */
/** @typedef {import('tailwindcss').Config} Config */
import flowbite from "flowbite-react/tailwind";

export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
		flowbite.content(),
	],

	theme: {
		colors: {
			text: "#050315",
			background: "#fbfbfe",
			primary: {
				lightest: "#f1faca",
				light: "#e4f69f",
				DEFAULT: "#c2d869",
				dark: "#99b13b",
				darkest: "#748b19",
			},

			secondary: {
				lightest: "#ffe2ce",
				light: "#ffcaa5",
				DEFAULT: "#e29d6d",
				dark: "#b9703d",
				darkest: "#914b1a",
			},

			tertiary: {
				lightest: "#b7badb",
				light: "#8187ba",
				DEFAULT: "#565d9c",
				dark: "#363d7f",
				darkest: "#1d2464",
			},

			grey: {
				50: "hsl(0, 0%, 97.30%)",
				100: "hsl(0, 0%, 94.10%)",
				200: "hsl(0, 0%, 88.20%)",
				300: "hsl(0, 0%, 80.40%)",
				400: "hsl(0, 0%, 68.20%)",
				DEFAULT: "hsl(0, 0%, 56.90%)",
				600: "hsl(0, 0%, 46.30%)",
				700: "hsl(0, 0%, 36.90%)",
				800: "hsl(0, 0%, 25.40%)",
				900: "hsl(0, 0%, 20.90%)",
				950: "hsl(0, 0%, 10.30%)",
			},
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
		// input:{}

		extend: {
			backgroundImage: {
				404: "url('/assets/404page/404.webp')",
			},
		},
	},
	plugins: [
		require("tailwindcss-animated"),
		flowbite.plugin(),
		require("@tailwindcss/typography"),
	],
};
