import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { hashPassword, generateRandomToken, signToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/customer/verify-email
// Receives { first_name, last_name, username, email, password } → creates a verified user and returns JWT token
export async function POST(req: NextRequest) {
	try {
		const { first_name, last_name, username, email, password } = await req.json();

		if (!email || !first_name || !password) {
			return NextResponse.json(
				{ message: "All fields are required", status: false },
				{ status: 400 },
			);
		}

		const existing = await queryOne(
			`SELECT id FROM ${T.users} WHERE email = $1`,
			[email.toLowerCase()],
		);
		if (existing) {
			return NextResponse.json(
				{ message: "Email already registered", status: false },
				{ status: 409 },
			);
		}

		const passwordHash = await hashPassword(password.toString());

		const firstName = first_name.trim();
		const lastName = (last_name || "").trim();
		const resolvedUsername = username ||
			email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random() * 9999);

		// Insert the user as verified (no email verification step)
		const [user] = await query(
			`INSERT INTO ${T.users} (first_name, last_name, username, email, password_hash, role, is_verified)
       VALUES ($1, $2, $3, $4, $5, 'customer', true)
       RETURNING id, email, first_name, last_name, role`,
			[firstName, lastName, resolvedUsername, email.toLowerCase(), passwordHash],
		);

		const jwtToken = signToken({ id: user.id, email: user.email, role: user.role });

		return NextResponse.json({
			message: "Account created successfully",
			status: true,
			token: jwtToken,
			_id: user.id.toString(),
			name: `${user.first_name} ${user.last_name}`.trim(),
			email: user.email,
		});
	} catch (error) {
		console.error("Verify email error:", error);
		return NextResponse.json({ message: "Server error", status: false }, { status: 500 });
	}
}
