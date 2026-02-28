"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Droplet, Heart, Home, School, Stethoscope, Wheat } from "lucide-react"

export default function ProjectsPage() {
  const { language } = useLanguage()

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
        projects: [
          {
            title: "Gaza Emergency Relief",
            location: "Palestine",
            desc: "Providing urgent medical supplies, food, and shelter to families affected by ongoing conflict.",
            raised: 485000,
            goal: 750000,
            category: "Emergency Response",
          },
          {
            title: "Yemen Water Crisis",
            location: "Yemen",
            desc: "Building 50 water wells to provide clean drinking water to rural communities.",
            raised: 320000,
            goal: 500000,
            category: "Water & Sanitation",
          },
          {
            title: "Syrian Refugee Education",
            location: "Turkey",
            desc: "Supporting education for 2,000 Syrian refugee children with schools and supplies.",
            raised: 180000,
            goal: 250000,
            category: "Education",
          },
          {
            title: "Somalia Healthcare Clinics",
            location: "Somalia",
            desc: "Operating mobile clinics providing free healthcare to underserved communities.",
            raised: 95000,
            goal: 150000,
            category: "Healthcare",
          },
          {
            title: "Bangladesh Food Program",
            location: "Bangladesh",
            desc: "Monthly food packages for 5,000 families living in extreme poverty.",
            raised: 210000,
            goal: 300000,
            category: "Food Security",
          },
          {
            title: "Afghanistan Winter Relief",
            location: "Afghanistan",
            desc: "Warm clothing, blankets, and heating fuel for families facing harsh winter.",
            raised: 145000,
            goal: 200000,
            category: "Emergency Response",
          },
        ],
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
        projects: [
          {
            title: "Gazze Acil Yardım",
            location: "Filistin",
            desc: "Devam eden çatışmalardan etkilenen ailelere acil tıbbi malzeme, gıda ve barınma sağlıyoruz.",
            raised: 485000,
            goal: 750000,
            category: "Acil Müdahale",
          },
          {
            title: "Yemen Su Krizi",
            location: "Yemen",
            desc: "Kırsal topluluklara temiz içme suyu sağlamak için 50 su kuyusu inşa ediyoruz.",
            raised: 320000,
            goal: 500000,
            category: "Su ve Sanitasyon",
          },
          {
            title: "Suriyeli Mülteci Eğitimi",
            location: "Türkiye",
            desc: "2.000 Suriyeli mülteci çocuğun eğitimini okul ve malzemelerle destekliyoruz.",
            raised: 180000,
            goal: 250000,
            category: "Eğitim",
          },
          {
            title: "Somali Sağlık Klinikleri",
            location: "Somali",
            desc: "Yetersiz hizmet alan topluluklara ücretsiz sağlık hizmeti sunan mobil klinikler işletiyoruz.",
            raised: 95000,
            goal: 150000,
            category: "Sağlık",
          },
          {
            title: "Bangladeş Gıda Programı",
            location: "Bangladeş",
            desc: "Aşırı yoksulluk içinde yaşayan 5.000 aileye aylık gıda paketleri.",
            raised: 210000,
            goal: 300000,
            category: "Gıda Güvenliği",
          },
          {
            title: "Afganistan Kış Yardımı",
            location: "Afganistan",
            desc: "Sert kışla karşı karşıya kalan aileler için sıcak giysi, battaniye ve ısınma yakıtı.",
            raised: 145000,
            goal: 200000,
            category: "Acil Müdahale",
          },
        ],
      },
    },
  }

  const t = content[language]

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

      {/* Active Projects */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.active.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.active.projects.map((project, idx) => {
              const percentage = (project.raised / project.goal) * 100
              return (
                <div key={idx} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-accent/30 to-primary/30" />
                  <div className="p-6">
                    <div className="text-xs text-accent font-medium mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{project.location}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>

                    <div className="mb-4">
                      <Progress value={percentage} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${project.raised.toLocaleString()} {t.active.raised}
                        </span>
                        <span className="font-medium text-foreground">${project.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent/90">{t.active.donate}</Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
