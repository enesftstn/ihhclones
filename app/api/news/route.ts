import { NextResponse } from "next/server"
import { query, execute } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`news:${identifier}`, 100, 60000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 100)
    const categoryId = searchParams.get("categoryId")

    let news
    if (categoryId) {
      news = await query(
        `SELECT * FROM news 
         WHERE published_at IS NOT NULL AND category = ?
         ORDER BY published_at DESC LIMIT ${limit}`,
        [categoryId]
      )
    } else {
      news = await query(
        `SELECT * FROM news 
         WHERE published_at IS NOT NULL
         ORDER BY published_at DESC LIMIT ${limit}`
      )
    }

    return NextResponse.json({ news })
  } catch (error) {
    console.error("[DB] Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json()
    const { title_en, title_ar, title_tr, slug, excerpt_en, content_en, featured_image, category_id, is_published, is_featured } = body

    const result = await execute(
      `INSERT INTO news (title_en, title_ar, title_tr, slug, excerpt_en, content_en, featured_image, category_id, is_published, is_featured, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title_en, title_ar || null, title_tr || null, slug, excerpt_en || null, content_en, featured_image || null, category_id || null, is_published ? 1 : 0, is_featured ? 1 : 0, is_published ? new Date() : null]
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
