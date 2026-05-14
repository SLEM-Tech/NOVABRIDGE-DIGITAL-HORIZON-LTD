import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@src/lib/db";
import { hashPassword } from "@src/lib/auth";
import { T } from "@src/lib/tables";

const ADMIN_EMAIL = "admin@gmail.com";

// GET /api/admin/bootstrap?secret=decaprim-admin-2024
// Safe to run multiple times.
// - If admin@gmail.com exists → updates email to admin@decaprim.com
// - If admin@decaprim.com exists → no-op
// - If neither exists → creates new super admin with admin@decaprim.com
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== "apexlogic-admin-2024") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    // Check if correct email already exists
    const existing = await queryOne<any>(
      `SELECT id, email FROM ${T.users} WHERE email = $1`,
      [ADMIN_EMAIL],
    );

    if (existing) {
      const hash = await hashPassword("admin");
      await queryOne<any>(
        `UPDATE ${T.users} SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
        [hash, existing.id],
      );
      return NextResponse.json({
        message: "Super admin password reset",
        admin: { id: existing.id, email: existing.email },
      });
    }

    // Check if old admin exists → migrate email
    const oldAdmin = await queryOne<any>(
      `SELECT id FROM ${T.users} WHERE username = $1`,
      ["superadmin"],
    );

    if (oldAdmin) {
      const hash = await hashPassword("admin");
      const updated = await queryOne<any>(
        `UPDATE ${T.users} SET email = $1, password_hash = $2, updated_at = NOW()
         WHERE id = $3
         RETURNING id, username, email, role`,
        [ADMIN_EMAIL, hash, oldAdmin.id],
      );
      return NextResponse.json({
        message: "Super admin updated",
        admin: updated,
      });
    }

    // No admin exists → create fresh
    const hash = await hashPassword("admin");
    const admin = await queryOne<any>(
      `INSERT INTO ${T.users}
       (username, email, password_hash, first_name, last_name, role, is_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'admin', true, NOW(), NOW())
       RETURNING id, username, email, role`,
      ["superadmin", ADMIN_EMAIL, hash, "Super", "Admin"],
    );

    return NextResponse.json({ message: "Super admin created successfully", admin });
  } catch (error: any) {
    console.error("Bootstrap error:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
}
