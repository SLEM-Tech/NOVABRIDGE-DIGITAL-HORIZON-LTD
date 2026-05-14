import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",

				/* ========== Cyberpunk Foundation ========== */
				brand: {
					navy: "#0D0E15", // Deep cyber space background
					blue: "#00F0FF", // Electric cyan
					light: "#1F2335", // Dark card/surface background
				},

				background: "#545760", // Void black
				surface: "#12131A", // Dark panel surface
				panel: "#161925", // Soft neon slate
				dark: "#FFFFFF", // High-contrast text

				primary: {
					100: "#E000FF", // Neon Pink
					200: "#9D00FF",
					300: "#00F0FF", // Electric Cyan
					400: "#00B8FF",
					DEFAULT: "#00F0FF",
				},

				gray: {
					50: "#1A1C23",
					100: "#222531",
					200: "#2B2F40",
					300: "#414659",
					400: "#6B728E",
					500: "#8F95B2",
					600: "#B2B7D1",
					700: "#D3D7E8",
					800: "#EAEBFA",
					900: "#FFFFFF",
				},

				success: {
					light: "#00FF66",
					DEFAULT: "#39FF14",
					dark: "#00CC44",
				},
				danger: {
					light: "#fd6d91",
					DEFAULT: "#FF0055",
					dark: "#990033",
				},

				accent: "#E000FF", // Neon Pink Accent
				price: "#00F0FF", // Electric Cyan Accent
				whatsapp: "#25D366",
			},

			animation: {
				"spin-slow": "spin 8s linear infinite",
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-in": "slideIn 0.3s ease-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideIn: {
					"0%": { transform: "translateX(100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
			},
		},
		screens: {
			xs: "400px",
			xmd: "800px",
			slg: "999px",
			...require("tailwindcss/defaultTheme").screens,
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: "#00F0FF",
							foreground: "#08090C",
						},
						focus: "#E000FF",
						content1: "#1F2335",
						content2: "#1F2335",
						content3: "#2B2F40",
						content4: "#2B2F40",
						default: {
							DEFAULT: "#1F2335",
							foreground: "#FFFFFF",
						},
					},
				},
			},
		}),
	],
};
export default config;
