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

    background: "#545760", 
    surface: "#12131A", // Dark panel surface
    panel: "#161925",   // Soft neon slate
    
    // CHANGED: Fixed names to avoid automatic text inversion bugs
    textDark: "#FFFFFF", // Clear tracking label name for your white text
    textLight: "#12131A", // Inverse text color anchor

    primary: {
        100: "#E000FF", // Neon Pink
        200: "#9D00FF",
        300: "#00F0FF", // Electric Cyan
        400: "#00B8FF",
        DEFAULT: "#00F0FF",
    },

    // CHANGED: Flipped scale order to keep 50 as Lightest and 900 as Darkest
    gray: {
        50: "#FFFFFF",
        100: "#EAEBFA",
        200: "#D3D7E8",
        300: "#B2B7D1",
        400: "#8F95B2",
        500: "#6B728E",
        600: "#414659",
        700: "#2B2F40",
        800: "#222531",
        900: "#1A1C23",
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
    price: "#00F0FF",  // Electric Cyan Accent
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
