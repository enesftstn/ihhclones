import { Suspense } from "react"
import { BlogList } from "@/components/blog-list"
import { LiveChatWidget } from "@/components/live-chat-widget"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <BlogList />
        </Suspense>
      </div>
      <LiveChatWidget />
    </div>
  )
}
