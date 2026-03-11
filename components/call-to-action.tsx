"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, MessageSquare, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export function CallToAction() {
  const { language } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async () => {
    if (!email) return

    setIsSubscribing(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 3000)
      }
    } catch (error) {
      console.error("[v0] Newsletter subscription error:", error)
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-accent">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center">
              <Smartphone className="mx-auto mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                {language === "tr" ? "Mobil Uygulama" : "Mobile App"}
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {language === "tr"
                  ? "İyilik yapmanın en kolay yolu. Uygulamamız üzerinden bağış yapın, ödeme talimatları verin ve hatırlatıcılar ekleyin."
                  : "The easiest way to do good. Donate, set payment instructions, and add reminders through our app."}
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open("https://apps.apple.com", "_blank")}
                >
                  App Store
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open("https://play.google.com", "_blank")}
                >
                  Google Play
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                {language === "tr" ? "SMS ile Bağış" : "Donate by SMS"}
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {language === "tr"
                  ? "Herhangi bir operatörden SMS göndererek davalarımızı destekleyin. Hızlı, kolay ve güvenli."
                  : "Send SMS from any provider to support our causes. Quick, easy, and secure."}
              </p>
              <div className="space-y-3">
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold text-primary">3072</div>
                  <div className="text-sm text-muted-foreground">
                    {language === "tr" ? "Katarakt Ameliyatı" : "Cataract Surgery"}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold text-primary">4072</div>
                  <div className="text-sm text-muted-foreground">
                    {language === "tr" ? "Fidye / Kefaret" : "Fidya / Kaffarah"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center">
              <Mail className="mx-auto mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                {language === "tr" ? "Güncel Kalın" : "Stay Updated"}
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {language === "tr"
                  ? "Çalışmalarımız ve nasıl yardım edebileceğiniz hakkında güncellemeler almak için bültenimize abone olun."
                  : "Subscribe to our newsletter to receive updates about our work and ways you can help."}
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder={language === "tr" ? "E-posta adresinizi girin" : "Enter your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleSubscribe}
                  disabled={isSubscribing || !email}
                >
                  {subscribed
                    ? language === "tr"
                      ? "Abone Oldunuz!"
                      : "Subscribed!"
                    : isSubscribing
                      ? language === "tr"
                        ? "Abone Oluyor..."
                        : "Subscribing..."
                      : language === "tr"
                        ? "Abone Ol"
                        : "Subscribe"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h3 className="mb-4 text-3xl font-bold text-white">
            {language === "tr" ? "Her Katkı Önemlidir" : "Every Contribution Counts"}
          </h3>
          <p className="mb-8 text-xl text-white/90">
            {language === "tr"
              ? "En çok ihtiyacı olanların hayatlarında fark yaratan binlerce insana katılın."
              : "Join thousands of people making a difference in the lives of those who need it most."}
          </p>
          <Button size="lg" variant="secondary" className="font-semibold" onClick={() => router.push("/donate")}>
            {language === "tr" ? "Bugün Fark Yaratmaya Başlayın" : "Start Making a Difference Today"}
          </Button>
        </div>
      </div>
    </section>
  )
}
