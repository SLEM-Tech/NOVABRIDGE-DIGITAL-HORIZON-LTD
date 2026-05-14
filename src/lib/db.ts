import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

declare global { var _pgPool: Pool | undefined; }

const pool = globalThis._pgPool ?? new Pool(
	connectionString
		? { connectionString, ssl: { rejectUnauthorized: false } }
		: {
				host: process.env.DB_HOST || "108.181.153.87",
				database: process.env.DB_NAME || "store_db",
				user: process.env.DB_USER || "postgres",
				password: process.env.DB_PASSWORD || "Retail@1234",
				port: Number(process.env.DB_PORT) || 5432,
				connectionTimeoutMillis: 5000,
				...(process.env.DB_SSL === "true"
					? { ssl: { rejectUnauthorized: false } }
					: {}),
			},
);

if (process.env.NODE_ENV !== "production") globalThis._pgPool = pool;

export async function query<T = any>(
	text: string,
	params?: any[],
): Promise<T[]> {
	const client = await pool.connect();
	try {
		const result = await client.query(text, params);
		return result.rows as T[];
	} finally {
		client.release();
	}
}

export async function queryOne<T = any>(
	text: string,
	params?: any[],
): Promise<T | null> {
	const rows = await query<T>(text, params);
	return rows[0] ?? null;
}

export default pool;
