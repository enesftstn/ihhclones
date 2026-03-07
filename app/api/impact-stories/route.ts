import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`stories:${identifier}`, 100, 60000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let stories
    if (featured === "true") {
      stories = await query(
        "SELECT * FROM impact_stories WHERE is_published = 1 AND is_featured = 1 ORDER BY published_at DESC"
      )
    } else {
      stories = await query(
        "SELECT * FROM impact_stories WHERE is_published = 1 ORDER BY published_at DESC"
      )
    }

    return NextResponse.json({ stories })
  } catch (error) {
    console.error("[DB] Error fetching stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}
