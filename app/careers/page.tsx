"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CareersPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            {language === "tr" ? "Kariyer Fırsatları" : "Career Opportunities"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">{language === "tr" ? "Ekibimize Katılın" : "Join Our Team"}</h2>
            <p className="text-muted-foreground mb-6">
              {language === "tr"
                ? "Kariyer fırsatları için lütfen info@hoperelief.org adresine başvurun"
                : "Please send your application to info@hoperelief.org"}
            </p>
            <Button>{language === "tr" ? "Başvur" : "Apply Now"}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
