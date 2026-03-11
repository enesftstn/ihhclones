import { NextResponse } from "next/server"
import { queryOne, execute } from "@/lib/db"
import { SignJWT } from "jose"
import bcrypt from "bcryptjs"
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_123")

export async function POST(request: Request) {
    try {
        const identifier = getRateLimitIdentifier(request)
        const allowed = await rateLimit(`login:${identifier}`, 5, 900000)
        if (!allowed) return NextResponse.json({ error: "Too many login attempts" }, { status: 429 })

        const body = await request.json()
        const { email, password } = body

        if (!email || !password)
            return NextResponse.json({ error: "Email and password required" }, { status: 400 })

        // Tablo adýný admin_users olarak güncelledik
        const user = await queryOne<any>(
            "SELECT * FROM admin_users WHERE email = ? AND is_active = 1",
            [email]
        )

        if (!user || !(await bcrypt.compare(password, user.password_hash)))
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

        // updated_at sütununu güncelle
        await execute("UPDATE admin_users SET updated_at = NOW() WHERE id = ?", [user.id])

        const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET)

        const response = NextResponse.json({
            success: true,
            user: { email: user.email, name: user.full_name, role: user.role }
        })

        response.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })

        return response
    } catch (error) {
        console.error("[LOGIN] error:", error)
        return NextResponse.json({ error: "Login failed" }, { status: 500 })
    }
}