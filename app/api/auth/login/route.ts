import { NextResponse } from "next/server"
import { authenticateUser, createSession } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`login:${identifier}`, 5, 15 * 60 * 1000) // 5 attempts per 15 minutes

    if (!allowed) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 })
    }

    const body = await request.json()

    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", details: validation.error.errors }, { status: 400 })
    }

    const { email, password } = validation.data

    // Authenticate user
    const user = await authenticateUser(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create session
    await createSession(user.userId, user.email, user.role)

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
