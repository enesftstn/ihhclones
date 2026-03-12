"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Droplet, Heart, Home, School, Stethoscope, Wheat, Loader2 } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Campaign {
  id: number
  title_en: string
  title_tr: string
  description_en: string
  description_tr: string
  target_amount: string
  current_amount: string
  image_url: string
  category: string
  is_active: boolean
}

export default function ProjectsPage() {
  const { language } = useLanguage()
  const { data, error, isLoading } = useSWR<{ campaigns: Campaign[] }>('/api/campaigns', fetcher)

  const content = {
    en: {
      title: "Our Projects",
      subtitle: "Making a difference through targeted humanitarian initiatives",
      categories: {
        title: "Project Categories",
        items: [
          {
            icon: Droplet,
            title: "Water & Sanitation",
            count: "45 Projects",
            desc: "Building wells and water systems",
          },
          {
            icon: Heart,
            title: "Healthcare",
            count: "38 Projects",
            desc: "Medical clinics and treatments",
          },
          {
            icon: School,
            title: "Education",
            count: "52 Projects",
            desc: "Schools and learning programs",
          },
          {
            icon: Home,
            title: "Shelter",
            count: "29 Projects",
            desc: "Housing and emergency relief",
          },
          {
            icon: Wheat,
            title: "Food Security",
            count: "61 Projects",
            desc: "Food aid and agriculture",
          },
          {
            icon: Stethoscope,
            title: "Emergency Response",
            count: "34 Projects",
            desc: "Crisis intervention teams",
          },
        ],
      },
      active: {
        title: "Active Projects",
        donate: "Donate Now",
        raised: "raised of",
        noCampaigns: "No active campaigns at the moment.",
        loading: "Loading campaigns...",
        error: "Failed to load campaigns.",
      },
    },
    tr: {
      title: "Projelerimiz",
      subtitle: "Hedefli insani yardım girişimleriyle fark yaratıyoruz",
      categories: {
        title: "Proje Kategorileri",
        items: [
          {
            icon: Droplet,
            title: "Su ve Sanitasyon",
            count: "45 Proje",
            desc: "Kuyu ve su sistemleri inşası",
          },
          {
            icon: Heart,
            title: "Sağlık",
            count: "38 Proje",
            desc: "Tıbbi klinikler ve tedaviler",
          },
          {
            icon: School,
            title: "Eğitim",
            count: "52 Proje",
            desc: "Okullar ve öğrenme programları",
          },
          {
            icon: Home,
            title: "Barınma",
            count: "29 Proje",
            desc: "Konut ve acil yardım",
          },
          {
            icon: Wheat,
            title: "Gıda Güvenliği",
            count: "61 Proje",
            desc: "Gıda yardımı ve tarım",
          },
          {
            icon: Stethoscope,
            title: "Acil Müdahale",
            count: "34 Proje",
            desc: "Kriz müdahale ekipleri",
          },
        ],
      },
      active: {
        title: "Aktif Projeler",
        donate: "Şimdi Bağış Yap",
        raised: "toplanan",
        noCampaigns: "Şu anda aktif kampanya bulunmamaktadır.",
        loading: "Kampanyalar yükleniyor...",
        error: "Kampanyalar yüklenemedi.",
      },
    },
  }

  const t = content[language]
  const campaigns = data?.campaigns || []

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.categories.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.categories.items.map((category, idx) => {
            const Icon = category.icon
            return (
              <div key={idx} className="bg-card p-6 rounded-lg border hover:border-accent transition-colors">
                <Icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-sm text-accent font-medium mb-2">{category.count}</p>
                <p className="text-sm text-muted-foreground">{category.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Projects from Database */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.active.title}</h2>
          
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">{t.active.loading}</span>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">{t.active.error}</p>
            </div>
          )}

          {!isLoading && !error && campaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.active.noCampaigns}</p>
            </div>
          )}

          {!isLoading && !error && campaigns.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {campaigns.map((campaign) => {
                const targetAmount = parseFloat(campaign.target_amount || "0")
                const currentAmount = parseFloat(campaign.current_amount || "0")
                const percentage = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0
                const title = language === "tr" ? campaign.title_tr : campaign.title_en
                const description = language === "tr" ? campaign.description_tr : campaign.description_en

                return (
                  <div key={campaign.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                    {campaign.image_url ? (
                      <img 
                        src={campaign.image_url} 
                        alt={title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-accent/30 to-primary/30" />
                    )}
                    <div className="p-6">
                      {campaign.category && (
                        <div className="text-xs text-accent font-medium mb-2 uppercase">{campaign.category}</div>
                      )}
                      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{description}</p>

                      <div className="mb-4">
                        <Progress value={Math.min(percentage, 100)} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            ${currentAmount.toLocaleString()} {t.active.raised}
                          </span>
                          <span className="font-medium text-foreground">${targetAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      <Link href={`/donate?campaign=${campaign.id}`}>
                        <Button className="w-full bg-accent hover:bg-accent/90">{t.active.donate}</Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
