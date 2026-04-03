"use client"

import { useLanguage } from "@/contexts/language-context"
import { MapPin } from "lucide-react"

export default function WhereWeWorkPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Where We Work",
      subtitle: "Our humanitarian work spans across 50+ countries worldwide",
      regions: [
        {
          name: "Middle East",
          countries: ["Palestine", "Syria", "Yemen", "Iraq", "Lebanon", "Jordan", "Afghanistan"],
          projects: 145,
          beneficiaries: "850K+",
        },
        {
          name: "Africa",
          countries: ["Somalia", "Sudan", "Kenya", "Ethiopia", "Niger", "Chad", "Mali", "Nigeria"],
          projects: 127,
          beneficiaries: "620K+",
        },
        {
          name: "Asia",
          countries: ["Bangladesh", "Myanmar", "Pakistan", "Indonesia", "Philippines"],
          projects: 98,
          beneficiaries: "450K+",
        },
        {
          name: "Europe",
          countries: ["Turkey", "Bosnia", "Albania", "Kosovo"],
          projects: 45,
          beneficiaries: "180K+",
        },
      ],
      stats: {
        countries: "50+",
        countriesLabel: "Countries",
        beneficiaries: "2M+",
        beneficiariesLabel: "People Helped",
        projects: "415",
        projectsLabel: "Active Projects",
        volunteers: "500+",
        volunteersLabel: "Field Workers",
      },
    },
    tr: {
      title: "Çalışma Alanlarımız",
      subtitle: "İnsani yardım çalışmalarımız dünya çapında 50'den fazla ülkeye yayılıyor",
      regions: [
        {
          name: "Orta Doğu",
          countries: ["Filistin", "Suriye", "Yemen", "Irak", "Lübnan", "Ürdün", "Afganistan"],
          projects: 145,
          beneficiaries: "850K+",
        },
        {
          name: "Afrika",
          countries: ["Somali", "Sudan", "Kenya", "Etiyopya", "Nijer", "Çad", "Mali", "Nijerya"],
          projects: 127,
          beneficiaries: "620K+",
        },
        {
          name: "Asya",
          countries: ["Bangladeş", "Myanmar", "Pakistan", "Endonezya", "Filipinler"],
          projects: 98,
          beneficiaries: "450K+",
        },
        {
          name: "Avrupa",
          countries: ["Türkiye", "Bosna", "Arnavutluk", "Kosova"],
          projects: 45,
          beneficiaries: "180K+",
        },
      ],
      stats: {
        countries: "50+",
        countriesLabel: "Ülke",
        beneficiaries: "2M+",
        beneficiariesLabel: "Yardım Edilen Kişi",
        projects: "415",
        projectsLabel: "Aktif Proje",
        volunteers: "500+",
        volunteersLabel: "Saha Çalışanı",
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

      {/* Stats */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold text-accent mb-2">{t.stats.countries}</div>
            <div className="text-muted-foreground">{t.stats.countriesLabel}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-accent mb-2">{t.stats.beneficiaries}</div>
            <div className="text-muted-foreground">{t.stats.beneficiariesLabel}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-accent mb-2">{t.stats.projects}</div>
            <div className="text-muted-foreground">{t.stats.projectsLabel}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-accent mb-2">{t.stats.volunteers}</div>
            <div className="text-muted-foreground">{t.stats.volunteersLabel}</div>
          </div>
        </div>
      </div>

      {/* Work in Action */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          {language === "en" ? "Our Work in Action" : "Calismalarimizdan Kareler"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <img
            src="/ahde-vefa-somalia-distribution.png"
            alt="Food distribution in Somalia"
            className="rounded-lg object-cover w-full h-48 col-span-2"
          />
          <img
            src="/ahde-vefa-cataract-surgery.png"
            alt="Cataract surgery program"
            className="rounded-lg object-cover w-full h-48"
          />
          <img
            src="/ahde-vefa-qurban-somalia.png"
            alt="Qurban organization in Somalia"
            className="rounded-lg object-cover w-full h-48"
          />
        </div>
      </div>

      {/* Regions */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {t.regions.map((region, idx) => (
              <div key={idx} className="bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-bold text-foreground mb-4">{region.name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {region.countries.map((country, cidx) => (
                    <div key={cidx} className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-sm">{country}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-8 pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold text-accent">{region.projects}</div>
                    <div className="text-sm text-muted-foreground">{language === "tr" ? "Proje" : "Projects"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{region.beneficiaries}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === "tr" ? "Yardım Alan" : "Beneficiaries"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
