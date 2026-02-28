"use client"

import { useLanguage } from "@/contexts/language-context"

export default function TermsPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            {language === "tr" ? "Hizmet Şartları" : "Terms of Service"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p>
            {language === "tr"
              ? "Web sitemizi kullanarak bu hizmet şartlarını kabul etmiş olursunuz."
              : "By using our website, you agree to these terms of service."}
          </p>
        </div>
      </div>
    </div>
  )
}
