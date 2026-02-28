import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`campaign-detail:${identifier}`, 100, 60000)

    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const { id } = await params

    // Try by id or slug
    let campaigns
    const numId = Number.parseInt(id)
    if (!isNaN(numId)) {
      campaigns = await query("SELECT * FROM campaigns WHERE id = ? AND is_active = 1", [numId])
    } else {
      campaigns = await query("SELECT * FROM campaigns WHERE slug = ? AND is_active = 1", [id])
    }

    if (campaigns.length === 0) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({ campaign: campaigns[0] })
  } catch (error) {
    console.error("[v0] Error fetching campaign:", error)
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
  }
}
