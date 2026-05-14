import { Metadata } from "next";

// 1. Core Configuration Constants
export const SITE_NAME = "BRIDGELINE VERTEX INNOVATIONS LTD";
export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://bridgelinevertex.com";
export const TWITTER_HANDLE = "@BridgelineVertex";

interface SEOConfig {
	title: string;
	description: string;
	keywords: string[];
	url?: string;
	ogImage?: string;
	noIndex?: boolean;
}

// 2. The SEO Database
export const SEODATA: Record<string, SEOConfig> = {
	default: {
		title: `${SITE_NAME} | BRIDGELINE VERTEX INNOVATIONS LTD`,
		description:
			"BRIDGELINE VERTEX INNOVATIONS LTD delivers elite software engineering, AI-driven automation, and strategic digital transformation to scale global enterprises.",
		keywords: [
			"BRIDGELINE VERTEX INNOVATIONS LTD",
			"Bridgeline Vertex",
			"Software Engineering Nigeria",
			"Digital Transformation Ventures",
			"AI Business Solutions",
			"Enterprise Software Development",
			"Tech Venture Studio",
		],
		url: SITE_URL,
		ogImage: `${SITE_URL}/og-main.png`, 
	},
	home: {
		title: `${SITE_NAME} | Innovative Digital Products & Tech Excellence`,
		description:
			"Build the future with BRIDGELINE VERTEX INNOVATIONS LTD. From custom mobile applications to complex AI ecosystems, we engineer high-performance products tailored to your vision.",
		keywords: [
			"Mobile App Development",
			"Cloud Native Applications",
			"Product Engineering",
			"UI/UX Design Studio",
			"Software Architecture",
		],
		url: SITE_URL,
	},
	services: {
		title: `Our Tech Services | Solutions by ${SITE_NAME}`,
		description:
			"Explore our suite of services: Full-stack development, cybersecurity consulting, data analytics, and bespoke SaaS engineering.",
		keywords: [
			"SaaS Engineering",
			"Cybersecurity Consulting",
			"Machine Learning Integration",
			"API Development",
			"IT Infrastructure",
		],
	},
	portfolio: {
		title: `Portfolio | Digital Impact Projects by ${SITE_NAME}`,
		description:
			"See how BRIDGELINE VERTEX INNOVATIONS LTD drives growth. Browse our case studies in fintech, healthtech, and enterprise automation.",
		keywords: [
			"Software Portfolio",
			"Tech Case Studies",
			"Success Stories",
			"Digital Transformation Examples",
		],
	},
	consultation: {
		title: `Strategy Session | Tech Consulting at ${SITE_NAME}`,
		description:
			"Scale your technical capabilities. Schedule a consultation with our venture experts to map out your digital innovation roadmap.",
		keywords: [
			"Tech Consultation",
			"CTO as a Service",
			"Digital Strategy",
			"Hire Technical Teams",
		],
	},
	login: {
		title: `Partner Portal Login | ${SITE_NAME}`,
		description:
			"Access your Bridgeline Vertex client dashboard to track development sprints, manage documentation, and collaborate with your team.",
		keywords: [
			"Client login",
			"Bridgeline Vertex Dashboard",
			"Project tracking",
		],
	},
	register: {
		title: `Onboard with Us | Join ${SITE_NAME}`,
		description:
			"Start your digital journey with BRIDGELINE VERTEX INNOVATIONS LTD. Register to access project resources and technical roadmaps.",
		keywords: [
			"Register Bridgeline Vertex",
			"Project onboarding",
			"Tech partnership",
		],
	},
	user_dashboard: {
		title: `Project Dashboard | ${SITE_NAME}`,
		description:
			"Real-time visibility into project milestones, technical debt metrics, and innovation performance.",
		keywords: [
			"Milestone tracking",
			"Development metrics",
			"Project management portal",
		],
		noIndex: true,
	},
};

/**
 * Helper to generate Next.js Metadata objects
 */
export function constructMetadata(
	pageKey: keyof typeof SEODATA = "default",
): Metadata {
	const config = SEODATA[pageKey] || SEODATA.default;

	const allKeywords = Array.from(
		new Set([...config.keywords, ...SEODATA.default.keywords]),
	);

	return {
		title: config.title,
		description: config.description,
		keywords: allKeywords.join(", "),
		openGraph: {
			title: config.title,
			description: config.description,
			url: config.url || SITE_URL,
			siteName: SITE_NAME,
			images: [{ url: config.ogImage || SEODATA.default.ogImage! }],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: config.title,
			description: config.description,
			creator: TWITTER_HANDLE,
			images: [config.ogImage || SEODATA.default.ogImage!],
		},
		robots: config.noIndex ? "noindex, nofollow" : "index, follow",
		alternates: {
			canonical: config.url || SITE_URL,
		},
	};
}
