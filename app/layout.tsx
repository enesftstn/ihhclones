import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ahde Vefa - Sosyal Yardımlaşma ve Dayanışma Derneği",
  description:
    "Ahde Vefa Sosyal Yardımlaşma ve Dayanışma Derneği - İhtiyaç sahiplerine insani yardım, acil destek ve kalkınma programları sunuyoruz.",
  keywords: "insani yardım, bağış, hayır kurumu, acil yardım, yetim sponsorluğu, temiz su, tıbbi yardım, ahde vefa",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} font-sans antialiased`}>
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster position="top-right" richColors />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
