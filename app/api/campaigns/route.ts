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
        "SELECT * FROM campaigns WHERE is_active = 1 AND is_featured = 1 ORDER BY sort_order ASC, created_at DESC"
      )
    } else {
      campaigns = await query(
        "SELECT * FROM campaigns WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC"
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
    const { title, slug, subtitle, description, image_url, cta_label, cta_link, goal_amount, is_featured, is_active, sort_order } = body

    const result = await execute(
      `INSERT INTO campaigns (title, slug, subtitle, description, image_url, cta_label, cta_link, goal_amount, is_featured, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, subtitle || null, description || null, image_url || null, cta_label || 'Donate', cta_link || null, goal_amount || 0, is_featured ? 1 : 0, is_active !== false ? 1 : 0, sort_order || 0]
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
