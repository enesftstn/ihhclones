export interface DonationProduct {
  id: string
  name: string
  nameTranslations: {
    en: string
    tr: string
  }
  description: string
  descriptionTranslations: {
    en: string
    tr: string
  }
  suggestedAmounts: number[] // in cents
  category: string
  image?: string
  isRecurring?: boolean
}

// Donation products catalog
export const DONATION_PRODUCTS: DonationProduct[] = [
  {
    id: "palestine-relief",
    name: "Palestine Emergency Relief",
    nameTranslations: {
      en: "Palestine Emergency Relief",
      tr: "Filistin Acil Yardım",
    },
    description: "Provide urgent humanitarian aid to families in Palestine",
    descriptionTranslations: {
      en: "Provide urgent humanitarian aid to families in Palestine",
      tr: "Filistin'deki ailelere acil insani yardım sağlayın",
    },
    suggestedAmounts: [2500, 5000, 10000, 25000], // $25, $50, $100, $250
    category: "emergency",
    image: "/palestine-humanitarian-aid.jpg",
    isRecurring: true,
  },
  {
    id: "orphan-sponsorship",
    name: "Orphan Sponsorship",
    nameTranslations: {
      en: "Orphan Sponsorship",
      tr: "Yetim Sponsorluğu",
    },
    description: "Sponsor an orphan child for a month",
    descriptionTranslations: {
      en: "Sponsor an orphan child for a month",
      tr: "Bir yetim çocuğa aylık sponsor olun",
    },
    suggestedAmounts: [5000, 10000, 15000], // $50, $100, $150
    category: "sponsorship",
    image: "/orphan-child-education.jpg",
    isRecurring: true,
  },
  {
    id: "clean-water",
    name: "Clean Water Project",
    nameTranslations: {
      en: "Clean Water Project",
      tr: "Temiz Su Projesi",
    },
    description: "Build water wells in underserved communities",
    descriptionTranslations: {
      en: "Build water wells in underserved communities",
      tr: "Yoksun topluluklara su kuyuları yapın",
    },
    suggestedAmounts: [10000, 25000, 50000, 100000], // $100, $250, $500, $1000
    category: "water",
    image: "/water-well-construction.jpg",
  },
  {
    id: "medical-aid",
    name: "Medical Aid",
    nameTranslations: {
      en: "Medical Aid",
      tr: "Tıbbi Yardım",
    },
    description: "Provide essential medical care and supplies",
    descriptionTranslations: {
      en: "Provide essential medical care and supplies",
      tr: "Temel tıbbi bakım ve malzemeler sağlayın",
    },
    suggestedAmounts: [5000, 10000, 20000, 50000], // $50, $100, $200, $500
    category: "health",
    image: "/medical-aid-supplies.jpg",
    isRecurring: true,
  },
  {
    id: "education",
    name: "Education Support",
    nameTranslations: {
      en: "Education Support",
      tr: "Eğitim Desteği",
    },
    description: "Fund education for children in need",
    descriptionTranslations: {
      en: "Fund education for children in need",
      tr: "İhtiyaç sahibi çocukların eğitimini destekleyin",
    },
    suggestedAmounts: [2500, 5000, 10000, 25000], // $25, $50, $100, $250
    category: "education",
    image: "/children-school-education.jpg",
    isRecurring: true,
  },
  {
    id: "food-aid",
    name: "Food Aid",
    nameTranslations: {
      en: "Food Aid",
      tr: "Gıda Yardımı",
    },
    description: "Provide food packages to families in crisis",
    descriptionTranslations: {
      en: "Provide food packages to families in crisis",
      tr: "Kriz içindeki ailelere gıda paketleri sağlayın",
    },
    suggestedAmounts: [2500, 5000, 7500, 15000], // $25, $50, $75, $150
    category: "food",
    image: "/food-aid-packages.jpg",
    isRecurring: true,
  },
  {
    id: "shelter",
    name: "Shelter & Housing",
    nameTranslations: {
      en: "Shelter & Housing",
      tr: "Barınma ve Konut",
    },
    description: "Build safe homes for displaced families",
    descriptionTranslations: {
      en: "Build safe homes for displaced families",
      tr: "Yerinden edilmiş aileler için güvenli evler inşa edin",
    },
    suggestedAmounts: [10000, 25000, 50000, 100000], // $100, $250, $500, $1000
    category: "shelter",
    image: "/refugee-shelter-housing.jpg",
  },
  {
    id: "general-donation",
    name: "General Donation",
    nameTranslations: {
      en: "General Donation",
      tr: "Genel Bağış",
    },
    description: "Support our humanitarian work where needed most",
    descriptionTranslations: {
      en: "Support our humanitarian work where needed most",
      tr: "En çok ihtiyaç duyulan yerde insani çalışmalarımızı destekleyin",
    },
    suggestedAmounts: [2500, 5000, 10000, 25000], // $25, $50, $100, $250
    category: "general",
    image: "/humanitarian-relief-aid.jpg",
    isRecurring: true,
  },
]
