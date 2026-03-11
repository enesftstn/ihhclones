import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { execute } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const formData = await request.formData()
    const file = formData.get("file") as File
    const altText = formData.get("altText") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed" }, { status: 400 })
    }

    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")

    const blob = await put(sanitizedFilename, file, {
      access: "public",
    })

    const result = await execute(
      "INSERT INTO media (filename, original_name, file_path, file_type, file_size, mime_type, alt_text) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [sanitizedFilename, file.name, blob.url, file.type.split('/')[0], file.size, file.type, altText || null]
    )

    return NextResponse.json({
      success: true,
      id: result.insertId,
      url: blob.url,
    })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
