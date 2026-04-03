"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Banner {
  id: number
  title_en: string
  title_tr: string
  subtitle_en: string
  subtitle_tr: string
  image_url: string
  link_url: string
  button_text_en: string
  button_text_tr: string
  sort_order: number
}

// Default slides to use as fallback
const defaultSlides = [
  {
    id: "default-1",
    titleEn: "Help Those in Need",
    titleTr: "İhtiyaç Sahiplerine Yardım Edin",
    subtitleEn: "Your donation can change lives. Join us in providing humanitarian aid to communities in crisis.",
    subtitleTr: "Bağışınız hayatları değiştirebilir. Kriz içindeki topluluklara insani yardım sağlamak için bize katılın.",
    imageUrl: "/ahde-vefa-volunteer-boxes.jpg",
    buttonTextEn: "Donate Now",
    buttonTextTr: "Şimdi Bağış Yap",
    linkUrl: "/donate",
  },
  {
    id: "default-2",
    titleEn: "Food Aid Distribution",
    titleTr: "Gıda Yardımı Dağıtımı",
    subtitleEn: "We deliver food packages to families in need across multiple countries including Somalia.",
    subtitleTr: "Somali dahil birden fazla ülkede ihtiyaç sahibi ailelere gıda paketleri ulaştırıyoruz.",
    imageUrl: "/ahde-vefa-somalia-distribution.png",
    buttonTextEn: "Support Food Aid",
    buttonTextTr: "Gıda Yardımını Destekle",
    linkUrl: "/donate?campaign=food-aid",
  },
  {
    id: "default-3",
    titleEn: "Medical Aid for All",
    titleTr: "Herkes İçin Tıbbi Yardım",
    subtitleEn: "Providing essential medical care including cataract surgeries in Somalia.",
    subtitleTr: "Somali'de katarakt ameliyatları dahil temel tıbbi bakım sağlıyoruz.",
    imageUrl: "/ahde-vefa-cataract-surgery.png",
    buttonTextEn: "Support Healthcare",
    buttonTextTr: "Sağlık Hizmetlerini Destekle",
    linkUrl: "/donate?campaign=medical-aid",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const router = useRouter()

  // Fetch banners from database
  const { data, isLoading } = useSWR<{ banners: Banner[] }>('/api/banners', fetcher)
  const dbBanners = data?.banners || []

  // Convert database banners to slide format or use defaults
  const slides = dbBanners.length > 0
    ? dbBanners.map(banner => ({
        id: banner.id,
        titleEn: banner.title_en,
        titleTr: banner.title_tr,
        subtitleEn: banner.subtitle_en || "",
        subtitleTr: banner.subtitle_tr || "",
        imageUrl: banner.image_url,
        buttonTextEn: banner.button_text_en || "Donate Now",
        buttonTextTr: banner.button_text_tr || "Şimdi Bağış Yap",
        linkUrl: banner.link_url || "/donate",
      }))
    : defaultSlides

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  if (isLoading) {
    return (
      <section className="relative h-[600px] w-full overflow-hidden bg-muted flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </section>
    )
  }

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-muted">
      {slides.map((slide, index) => {
        const title = language === "tr" ? slide.titleTr : slide.titleEn
        const subtitle = language === "tr" ? slide.subtitleTr : slide.subtitleEn
        const buttonText = language === "tr" ? slide.buttonTextTr : slide.buttonTextEn

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={slide.imageUrl || "/placeholder.svg"} 
              alt={title} 
              className="h-full w-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h1 className="mb-4 text-5xl font-bold leading-tight text-balance">{title}</h1>
                  {subtitle && (
                    <p className="mb-8 text-xl leading-relaxed text-white/90 text-pretty">{subtitle}</p>
                  )}
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                    onClick={() => router.push(slide.linkUrl || '/donate')}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
