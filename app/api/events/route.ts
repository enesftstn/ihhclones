import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: NextRequest) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`events:${identifier}`, 100, 60000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let events
    if (featured === "true") {
      events = await query(
        "SELECT * FROM events WHERE is_published = 1 AND is_featured = 1 AND start_datetime >= NOW() ORDER BY start_datetime ASC"
      )
    } else {
      events = await query(
        "SELECT * FROM events WHERE is_published = 1 AND start_datetime >= NOW() ORDER BY start_datetime ASC"
      )
    }

    return NextResponse.json({ events })
  } catch (error) {
    console.error("[DB] Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
