import { NextResponse } from "next/server"
import { execute } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Hash the default admin password
    const passwordHash = await bcrypt.hash("Admin123!", 12)

    // Insert default admin user if not exists
    await execute(
      `INSERT INTO users (full_name, email, password_hash, role, is_active, email_verified_at)
       VALUES (?, ?, ?, 'admin', 1, NOW())
       ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)`,
      ["System Administrator", "admin@hoprelief.org", passwordHash]
    )

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully! Login with admin@hoprelief.org / Admin123!",
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to setup database",
      },
      { status: 500 },
    )
  }
}
