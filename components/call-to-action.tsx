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
