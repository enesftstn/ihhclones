import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`projects:${identifier}`, 100, 60000)

    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const featured = searchParams.get("featured")

    let projects
    if (country) {
      projects = await query(
        "SELECT p.*, c.name as category_name FROM projects p LEFT JOIN categories c ON p.category_id = c.id WHERE p.status = 'active' AND p.country = ? ORDER BY p.created_at DESC",
        [country]
      )
    } else if (featured === "true") {
      projects = await query(
        "SELECT p.*, c.name as category_name FROM projects p LEFT JOIN categories c ON p.category_id = c.id WHERE p.status = 'active' AND p.is_featured = 1 ORDER BY p.created_at DESC"
      )
    } else {
      projects = await query(
        "SELECT p.*, c.name as category_name FROM projects p LEFT JOIN categories c ON p.category_id = c.id WHERE p.status = 'active' ORDER BY p.created_at DESC"
      )
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
