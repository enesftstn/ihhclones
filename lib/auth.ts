import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "cok_gizli_ve_uzun_bir_key_123")

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  if (!token) return null

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { userId: number; email: string; role: string }
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized")
  }
  return session
}

export async function verifyAuth(request: Request): Promise<{ authenticated: boolean; user?: { userId: number; email: string; role: string } }> {
  // Try to get session from cookies first
  const session = await getSession()
  if (session) {
    return { authenticated: true, user: session }
  }

  // Try to get token from Authorization header
  const authHeader = request.headers.get("Authorization")
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7)
    try {
      const verified = await jwtVerify(token, JWT_SECRET)
      return { authenticated: true, user: verified.payload as { userId: number; email: string; role: string } }
    } catch {
      return { authenticated: false }
    }
  }

  return { authenticated: false }
}
