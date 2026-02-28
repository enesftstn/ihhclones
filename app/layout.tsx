import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Hope Relief Foundation - Humanitarian Aid Organization",
  description:
    "Providing humanitarian aid, emergency relief, and development programs to communities in need worldwide. Join us in making a difference.",
  keywords: "humanitarian aid, charity, donation, emergency relief, orphan sponsorship, clean water, medical aid",
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
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
