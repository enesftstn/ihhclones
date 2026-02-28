"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Droplet, Home, Users, HandHeart, Baby, UtensilsCrossed } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

interface Campaign {
  id: number
  title_en: string
  title_tr: string
  description_en: string
  description_tr: string
  short_description_en: string
  short_description_tr: string
  image_url: string
  goal_amount: number
  raised_amount: number
  is_featured: boolean
  is_urgent: boolean
}

// Icon mapping helper
const iconMap: { [key: string]: any } = {
  Heart,
  Eye,
  Droplet,
  Home,
  Users,
  HandHeart,
  Baby,
  UtensilsCrossed,
}

export function CampaignGrid() {
  const { t, language } = useLanguage()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns?featured=true")
      const data = await res.json()
      setCampaigns(data.campaigns || [])
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">Loading campaigns...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {campaigns.map((campaign, index) => {
            // Default to Heart icon if not mapped
            const Icon = Heart
            return (
              <Card key={campaign.id} className="group overflow-hidden transition-all hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image_url || "/placeholder.svg"}
                    alt={language === "en" ? campaign.title_en : campaign.title_tr}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {campaign.is_urgent && (
                    <div className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                      {language === "en" ? "URGENT" : "ACİL"}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-2xl font-bold text-foreground">
                    {language === "en" ? campaign.title_en : campaign.title_tr}
                  </h3>
                  <p className="mb-3 text-sm font-semibold text-accent">
                    {language === "en" ? campaign.short_description_en : campaign.short_description_tr}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {language === "en" ? campaign.description_en : campaign.description_tr}
                  </p>
                  {campaign.goal_amount > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>
                          ${campaign.raised_amount.toLocaleString()} {language === "en" ? "raised" : "toplandı"}
                        </span>
                        <span>
                          {language === "en" ? "Goal" : "Hedef"}: ${campaign.goal_amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => router.push(`/campaigns/${campaign.id}`)}
                    >
                      {language === "en" ? "Learn More" : "Daha Fazla"}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() =>
                        router.push(
                          `/donate?campaign=${encodeURIComponent(language === "en" ? campaign.title_en : campaign.title_tr)}`,
                        )
                      }
                    >
                      {t("nav.donate")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
