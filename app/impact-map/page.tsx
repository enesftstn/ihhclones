import { InteractiveMap } from "@/components/interactive-map"
import { LiveChatWidget } from "@/components/live-chat-widget"

export default function ImpactMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <InteractiveMap />
      </div>
      <LiveChatWidget />
    </div>
  )
}
