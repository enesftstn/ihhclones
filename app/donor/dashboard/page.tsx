import { Suspense } from "react"
import { DonorDashboard } from "@/components/donor-dashboard"
import { LiveChatWidget } from "@/components/live-chat-widget"

export default function DonorDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <DonorDashboard />
        </Suspense>
      </div>
      <LiveChatWidget />
    </div>
  )
}
