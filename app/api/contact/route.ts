import { NextResponse } from "next/server"
import { execute } from "@/lib/db"
import { contactSchema } from "@/lib/validation"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`contact:${identifier}`, 3, 60 * 60 * 1000)

    if (!allowed) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 })
    }

    const body = await request.json()

    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", details: validation.error.errors }, { status: 400 })
    }

    const { name, email, phone, subject, message } = validation.data

    const result = await execute(
      "INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone || null, subject || null, message]
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error) {
    console.error("[v0] Error creating contact submission:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
