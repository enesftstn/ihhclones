import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 100)

    let media
    if (type) {
      media = await query(
        `SELECT * FROM media WHERE file_type LIKE ? ORDER BY created_at DESC LIMIT ${limit}`,
        [`${type}%`]
      )
    } else {
      media = await query(
        `SELECT * FROM media ORDER BY created_at DESC LIMIT ${limit}`
      )
    }

    return NextResponse.json(media)
  } catch (error) {
    console.error("[v0] Error fetching media gallery:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}
