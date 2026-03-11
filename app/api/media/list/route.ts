import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`media:${identifier}`, 100, 60000)

    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "50"), 100)
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const fileType = searchParams.get("type")

    let media
    if (fileType) {
      media = await query(
        `SELECT * FROM media WHERE file_type LIKE ? ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
        [`${fileType}%`]
      )
    } else {
      media = await query(
        `SELECT * FROM media ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
      )
    }

    return NextResponse.json({ media })
  } catch (error) {
    console.error("[v0] Error listing media:", error)
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 })
  }
}
