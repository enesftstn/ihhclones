"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "tr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Header
    "nav.about": "About Us",
    "nav.projects": "Projects",
    "nav.news": "News",
    "nav.donate": "Donate",
    "nav.contact": "Contact",
    "nav.login": "Admin Login",

    // Hero
    "hero.title1": "Emergency Relief for Palestine",
    "hero.subtitle1": "Provide urgent humanitarian aid to families in crisis",
    "hero.title2": "Clean Water for Communities",
    "hero.subtitle2": "Help us bring safe drinking water to those in need",
    "hero.title3": "Medical Care Saves Lives",
    "hero.subtitle3": "Support critical healthcare services in underserved areas",
    "hero.donateNow": "Donate Now",

    // Campaigns
    "campaigns.title": "Ways to Help",
    "campaigns.subtitle": "Your donation makes a real difference in people's lives",
    "campaigns.palestine": "Palestine Relief",
    "campaigns.palestineDesc": "Emergency aid for families",
    "campaigns.cataract": "Cataract Surgery",
    "campaigns.cataractDesc": "Restore vision for those in need",
    "campaigns.water": "Clean Water",
    "campaigns.waterDesc": "Safe drinking water access",
    "campaigns.orphan": "Orphan Support",
    "campaigns.orphanDesc": "Care for vulnerable children",
    "campaigns.food": "Food Aid",
    "campaigns.foodDesc": "Meals for hungry families",
    "campaigns.education": "Education",
    "campaigns.educationDesc": "School supplies and support",
    "campaigns.health": "Healthcare",
    "campaigns.healthDesc": "Medical care and treatment",
    "campaigns.emergency": "Emergency Relief",
    "campaigns.emergencyDesc": "Urgent crisis response",

    // News
    "news.title": "Latest News & Updates",
    "news.subtitle": "Stay informed about our humanitarian work around the world",
    "news.readMore": "Read More",
    "news.1.title": "Emergency Response in Gaza",
    "news.1.desc": "Our teams delivered essential supplies to 10,000 families affected by recent crisis",
    "news.2.title": "500 Cataract Surgeries Completed",
    "news.2.desc": "Medical mission successfully restored vision for patients across 5 countries",
    "news.3.title": "New Water Wells in Africa",
    "news.3.desc": "25 new wells provide clean water access to rural communities in need",

    // Impact Stories
    "impact.title": "Stories of Hope",
    "impact.subtitle": "Real people whose lives have been transformed by your generosity",
    "impact.1.quote":
      "Thanks to your donations, my daughter received the surgery she desperately needed. Our family is forever grateful.",
    "impact.1.name": "Fatima",
    "impact.1.location": "Syria",
    "impact.2.quote":
      "The clean water well changed everything for our village. No more walking hours for water. Our children are healthier.",
    "impact.2.name": "Ahmed",
    "impact.2.location": "Yemen",
    "impact.3.quote":
      "Your support gave me the chance to go to school. Now I dream of becoming a doctor to help others.",
    "impact.3.name": "Amina",
    "impact.3.location": "Somalia",

    // Projects
    "projects.title": "Active Projects",
    "projects.subtitle": "Help us reach our goals for critical humanitarian initiatives",
    "projects.raised": "raised",
    "projects.goal": "goal",
    "projects.donate": "Donate",
    "projects.1.title": "Winter Relief Campaign",
    "projects.1.desc": "Provide warm clothing and heating for refugee families",
    "projects.2.title": "Mobile Medical Clinics",
    "projects.2.desc": "Healthcare services in remote and conflict zones",
    "projects.3.title": "School Reconstruction",
    "projects.3.desc": "Rebuild schools destroyed by natural disasters",

    // CTA
    "cta.title": "Your Support Changes Lives",
    "cta.subtitle": "Join thousands of donors making a difference every day",
    "cta.monthly": "Become a Monthly Donor",
    "cta.once": "Make a One-Time Donation",

    // Footer
    "footer.about": "About",
    "footer.mission": "Our Mission",
    "footer.team": "Our Team",
    "footer.reports": "Annual Reports",
    "footer.transparency": "Transparency",
    "footer.getInvolved": "Get Involved",
    "footer.volunteer": "Volunteer",
    "footer.fundraise": "Fundraise",
    "footer.partner": "Partner With Us",
    "footer.careers": "Careers",
    "footer.contact": "Contact",
    "footer.email": "Email Us",
    "footer.phone": "Call Us",
    "footer.address": "Visit Us",
    "footer.faq": "FAQ",
    "footer.newsletter": "Newsletter",
    "footer.newsletterText": "Get updates on our humanitarian work",
    "footer.emailPlaceholder": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved.",
    "footer.charity": "Ahde Vefa Social Solidarity and Assistance Association is a registered non-profit organization.",
  },
  tr: {
    // Header
    "nav.about": "Hakkımızda",
    "nav.projects": "Projeler",
    "nav.news": "Haberler",
    "nav.donate": "Bağış Yap",
    "nav.contact": "İletişim",
    "nav.login": "Yönetici Girişi",

    // Hero
    "hero.title1": "Filistin için Acil Yardım",
    "hero.subtitle1": "Kriz yaşayan ailelere acil insani yardım sağlayın",
    "hero.title2": "Toplumlara Temiz Su",
    "hero.subtitle2": "İhtiyaç sahiplerine güvenli içme suyu getirmemize yardım edin",
    "hero.title3": "Tıbbi Bakım Hayat Kurtarır",
    "hero.subtitle3": "Yetersiz hizmet alan bölgelerde kritik sağlık hizmetlerini destekleyin",
    "hero.donateNow": "Şimdi Bağış Yap",

    // Campaigns
    "campaigns.title": "Yardım Yolları",
    "campaigns.subtitle": "Bağışınız insanların hayatlarında gerçek bir fark yarat��yor",
    "campaigns.palestine": "Filistin Yardımı",
    "campaigns.palestineDesc": "Aileler için acil yardım",
    "campaigns.cataract": "Katarakt Ameliyatı",
    "campaigns.cataractDesc": "İhtiyaç sahipleri için görme gücü",
    "campaigns.water": "Temiz Su",
    "campaigns.waterDesc": "Güvenli içme suyu erişimi",
    "campaigns.orphan": "Yetim Desteği",
    "campaigns.orphanDesc": "Savunmasız çocuklara bakım",
    "campaigns.food": "Gıda Yardımı",
    "campaigns.foodDesc": "Aç aileler için yemek",
    "campaigns.education": "Eğitim",
    "campaigns.educationDesc": "Okul malzemeleri ve destek",
    "campaigns.health": "Sağlık",
    "campaigns.healthDesc": "Tıbbi bakım ve tedavi",
    "campaigns.emergency": "Acil Yardım",
    "campaigns.emergencyDesc": "Acil kriz müdahalesi",

    // News
    "news.title": "Son Haberler ve Güncellemeler",
    "news.subtitle": "Dünyanın dört bir yanındaki insani yardım çalışmalarımız hakkında bilgi edinin",
    "news.readMore": "Devamını Oku",
    "news.1.title": "Gazze'de Acil Müdahale",
    "news.1.desc": "Ekiplerimiz, son krizden etkilenen 10.000 aileye temel malzemeler ulaştırdı",
    "news.2.title": "500 Katarakt Ameliyatı Tamamlandı",
    "news.2.desc": "Tıbbi görev, 5 ülkede hastaların görme gücünü başarıyla geri kazandırdı",
    "news.3.title": "Afrika'da Yeni Su Kuyuları",
    "news.3.desc": "25 yeni kuyu, ihtiyaç içindeki kırsal topluluklara temiz su erişimi sağlıyor",

    // Impact Stories
    "impact.title": "Umut Hikayeleri",
    "impact.subtitle": "Cömertliğiniz sayesinde hayatları değişen gerçek insanlar",
    "impact.1.quote":
      "Bağışlarınız sayesinde kızım çok ihtiyaç duyduğu ameliyatı oldu. Ailemiz sonsuza kadar minnettar.",
    "impact.1.name": "Fatıma",
    "impact.1.location": "Suriye",
    "impact.2.quote":
      "Temiz su kuyusu köyümüz için her şeyi değiştirdi. Artık su için saatlerce yürümüyoruz. Çocuklarımız daha sağlıklı.",
    "impact.2.name": "Ahmed",
    "impact.2.location": "Yemen",
    "impact.3.quote":
      "Desteğiniz bana okula gitme şansı verdi. Şimdi başkalarına yardım etmek için doktor olmayı hayal ediyorum.",
    "impact.3.name": "Amina",
    "impact.3.location": "Somali",

    // Projects
    "projects.title": "Aktif Projeler",
    "projects.subtitle": "Kritik insani yardım girişimlerimiz için hedeflerimize ulaşmamıza yardımcı olun",
    "projects.raised": "toplanan",
    "projects.goal": "hedef",
    "projects.donate": "Bağış Yap",
    "projects.1.title": "Kış Yardım Kampanyası",
    "projects.1.desc": "Mülteci ailelere sıcak giysi ve ısınma sağlayın",
    "projects.2.title": "Mobil Tıp Klinikleri",
    "projects.2.desc": "Uzak ve çatışma bölgelerinde sağlık hizmetleri",
    "projects.3.title": "Okul Yeniden İnşası",
    "projects.3.desc": "Doğal afetlerde yıkılan okulları yeniden inşa edin",

    // CTA
    "cta.title": "Desteğiniz Hayatları Değiştirir",
    "cta.subtitle": "Her gün fark yaratan binlerce bağışçıya katılın",
    "cta.monthly": "Aylık Bağışçı Ol",
    "cta.once": "Tek Seferlik Bağış Yap",

    // Footer
    "footer.about": "Hakkında",
    "footer.mission": "Misyonumuz",
    "footer.team": "Ekibimiz",
    "footer.reports": "Yıllık Raporlar",
    "footer.transparency": "Şeffaflık",
    "footer.getInvolved": "Dahil Olun",
    "footer.volunteer": "Gönüllü Ol",
    "footer.fundraise": "Bağış Topla",
    "footer.partner": "Ortağımız Olun",
    "footer.careers": "Kariyer",
    "footer.contact": "İletişim",
    "footer.email": "E-posta Gönder",
    "footer.phone": "Ara",
    "footer.address": "Ziyaret Et",
    "footer.faq": "SSS",
    "footer.newsletter": "Bülten",
    "footer.newsletterText": "İnsani yardım çalışmalarımız hakkında güncellemeler alın",
    "footer.emailPlaceholder": "E-posta adresinizi girin",
    "footer.subscribe": "Abone Ol",
    "footer.rights": "Tum haklari saklidir.",
    "footer.charity": "Ahde Vefa Sosyal Yardimlasma ve Dayanisma Dernegi, kayitli bir kar amaci gutmeyen kurulustur.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "tr")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
