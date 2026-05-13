"use client";
import { signOut } from "@utils/lib";
import { useMutation, useQuery } from "react-query";

// ── URL builder ──────────────────────────────────────────────────────────────
function buildInternalUrl(endpoint: string, params?: Record<string, any>): string {
	const isClient = typeof window !== "undefined";
	const base = isClient
		? window.location.origin
		: (process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

	const [path, qs] = endpoint.split("?");
	const parts = path.replace(/^\//, "").split("/").filter((p, i) => i < 2 || p !== "");

	let internalPath: string;

	if (parts[0] === "products" && parts[1] === "categories") {
		internalPath = parts[2] ? `/api/category/${parts[2]}` : "/api/category";
	} else if (parts[0] === "products" && parts[1] && parts[1] !== "") {
		internalPath = `/api/products/${parts[1]}`;
	} else if (parts[0] === "products") {
		internalPath = "/api/products";
	} else if (parts[0] === "orders" && parts[1]) {
		internalPath = `/api/order/${parts[1]}`;
	} else if (parts[0] === "orders") {
		internalPath = "/api/order";
	} else if (parts[0] === "customers" && parts[1] === "me") {
		internalPath = "/api/customer/userinfo";
	} else if (parts[0] === "customers" && parts[1]) {
		internalPath = `/api/customer/${parts[1]}`;
	} else if (parts[0] === "settings" && parts[1] === "general") {
		internalPath = "/api/setting/global/all";
	} else {
		internalPath = `/${parts.join("/")}`;
	}

	const url = new URL(base + internalPath);
	if (qs) new URLSearchParams(qs).forEach((v, k) => url.searchParams.set(k, v));
	if (params) Object.entries(params).forEach(([k, v]) => v !== undefined && url.searchParams.set(k, String(v)));
	return url.toString();
}

function authHeaders(): Record<string, string> {
	if (typeof window === "undefined") return {};
	const token = document.cookie.match(/LOGIN_ACCESS=([^;]+)/)?.[1];
	return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── WooCommerce client ───────────────────────────────────────────────────────
export const WooCommerce = {
	async get(endpoint: string, params?: Record<string, any>, withAuth = false) {
		const url = buildInternalUrl(endpoint, params);
		const res = await fetch(url, {
			cache: "no-store",
			headers: withAuth ? authHeaders() : {},
		});
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			throw Object.assign(new Error(body.message || "API error"), {
				response: { status: res.status, data: body },
			});
		}
		const data = await res.json();
		const headers: Record<string, string> = {};
		res.headers.forEach((value, key) => { headers[key] = value; });
		return { data, headers };
	},

	async post(endpoint: string, body: any, withAuth = false) {
		const url = buildInternalUrl(endpoint);
		const res = await fetch(url, {
			method: "POST",
			cache: "no-store",
			headers: { "Content-Type": "application/json", ...(withAuth ? authHeaders() : {}) },
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			const b = await res.json().catch(() => ({}));
			throw Object.assign(new Error(b.message || "API error"), { response: { status: res.status, data: b } });
		}
		const data = await res.json();
		const headers: Record<string, string> = {};
		res.headers.forEach((value, key) => { headers[key] = value; });
		return { data, headers };
	},

	async put(endpoint: string, body: any, withAuth = false) {
		const url = buildInternalUrl(endpoint);
		const res = await fetch(url, {
			method: "PUT",
			cache: "no-store",
			headers: { "Content-Type": "application/json", ...(withAuth ? authHeaders() : {}) },
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			const b = await res.json().catch(() => ({}));
			throw Object.assign(new Error(b.message || "API error"), { response: { status: res.status, data: b } });
		}
		const data = await res.json();
		const headers: Record<string, string> = {};
		res.headers.forEach((value, key) => { headers[key] = value; });
		return { data, headers };
	},
};

// ── Hooks ────────────────────────────────────────────────────────────────────
export const useCustomer = (customerId: string | undefined) => {
	const hasToken = typeof document !== "undefined" &&
		document.cookie.includes("LOGIN_ACCESS");

	return useQuery(
		["customer", customerId],
		async () => {
			const response = await WooCommerce.get(`customers/me`, undefined, true);
			return response.data;
		},
		{
			onError: (error: any) => {
				if (hasToken && (error.response?.status === 401 || error.response?.status === 403)) {
					signOut();
				}
			},
			enabled: hasToken,
			staleTime: Infinity,
			retry: false,
		},
	);
};

export const useProduct = (productId: string | undefined) => {
	return useQuery(
		["product", productId],
		async () => {
			const response = await WooCommerce.get(`products/${productId}`);
			return response.data;
		},
		{ staleTime: Infinity },
	);
};

export const useCustomerOrders = (customerId: number | string | undefined) => {
	return useQuery(
		["customer-orders", customerId],
		async () => {
			if (!customerId) throw new Error("Customer ID is required");
			const response = await WooCommerce.get("orders", { limit: 100 }, true);
			// API returns { orders: [...], totalDoc, ... }
			return response.data.orders ?? [];
		},
		{ enabled: !!customerId, staleTime: 5 * 60 * 1000, retry: 2 },
	);
};

export const useOrders = (id?: string, page: number = 1, perPage: number = 10) => {
	const hasToken = typeof document !== "undefined" &&
		document.cookie.includes("LOGIN_ACCESS");

	return useQuery(
		["order", id, page, perPage],
		async () => {
			if (id) {
				const response = await WooCommerce.get(`orders/${id}`, undefined, true);
				return { data: [response.data], totalItems: 1, totalPages: 1 };
			}
			const response = await WooCommerce.get("orders", { page, limit: perPage }, true);
			return {
				data: response.data.orders ?? [],
				totalItems: response.data.totalDoc ?? 0,
				totalPages: response.data.pages ?? 0,
			};
		},
		{ enabled: hasToken, keepPreviousData: true, refetchOnWindowFocus: true, staleTime: Infinity },
	);
};

export const useMediaUpload = () => {
	return useMutation(async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("title", `Receipt_${Date.now()}`);
		const res = await fetch("/api/media", { method: "POST", body: formData });
		if (!res.ok) throw new Error("Media upload failed");
		return await res.json();
	});
};

export const useUpdateOrder = () => {
	return useMutation(async ({ orderId, data }: { orderId: number; data: any }) => {
		const response = await WooCommerce.put(`orders/${orderId}`, data);
		return response.data;
	});
};

export const useProductSearch = (query: string | undefined) => {
	return useQuery(
		["product-search", query],
		async () => {
			const response = await WooCommerce.get(`products?search=${query}`);
			return response.data;
		},
		{ staleTime: Infinity },
	);
};

export const useGeneralSettings = () => {
	return useQuery("general-settings", async () => {
		const response = await WooCommerce.get("settings/general");
		return response.data;
	});
};

export const useCategories = (categoryId: string | undefined) => {
	return useQuery(
		["categories", categoryId],
		async () => {
			// When fetching all categories, call /api/category directly
			const url = !categoryId
				? "/api/category"
				: buildInternalUrl(`products/categories/${categoryId}`);
			const res = await fetch(url, { cache: "no-store" });
			if (!res.ok) throw new Error("Failed to fetch categories");
			return res.json();
		},
		{ staleTime: Infinity, enabled: categoryId !== undefined },
	);
};

export const useCreateOrder = () => {
	return useMutation(async (orderData: any) => {
		const response = await WooCommerce.post("orders", orderData);
		return response.data;
	});
};

export const useProductsByCategory = (categoryId: string) => {
	return useQuery(
		["category-products", categoryId],
		async () => {
			const response = await WooCommerce.get(`products?category=${categoryId}`);
			return response.data;
		},
	);
};

export const useProducts = (params?: Record<string, any>) => {
	return useQuery(
		["products", params],
		async () => {
			const response = await WooCommerce.get("products", params);
			return response.data;
		},
		{ staleTime: 5 * 60 * 1000 },
	);
};

export const useUpdateCustomer = () => {
	return useMutation(async (updatedCustomerData: any) => {
		const { first_name, last_name, email, billing, shipping } = updatedCustomerData;
		// Transform WooCommerce-style payload to the internal API shape
		const payload = {
			name: `${first_name || ""} ${last_name || ""}`.trim(),
			email,
			address: billing?.address_1,
			phone: billing?.phone,
			image: shipping?.address_2,
		};
		const headers = { "Content-Type": "application/json", ...authHeaders() };
		const res = await fetch("/api/customer", {
			method: "PUT",
			headers,
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			const b = await res.json().catch(() => ({}));
			throw Object.assign(new Error(b.message || "API error"), { response: { status: res.status, data: b } });
		}
		return res.json();
	});
};
