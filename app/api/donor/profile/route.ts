import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    // Get user profile
    const users = await query("SELECT id, full_name, email, phone, avatar_url, role, created_at FROM users WHERE email = ?", [email])

    if (users.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get donation history
    const donations = await query(
      "SELECT * FROM donations WHERE donor_email = ? OR user_id = ? ORDER BY created_at DESC",
      [email, users[0].id]
    )

    return NextResponse.json({
      profile: users[0],
      donations,
    })
  } catch (error) {
    console.error("[v0] Error fetching donor profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, full_name, phone } = body

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    await query(
      "UPDATE users SET full_name = ?, phone = ? WHERE email = ?",
      [full_name || null, phone || null, email]
    )

    const updated = await query("SELECT id, full_name, email, phone, avatar_url, role, created_at FROM users WHERE email = ?", [email])

    if (updated.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(updated[0])
  } catch (error) {
    console.error("[v0] Error updating donor profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
