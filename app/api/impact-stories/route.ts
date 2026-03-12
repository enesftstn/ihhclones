import { NextResponse } from "next/server"
import { query, execute } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function GET(request: Request) {
    try {
        const identifier = getRateLimitIdentifier(request)
        const allowed = await rateLimit(`stories:${identifier}`, 100, 60000)
        if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

        const { searchParams } = new URL(request.url)
        const featured = searchParams.get("featured")
        const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 100)

        let stories
        if (featured === "true") {
            stories = await query(
                `SELECT * FROM impact_stories WHERE created_at IS NOT NULL ORDER BY created_at DESC LIMIT 4`
            )
        } else {
            stories = await query(
                `SELECT * FROM impact_stories ORDER BY created_at DESC LIMIT ?`,
                [limit]
            )
        }

        return NextResponse.json({ stories })
    } catch (error) {
        console.error("[DB] Error fetching stories:", error)
        return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        await requireAdmin()
        const body = await request.json()
        const { nameEn, nameTr, storyEn, storyTr, locationEn, locationTr, imageUrl, year } = body

        if (!nameEn || !nameTr) {
            return NextResponse.json({ error: "Name is required in both languages" }, { status: 400 })
        }

        const result = await execute(
            `INSERT INTO impact_stories (name_en, name_tr, story_en, story_tr, location_en, location_tr, image_url, year, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [nameEn, nameTr, storyEn || null, storyTr || null, locationEn || null, locationTr || null, imageUrl || null, year || new Date().getFullYear()]
        )

        return NextResponse.json({ success: true, id: (result as any).insertId })
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.error("[DB] Error creating story:", error)
        return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Story ID is required" }, { status: 400 })
        }

        await execute("DELETE FROM impact_stories WHERE id = ?", [parseInt(id)])

        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.error("[DB] Error deleting story:", error)
        return NextResponse.json({ error: "Failed to delete story" }, { status: 500 })
    }
}
