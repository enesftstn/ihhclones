import { NextResponse } from "next/server"
import { execute } from "@/lib/db"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`contact:${identifier}`, 3, 3600000)
    if (!allowed) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 })

    const body = await request.json()
    const { full_name, email, phone, subject, message } = body

    if (!full_name || !email || !message)
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })

    await execute(
      "INSERT INTO contact_submissions (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, phone || null, subject || null, message]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DB] Error saving contact submission:", error)
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
  }
}