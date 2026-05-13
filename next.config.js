/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
		unoptimized: true,
	},
	turbopack: {},
};

export default nextConfig;
