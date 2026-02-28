"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award } from "lucide-react"

export default function MissionPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">{language === "tr" ? "Misyonumuz" : "Our Mission"}</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            {language === "tr"
              ? "İhtiyaç içindeki insanlara umut ve yardım götürmek"
              : "Bringing hope and aid to people in need"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="mx-auto mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-2xl font-bold">{language === "tr" ? "Misyon" : "Mission"}</h3>
              <p className="text-muted-foreground">
                {language === "tr"
                  ? "Dünya çapında savunmasız topluluklara insani yardım ve kalkınma programları sağlamak"
                  : "To provide humanitarian aid and development programs to vulnerable communities worldwide"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <Eye className="mx-auto mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-2xl font-bold">{language === "tr" ? "Vizyon" : "Vision"}</h3>
              <p className="text-muted-foreground">
                {language === "tr"
                  ? "Herkesin onurlu bir yaşam sürebileceği bir dünya yaratmak"
                  : "To create a world where everyone can live with dignity"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-2xl font-bold">{language === "tr" ? "Değerler" : "Values"}</h3>
              <p className="text-muted-foreground">
                {language === "tr"
                  ? "Şeffaflık, bütünlük ve her işimizde merhamet"
                  : "Transparency, integrity, and compassion in everything we do"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
