"use client"

import { useLanguage } from "@/contexts/language-context"

export default function PrivacyPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            {language === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p>
            {language === "tr"
              ? "Gizliliğiniz bizim için önemlidir. Bu politika, kişisel bilgilerinizi nasıl topladığımızı ve kullandığımızı açıklar."
              : "Your privacy is important to us. This policy explains how we collect and use your personal information."}
          </p>
        </div>
      </div>
    </div>
  )
}
