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
        const category = searchParams.get("category")

        let news
        if (category) {
            news = await query(
                `SELECT * FROM news 
                 WHERE category = ?
                 ORDER BY published_at DESC, created_at DESC LIMIT ${limit}`,
                [category]
            )
        } else {
            news = await query(
                `SELECT * FROM news 
                 ORDER BY published_at DESC, created_at DESC LIMIT ${limit}`,
                []
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
        const { titleEn, titleTr, contentEn, contentTr, excerptEn, excerptTr, imageUrl, category, author } = body

        if (!titleEn || !titleTr) {
            return NextResponse.json({ error: "Title is required in both languages" }, { status: 400 })
        }

        const result = await execute(
            `INSERT INTO news (title_en, title_tr, content_en, content_tr, excerpt_en, excerpt_tr, image_url, category, author, published_at, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [titleEn, titleTr, contentEn || null, contentTr || null, excerptEn || null, excerptTr || null, imageUrl || null, category || null, author || null]
        )

        return NextResponse.json({ success: true, id: (result as any).insertId })
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.error("[DB] Error creating news:", error)
        return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "News ID is required" }, { status: 400 })
        }

        await execute("DELETE FROM news WHERE id = ?", [parseInt(id)])

        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.error("[DB] Error deleting news:", error)
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
    }
}
