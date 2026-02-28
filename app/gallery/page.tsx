import { MediaGallery } from "@/components/media-gallery"
import { LiveChatWidget } from "@/components/live-chat-widget"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <MediaGallery />
      </div>
      <LiveChatWidget />
    </div>
  )
}
