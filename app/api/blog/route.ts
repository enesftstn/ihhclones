import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import { z } from "zod"

const blogSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(500),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  image_url: z.string().optional(),
  category_id: z.number().optional(),
  is_published: z.boolean().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 100)

    if (slug) {
      const posts = await query(
        "SELECT n.*, c.name as category_name, u.full_name as author_name FROM news n LEFT JOIN categories c ON n.category_id = c.id LEFT JOIN users u ON n.author_id = u.id WHERE n.slug = ? AND n.is_published = 1",
        [slug]
      )

      if (posts.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      await execute("UPDATE news SET view_count = view_count + 1 WHERE slug = ?", [slug])

      return NextResponse.json(posts[0])
    }

    const posts = await query(
      "SELECT n.*, c.name as category_name, u.full_name as author_name FROM news n LEFT JOIN categories c ON n.category_id = c.id LEFT JOIN users u ON n.author_id = u.id WHERE n.is_published = 1 ORDER BY n.published_at DESC LIMIT ?",
      [limit]
    )

    return NextResponse.json(posts)
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validation = blogSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", details: validation.error.errors }, { status: 400 })
    }

    const data = validation.data

    const result = await execute(
      `INSERT INTO news (title, slug, excerpt, content, image_url, category_id, is_published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.title, data.slug, data.excerpt || null, data.content, data.image_url || null, data.category_id || null, data.is_published ? 1 : 0, data.is_published ? new Date() : null]
    )

    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
