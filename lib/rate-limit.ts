interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export async function rateLimit(identifier: string, limit = 10, windowMs = 60000): Promise<boolean> {
  const now = Date.now()
  const key = identifier

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return true
  }

  if (store[key].count >= limit) {
    return false
  }

  store[key].count++
  return true
}

export function getRateLimitIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : "unknown"
  return ip
}
