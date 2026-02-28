"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaign()
  }, [params.id])

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`/api/campaigns/${params.id}`)
      const data = await res.json()
      setCampaign(data.campaign)
    } catch (error) {
      console.error("[v0] Error fetching campaign:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">{language === "tr" ? "Yükleniyor..." : "Loading..."}</div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-muted-foreground">{language === "tr" ? "Kampanya bulunamadı" : "Campaign not found"}</div>
        <Button onClick={() => router.push("/")}>{language === "tr" ? "Ana Sayfaya Dön" : "Go Home"}</Button>
      </div>
    )
  }

  const percentage = campaign.goal_amount > 0 ? (campaign.raised_amount / campaign.goal_amount) * 100 : 0

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === "tr" ? "Geri" : "Back"}
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <img
              src={campaign.image_url || "/placeholder.svg"}
              alt={language === "en" ? campaign.title_en : campaign.title_tr}
              className="w-full h-96 object-cover rounded-lg"
            />

            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {language === "en" ? campaign.title_en : campaign.title_tr}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {language === "en" ? campaign.short_description_en : campaign.short_description_tr}
              </p>
              <div className="prose max-w-none">
                <p className="text-foreground leading-relaxed">
                  {language === "en" ? campaign.description_en : campaign.description_tr}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${campaign.raised_amount?.toLocaleString() || 0}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {language === "tr" ? "Hedef" : "Goal"}: ${campaign.goal_amount?.toLocaleString() || 0}
                  </div>
                  <Progress value={percentage} className="h-3 mb-2" />
                  <div className="text-sm text-accent font-semibold">
                    {percentage.toFixed(1)}% {language === "tr" ? "tamamlandı" : "complete"}
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() =>
                    router.push(
                      `/donate?campaign=${encodeURIComponent(language === "en" ? campaign.title_en : campaign.title_tr)}`,
                    )
                  }
                >
                  <Heart className="h-5 w-5 mr-2" />
                  {language === "tr" ? "Bağış Yap" : "Donate Now"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: language === "en" ? campaign.title_en : campaign.title_tr,
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  {language === "tr" ? "Paylaş" : "Share"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
