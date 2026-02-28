export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - removes script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/on\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "")
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  }
  return text.replace(/[&<>"'/]/g, (char) => map[char])
}

export function sanitizeInput(input: string): string {
  // Remove potential SQL injection patterns
  return input.replace(/['";]/g, "").replace(/--/g, "").replace(/\/\*/g, "").replace(/\*\//g, "").trim()
}
