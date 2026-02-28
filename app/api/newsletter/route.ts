import { NextResponse } from "next/server"
import { execute, query } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`newsletter:${identifier}`, 5, 3600000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const body = await request.json()
    const { email } = body

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

    await execute(
      "INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE status = 'subscribed'",
      [email]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DB] Error subscribing:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const subscribers = await query("SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC")
    return NextResponse.json({ subscribers })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error fetching subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
  }
}