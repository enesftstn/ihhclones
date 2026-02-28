import { NextResponse } from "next/server"
import { query, execute } from "@/lib/db"
import { newsletterSchema } from "@/lib/validation"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`newsletter:${identifier}`, 5, 60 * 60 * 1000)

    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()

    const validation = newsletterSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid email address", details: validation.error.errors }, { status: 400 })
    }

    const { email } = validation.data

    const existing = await query("SELECT id FROM newsletter_subscribers WHERE email = ?", [email])

    if (existing.length > 0) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 })
    }

    await execute(
      "INSERT INTO newsletter_subscribers (email) VALUES (?)",
      [email]
    )

    return NextResponse.json({ success: true, message: "Successfully subscribed" })
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
