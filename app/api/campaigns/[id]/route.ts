import { NextResponse } from "next/server"
import { query, execute } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`campaign-detail:${identifier}`, 100, 60000)
    if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

    const { id } = await params
    const numId = Number.parseInt(id)
    let campaigns

    if (!isNaN(numId)) {
      campaigns = await query("SELECT * FROM campaigns WHERE id = ? AND status = 'active'", [numId])
    } else {
      campaigns = await query("SELECT * FROM campaigns WHERE slug = ? AND status = 'active'", [id])
    }

    if (campaigns.length === 0)
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })

    return NextResponse.json({ campaign: campaigns[0] })
  } catch (error) {
    console.error("[DB] Error fetching campaign:", error)
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params
    const body = await request.json()
    const { title_en, title_ar, title_tr, slug, description_en, short_description_en, featured_image, goal_amount, is_featured, is_urgent, status } = body

    await execute(
      `UPDATE campaigns SET title_en=?, title_ar=?, title_tr=?, slug=?, description_en=?, short_description_en=?, featured_image=?, goal_amount=?, is_featured=?, is_urgent=?, status=?, updated_at=NOW()
       WHERE id=?`,
      [title_en, title_ar || null, title_tr || null, slug, description_en || null, short_description_en || null, featured_image || null, goal_amount || 0, is_featured ? 1 : 0, is_urgent ? 1 : 0, status || 'draft', Number(id)]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error updating campaign:", error)
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const { id } = await params
    await execute("DELETE FROM campaigns WHERE id = ?", [Number(id)])
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    console.error("[DB] Error deleting campaign:", error)
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 })
  }
}
