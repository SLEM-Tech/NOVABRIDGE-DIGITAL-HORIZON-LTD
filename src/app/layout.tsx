import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import "rc-drawer/assets/index.css";
import "@styles/globals.css";
import "@styles/index.css";

// Components & Constants
import AppProvider from "@src/components/config/AppProvider";
import { SEODATA, SITE_NAME, SITE_URL } from "@constants/seoContants";

// Optimized Font config to prevent "Failed to download" memory leaks
const inter = Inter({
	subsets: ["latin"], // Using standard latin for better compatibility
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap", 
	preload: false, // Prevents the crash by stopping the network fetch loop
});

// 1. Viewport Configuration (Decaprim Branded Color)
export const viewport: Viewport = {
	themeColor: "#0A48B2",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

// 2. Metadata Configuration
const { description, keywords, title, url, ogImage } = SEODATA.default;

export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s | ${SITE_NAME}`, 
	},
	description: description,
	keywords: keywords,
	applicationName: SITE_NAME,
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: SITE_NAME,
	},
	formatDetection: {
		telephone: false,
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/icons/apple-touch-icon.png", 
	},
	openGraph: {
		type: "website",
		url: SITE_URL,
		siteName: SITE_NAME,
		title: title,
		description: description,
		images: [
			{
				url: ogImage ?? "/images/og-main.png",
				width: 1200,
				height: 630,
				alt: SITE_NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: title,
		description: description,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='scroll-smooth'>
			<body
				className={`${inter.className} w-full min-h-screen antialiased bg-white text-slate-900`}
			>
				<AppProvider>
					<main className='relative flex flex-col min-h-screen'>
						{children}
					</main>
				</AppProvider>
			</body>
		</html>
	);
}
