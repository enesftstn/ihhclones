"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ImpactStory {
  id: number
  name_en: string
  name_tr: string
  location_en: string
  location_tr: string
  story_en: string
  story_tr: string
  quote_en: string
  quote_tr: string
  image_url: string
}

export function ImpactStories() {
  const { language } = useLanguage()
  const [currentStory, setCurrentStory] = useState(0)
  const [stories, setStories] = useState<ImpactStory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/impact-stories?featured=true")
      const data = await res.json()
      setStories(data.stories || [])
    } catch (error) {
      console.error("[v0] Error fetching impact stories:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextStory = () => setCurrentStory((prev) => (prev + 1) % stories.length)
  const prevStory = () => setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)

  if (loading || stories.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            {loading ? "Loading stories..." : "No stories available"}
          </div>
        </div>
      </section>
    )
  }

  const currentStoryData = stories[currentStory]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-accent font-semibold">{language === "en" ? "We Were There" : "Oradaydık"}</p>
          <h2 className="text-4xl font-bold text-foreground">
            {language === "en" ? "Meet a New Life" : "Yeni Bir Hayatla Tanışın"}
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-80 md:h-auto">
                <img
                  src={currentStoryData.image_url || "/placeholder.svg"}
                  alt={language === "en" ? currentStoryData.name_en : currentStoryData.name_tr}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-center p-8 md:p-12">
                <Quote className="mb-4 h-12 w-12 text-accent" />
                <h3 className="mb-4 text-3xl font-bold text-foreground text-balance">
                  {language === "en" ? currentStoryData.quote_en : currentStoryData.quote_tr}
                </h3>
                <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
                  {language === "en" ? currentStoryData.story_en : currentStoryData.story_tr}
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  — {language === "en" ? currentStoryData.name_en : currentStoryData.name_tr},{" "}
                  {language === "en" ? currentStoryData.location_en : currentStoryData.location_tr}
                </p>
                <Button variant="outline" className="w-fit bg-transparent">
                  {language === "en" ? "Read Full Story" : "Tam Hikayeyi Oku"}
                </Button>
              </CardContent>
            </div>
          </Card>

          {stories.length > 1 && (
            <>
              <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                <button
                  onClick={prevStory}
                  className="rounded-full bg-white p-3 shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                <button
                  onClick={nextStory}
                  className="rounded-full bg-white p-3 shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Next story"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button variant="link" className="text-primary">
            {language === "en" ? "View All Stories →" : "Tüm Hikayeleri Gör →"}
          </Button>
        </div>
      </div>
    </section>
  )
}
