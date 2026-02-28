import { EventCalendar } from "@/components/event-calendar"
import { LiveChatWidget } from "@/components/live-chat-widget"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <EventCalendar />
      </div>
      <LiveChatWidget />
    </div>
  )
}
