"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Heart } from "lucide-react"
import Link from "next/link"


export default function DonationSuccessPage() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      getSessionStatus(sessionId)
        .then((data) => {
          setSessionData(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("[v0] Error fetching session:", error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">{language === "tr" ? "Yükleniyor..." : "Loading..."}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-accent/10 p-6">
                <CheckCircle2 className="h-16 w-16 text-accent" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {language === "tr" ? "Bağışınız için Teşekkürler!" : "Thank You for Your Donation!"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === "tr" ? "Cömert desteğiniz hayat kurtaracak" : "Your generous support will save lives"}
              </p>
            </div>

            {sessionData && (
              <div className="bg-muted rounded-lg p-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "tr" ? "Miktar:" : "Amount:"}</span>
                  <span className="font-semibold">
                    ${(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency?.toUpperCase()}
                  </span>
                </div>
                {sessionData.customer_email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === "tr" ? "E-posta:" : "Email:"}</span>
                    <span className="font-semibold">{sessionData.customer_email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "tr" ? "Durum:" : "Status:"}</span>
                  <span className="font-semibold text-accent">{language === "tr" ? "Başarılı" : "Success"}</span>
                </div>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {language === "tr"
                  ? "E-posta adresinize bir makbuz gönderildi."
                  : "A receipt has been sent to your email address."}
              </p>

              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link href="/">
                    <Heart className="mr-2 h-4 w-4" />
                    {language === "tr" ? "Ana Sayfaya Dön" : "Return to Home"}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/donate">{language === "tr" ? "Tekrar Bağış Yap" : "Donate Again"}</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
