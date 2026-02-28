import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

// Note: events table doesn't exist in user's MySQL schema,
// so we return static data for now. Admin can add an events table later.
const staticEvents = [
  {
    id: 1,
    title_en: "Ramadan Fundraising Gala",
    title_tr: "Ramazan Yardim Galasi",
    description_en: "Join us for our annual Ramadan fundraising gala dinner.",
    description_tr: "Yillik Ramazan yardim gala yemegimize katilmak icin bize katilin.",
    event_date: "2026-03-15",
    event_time: "18:00",
    location: "Istanbul Convention Center",
    event_type: "fundraiser",
    image_url: "/event-gala.jpg",
    status: "upcoming",
    is_featured: true,
  },
  {
    id: 2,
    title_en: "Humanitarian Aid Webinar",
    title_tr: "Insani Yardim Webinari",
    description_en: "Learn about our ongoing humanitarian aid efforts worldwide.",
    description_tr: "Dunya genelindeki insani yardim calismalarimiz hakkinda bilgi edinin.",
    event_date: "2026-03-20",
    event_time: "14:00",
    location: "Online",
    event_type: "webinar",
    image_url: "/event-webinar.jpg",
    status: "upcoming",
    is_featured: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(staticEvents)
  } catch (error) {
    console.error("[v0] Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
