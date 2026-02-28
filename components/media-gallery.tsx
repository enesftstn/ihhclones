"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Video, FileText, Download } from "lucide-react"

interface MediaItem {
  id: number
  title_en: string
  title_tr: string
  description_en: string
  description_tr: string
  media_type: "image" | "video" | "pdf"
  media_url: string
  thumbnail_url: string
  category: string
  tags: string[]
  is_featured: boolean
}

export function MediaGallery() {
  const { language } = useLanguage()
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchMedia()
  }, [filter])

  const fetchMedia = async () => {
    try {
      const url = filter === "all" ? "/api/media-gallery" : `/api/media-gallery?type=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      setMedia(data)
    } catch (error) {
      console.error("[v0] Error fetching media:", error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "pdf":
        return <FileText className="h-5 w-5" />
      default:
        return null
    }
  }

  if (loading) {
    return <div className="text-center py-8">{language === "tr" ? "Yükleniyor..." : "Loading..."}</div>
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{language === "tr" ? "Medya Galerisi" : "Media Gallery"}</h1>
        <p className="text-xl text-muted-foreground">
          {language === "tr" ? "Fotoğraflar, videolar ve raporlar" : "Photos, videos, and reports"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          {language === "tr" ? "Tümü" : "All"}
        </Button>
        <Button variant={filter === "image" ? "default" : "outline"} onClick={() => setFilter("image")}>
          <ImageIcon className="mr-2 h-4 w-4" />
          {language === "tr" ? "Fotoğraflar" : "Photos"}
        </Button>
        <Button variant={filter === "video" ? "default" : "outline"} onClick={() => setFilter("video")}>
          <Video className="mr-2 h-4 w-4" />
          {language === "tr" ? "Videolar" : "Videos"}
        </Button>
        <Button variant={filter === "pdf" ? "default" : "outline"} onClick={() => setFilter("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          {language === "tr" ? "Raporlar" : "Reports"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src={item.thumbnail_url || item.media_url || "/placeholder.svg"}
                alt={language === "tr" ? item.title_tr : item.title_en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="flex items-center gap-1">
                  {getIcon(item.media_type)}
                  <span className="capitalize">{item.media_type}</span>
                </Badge>
              </div>
              {item.is_featured && (
                <Badge className="absolute top-3 right-3">{language === "tr" ? "Öne Çıkan" : "Featured"}</Badge>
              )}
            </div>

            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-lg">{language === "tr" ? item.title_tr : item.title_en}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {language === "tr" ? item.description_tr : item.description_en}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href={item.media_url} target="_blank" rel="noopener noreferrer">
                  {item.media_type === "pdf" ? (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      {language === "tr" ? "İndir" : "Download"}
                    </>
                  ) : (
                    <>{language === "tr" ? "Görüntüle" : "View"}</>
                  )}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {media.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {language === "tr" ? "Medya içeriği bulunamadı" : "No media content found"}
        </div>
      )}
    </div>
  )
}
