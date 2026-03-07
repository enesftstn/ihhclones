import { NextResponse } from "next/server"
import { execute, query } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`volunteers:${identifier}`, 2, 3600000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const body = await request.json()
    const { full_name, email, phone, country, city, skills, availability, message } = body

    if (!full_name || !email)
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })

    await execute(
      "INSERT INTO volunteers (full_name, email, phone, country, city, skills, availability, motivation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [full_name, email, phone || null, country || null, city || null, skills ? JSON.stringify(skills) : null, availability || null, message || null]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DB] Error saving volunteer:", error)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const volunteers = await query("SELECT * FROM volunteers ORDER BY created_at DESC")
    return NextResponse.json({ volunteers })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error fetching volunteers:", error)
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 })
  }
}
