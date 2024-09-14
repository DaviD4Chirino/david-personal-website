 /** @type {Config} */ 
/** @typedef {import('tailwindcss').Config} Config */
import flowbite from "flowbite-react/tailwind";

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',flowbite.content(),],
	theme: {
		colors: {
		  text: "#050315",
		  background: "#fbfbfe",
		  primary: {
			lightest:"#f1faca",
			light:"#e4f69f",
			DEFAULT:"#c2d869",
			dark:"#99b13b",
			darkest:"#748b19"
		  },
	
		  secondary:{
			lightest:"#ffe2ce",
			light:"#ffcaa5",
			DEFAULT:"#e29d6d",
			dark:"#b9703d",
			darkest:"#914b1a"
		   
		  },
		  
		  tertiary: {
			lightest:"#b7badb",
			light:"#8187ba",
			DEFAULT:"#565d9c",
			dark:"#363d7f",
			darkest:"#1d2464"
		  },
		  grey:{
			100:"#f8f9fa",
			200:"#e9ecef",
			300:"#dee2e6",
			400:"#ced4da",
			DEFAULT:"#adb5bd",
			600:"#6c757d",
			700:"#495057",
			800:"#343a40",
			900:"#212529"
		   
		  }
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
	
		extend: {},
	  },
	  plugins: [require('tailwindcss-animated'),  flowbite.plugin(),require("@tailwindcss/typography")]

	}
