import { NextResponse } from "next/server"
import { query, execute } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`campaigns:${identifier}`, 100, 60000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let campaigns
    if (featured === "true") {
      campaigns = await query(
        "SELECT * FROM campaigns WHERE status = 'active' AND is_featured = 1 ORDER BY created_at DESC"
      )
    } else {
      campaigns = await query(
        "SELECT * FROM campaigns WHERE status = 'active' ORDER BY created_at DESC"
      )
    }

    return NextResponse.json({ campaigns })
  } catch (error) {
    console.error("[DB] Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json()
    const { title_en, title_ar, title_tr, slug, description_en, short_description_en, featured_image, goal_amount, is_featured, is_urgent, status } = body

    const result = await execute(
      `INSERT INTO campaigns (title_en, title_ar, title_tr, slug, description_en, short_description_en, featured_image, goal_amount, is_featured, is_urgent, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title_en, title_ar || null, title_tr || null, slug, description_en || null, short_description_en || null, featured_image || null, goal_amount || 0, is_featured ? 1 : 0, is_urgent ? 1 : 0, status || 'draft']
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
