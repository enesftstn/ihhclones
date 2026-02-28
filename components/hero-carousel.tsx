"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const slides = [
    {
      id: 1,
      title: t("hero.title1"),
      description: t("hero.subtitle1"),
      image: "/humanitarian-aid-middle-east.jpg",
      action: t("hero.donateNow"),
      campaign: "Palestine Emergency Relief",
    },
    {
      id: 2,
      title: t("hero.title2"),
      description: t("hero.subtitle2"),
      image: "/water-well-village-africa.jpg",
      action: t("hero.donateNow"),
      campaign: "Clean Water Project",
    },
    {
      id: 3,
      title: t("hero.title3"),
      description: t("hero.subtitle3"),
      image: "/medical-eye-surgery-africa.jpg",
      action: t("hero.donateNow"),
      campaign: "Cataract Surgery",
    },
  ]

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <h1 className="mb-4 text-5xl font-bold leading-tight text-balance">{slide.title}</h1>
                <p className="mb-8 text-xl leading-relaxed text-white/90 text-pretty">{slide.description}</p>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                  onClick={() => router.push(`/donate?campaign=${encodeURIComponent(slide.campaign)}`)}
                >
                  {slide.action}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

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
    </section>
  )
}
