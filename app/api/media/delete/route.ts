import { del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { execute, queryOne } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Media ID required" }, { status: 400 })
    }

    const media = await queryOne<any>("SELECT * FROM media WHERE id = ?", [id])

    if (media && media.file_path) {
      try {
        await del(media.file_path)
      } catch (blobError) {
        console.error("[v0] Blob delete error (continuing):", blobError)
      }
    }

    await execute("DELETE FROM media WHERE id = ?", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[v0] Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
