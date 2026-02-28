"use client"

import { useCallback, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  productId: string
  amount: number
  isRecurring?: boolean
  donorInfo?: {
    name?: string
    email?: string
    message?: string
  }
}

export function StripeCheckout({ productId, amount, isRecurring = false, donorInfo }: StripeCheckoutProps) {
  const { language } = useLanguage()
  const [error, setError] = useState<string | null>(null)

  const fetchClientSecret = useCallback(async () => {
    try {
      const clientSecret = await startCheckoutSession(productId, amount, isRecurring, donorInfo)
      return clientSecret
    } catch (err) {
      setError(
        language === "tr"
          ? "Ödeme oturumu başlatılamadı. Lütfen tekrar deneyin."
          : "Failed to start payment session. Please try again.",
      )
      console.error("[v0] Stripe checkout error:", err)
      return null
    }
  }, [productId, amount, isRecurring, donorInfo, language])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
