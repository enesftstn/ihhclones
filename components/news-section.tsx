"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface NewsArticle {
  id: number
  title_en: string
  title_tr: string
  excerpt_en: string
  excerpt_tr: string
  image_url: string
  category: string
  published_at: string
}

export function NewsSection() {
  const { language } = useLanguage()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?limit=4")
      const data = await res.json()
      setNews(data.news || [])
    } catch (error) {
      console.error("[v0] Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">Loading news...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-foreground">{language === "en" ? "Latest News" : "Son Haberler"}</h2>
          <Link href="/news">
            <Button variant="outline">{language === "en" ? "View All News" : "Tüm Haberler"}</Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={language === "en" ? item.title_en : item.title_tr}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent font-medium">{item.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.published_at).toLocaleDateString(language === "en" ? "en-US" : "tr-TR")}
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors text-balance">
                  {language === "en" ? item.title_en : item.title_tr}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty line-clamp-3">
                  {language === "en" ? item.excerpt_en : item.excerpt_tr}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
