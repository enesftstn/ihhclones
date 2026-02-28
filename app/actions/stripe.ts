"use server"

import { stripe } from "@/lib/stripe"
import { DONATION_PRODUCTS } from "@/lib/donation-products"
import { execute } from "@/lib/db"
import crypto from "crypto"

export async function startCheckoutSession(
  productId: string,
  amount: number,
  isRecurring = false,
  donorInfo?: {
    name?: string
    email?: string
    message?: string
  },
) {
  const product = DONATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  if (amount < 100 || amount > 10000000) {
    throw new Error("Invalid donation amount")
  }

  const sessionParams: any = {
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: amount,
          ...(isRecurring && product.isRecurring
            ? {
                recurring: {
                  interval: "month",
                },
              }
            : {}),
        },
        quantity: 1,
      },
    ],
    mode: isRecurring && product.isRecurring ? "subscription" : "payment",
    customer_email: donorInfo?.email,
    metadata: {
      product_id: productId,
      donor_name: donorInfo?.name || "",
      donor_message: donorInfo?.message || "",
    },
  }

  const session = await stripe.checkout.sessions.create(sessionParams)

  return session.client_secret
}

export async function getSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status === "paid" && session.payment_intent) {
    try {
      const orderNumber = `DON-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`

      await execute(
        `INSERT INTO donations (order_number, donor_name, donor_email, total_amount, currency, payment_method, payment_status, transaction_id, is_recurring, notes)
         VALUES (?, ?, ?, ?, ?, 'credit_card', 'completed', ?, ?, ?)`,
        [
          orderNumber,
          session.metadata?.donor_name || "Anonymous",
          session.customer_details?.email || "",
          (session.amount_total || 0) / 100,
          session.currency || "usd",
          session.payment_intent as string,
          session.mode === "subscription" ? 1 : 0,
          session.metadata?.donor_message || null,
        ]
      )
    } catch (error) {
      console.error("[v0] Error saving donation:", error)
    }
  }

  return {
    status: session.status,
    customer_email: session.customer_details?.email,
    amount_total: session.amount_total,
    currency: session.currency,
  }
}
