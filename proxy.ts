import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("session")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const verified = await jwtVerify(token, JWT_SECRET)
      const session = verified.payload as { role?: string }

      if (session.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()

  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
  )

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
