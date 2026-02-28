"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import { format } from "date-fns"

interface Event {
  id: number
  title_en: string
  title_tr: string
  description_en: string
  description_tr: string
  event_date: string
  event_time: string
  location: string
  event_type: string
  image_url: string
  registration_url: string
  capacity: number
  registered_count: number
  is_featured: boolean
}

export function EventCalendar() {
  const { language } = useLanguage()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events?status=upcoming")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("[v0] Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = filter === "all" ? events : events.filter((e) => e.event_type === filter)

  const getEventTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; tr: string }> = {
      webinar: { en: "Webinar", tr: "Webinar" },
      field_visit: { en: "Field Visit", tr: "Saha Ziyareti" },
      fundraiser: { en: "Fundraiser", tr: "Bağış Etkinliği" },
      volunteer_day: { en: "Volunteer Day", tr: "Gönüllü Günü" },
    }
    return language === "tr" ? labels[type]?.tr : labels[type]?.en
  }

  if (loading) {
    return <div className="text-center py-8">{language === "tr" ? "Yükleniyor..." : "Loading..."}</div>
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{language === "tr" ? "Yaklaşan Etkinlikler" : "Upcoming Events"}</h2>
        <p className="text-muted-foreground">
          {language === "tr" ? "Bizimle birlikte etkinliklere katılın" : "Join us for upcoming events and activities"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          {language === "tr" ? "Tümü" : "All"}
        </Button>
        <Button variant={filter === "webinar" ? "default" : "outline"} onClick={() => setFilter("webinar")}>
          {language === "tr" ? "Webinarlar" : "Webinars"}
        </Button>
        <Button variant={filter === "fundraiser" ? "default" : "outline"} onClick={() => setFilter("fundraiser")}>
          {language === "tr" ? "Bağış Etkinlikleri" : "Fundraisers"}
        </Button>
        <Button variant={filter === "field_visit" ? "default" : "outline"} onClick={() => setFilter("field_visit")}>
          {language === "tr" ? "Saha Ziyaretleri" : "Field Visits"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {event.image_url && (
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={event.image_url || "/placeholder.svg"}
                  alt={language === "tr" ? event.title_tr : event.title_en}
                  className="w-full h-full object-cover"
                />
                {event.is_featured && (
                  <Badge className="absolute top-2 right-2">{language === "tr" ? "Öne Çıkan" : "Featured"}</Badge>
                )}
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline">{getEventTypeLabel(event.event_type)}</Badge>
              </div>
              <CardTitle className="text-xl">{language === "tr" ? event.title_tr : event.title_en}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {language === "tr" ? event.description_tr : event.description_en}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.event_date), "MMMM dd, yyyy")}</span>
                </div>

                {event.event_time && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.event_time}</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}

                {event.capacity && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.registered_count}/{event.capacity} {language === "tr" ? "kayıtlı" : "registered"}
                    </span>
                  </div>
                )}
              </div>

              {event.registration_url && (
                <Button className="w-full" asChild>
                  <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                    {language === "tr" ? "Kayıt Ol" : "Register"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {language === "tr" ? "Yaklaşan etkinlik bulunamadı" : "No upcoming events found"}
        </div>
      )}
    </div>
  )
}
