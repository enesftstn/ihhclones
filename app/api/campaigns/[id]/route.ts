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
      campaigns = await query("SELECT * FROM campaigns WHERE id = ? AND is_active = 1", [numId])
    } else {
      campaigns = await query("SELECT * FROM campaigns WHERE slug = ? AND is_active = 1", [id])
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
    const { title, slug, subtitle, description, image_url, cta_label, cta_link, goal_amount, is_featured, is_active, sort_order } = body

    await execute(
      `UPDATE campaigns SET title=?, slug=?, subtitle=?, description=?, image_url=?, cta_label=?, cta_link=?, goal_amount=?, is_featured=?, is_active=?, sort_order=?, updated_at=NOW()
       WHERE id=?`,
      [title, slug, subtitle || null, description || null, image_url || null, cta_label || 'Donate', cta_link || null, goal_amount || 0, is_featured ? 1 : 0, is_active !== false ? 1 : 0, sort_order || 0, Number(id)]
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
