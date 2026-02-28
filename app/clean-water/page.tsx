"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CleanWaterPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            {language === "tr" ? "Temiz Su Projeleri" : "Clean Water Projects"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-8">
            <p className="mb-6 text-lg">
              {language === "tr"
                ? "Temiz suya erişimi olmayan topluluklara su kuyuları inşa ediyoruz."
                : "We build water wells for communities without access to clean water."}
            </p>
            <Button size="lg">{language === "tr" ? "Proje Destekle" : "Support a Project"}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
