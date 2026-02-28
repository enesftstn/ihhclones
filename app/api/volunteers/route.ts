import { NextResponse } from "next/server"
import { execute } from "@/lib/db"
import { volunteerSchema } from "@/lib/validation"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const identifier = getRateLimitIdentifier(request)
    const allowed = await rateLimit(`volunteer:${identifier}`, 2, 60 * 60 * 1000)

    if (!allowed) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 })
    }

    const body = await request.json()

    const mappedBody = {
      name: body.fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      city: body.city,
      skills: body.skills,
      availability: body.availability,
      experience: body.message,
    }

    const validation = volunteerSchema.safeParse(mappedBody)
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", details: validation.error.errors }, { status: 400 })
    }

    const { name, email, phone, country, city, skills, availability, experience } = validation.data

    // Note: volunteers table doesn't exist in the user's schema, so we store in contact_messages with a subject
    await execute(
      "INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone || null, "Volunteer Application", `Country: ${country || ""}, City: ${city || ""}, Skills: ${skills || ""}, Availability: ${availability || ""}, Experience: ${experience || ""}`]
    )

    return NextResponse.json({ success: true, message: "Volunteer application submitted" })
  } catch (error) {
    console.error("[v0] Error creating volunteer:", error)
    return NextResponse.json({ error: "Failed to submit volunteer application" }, { status: 500 })
  }
}
