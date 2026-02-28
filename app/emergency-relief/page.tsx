"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EmergencyReliefPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            {language === "tr" ? "Acil Yardım" : "Emergency Relief"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-8">
            <p className="mb-6 text-lg">
              {language === "tr"
                ? "Dünya çapında afet ve acil durumlarda ilk müdahale ekiplerimiz hayat kurtarıyor."
                : "Our first response teams save lives in disasters and emergencies worldwide."}
            </p>
            <Button size="lg">{language === "tr" ? "Bağış Yap" : "Donate Now"}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
