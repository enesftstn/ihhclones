"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function FinancialsPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            {language === "tr" ? "Finansal Bilgiler" : "Financial Information"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold">
              {language === "tr" ? "2024 Mali Özet" : "2024 Financial Summary"}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-muted-foreground">{language === "tr" ? "Toplam Gelir" : "Total Revenue"}</p>
                <p className="text-3xl font-bold text-primary">$12.5M</p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {language === "tr" ? "Program Harcamaları" : "Program Expenses"}
                </p>
                <p className="text-3xl font-bold text-primary">$10.8M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
