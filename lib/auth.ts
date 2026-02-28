import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { query, queryOne } from "@/lib/db"
import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface SessionData {
  userId: number
  email: string
  role: string
  isAuthenticated: boolean
}

export async function createSession(userId: number, email: string, role: string) {
  const token = await new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return token
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as unknown as SessionData
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await getSession()

  if (!session || (session.role !== "admin" && session.role !== "editor")) {
    throw new Error("Unauthorized")
  }

  return session
}

export async function authenticateUser(email: string, password: string): Promise<SessionData | null> {
  try {
    const user = await queryOne<any>(
      "SELECT * FROM users WHERE email = ? AND is_active = 1 LIMIT 1",
      [email]
    )

    if (!user) return null

    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) return null

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      isAuthenticated: true,
    }
  } catch (error) {
    console.error("[v0] Authentication error:", error)
    return null
  }
}

export async function verifyAuth(request: NextRequest): Promise<{ authenticated: boolean; session?: SessionData }> {
  try {
    const token = request.cookies.get("session")?.value

    if (!token) {
      return { authenticated: false }
    }

    const verified = await jwtVerify(token, JWT_SECRET)
    const session = verified.payload as unknown as SessionData

    return { authenticated: true, session }
  } catch (error) {
    console.error("[v0] Auth verification error:", error)
    return { authenticated: false }
  }
}
