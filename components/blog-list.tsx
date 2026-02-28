"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, User } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface BlogPost {
  id: number
  title_en: string
  title_tr: string
  slug: string
  excerpt_en: string
  excerpt_tr: string
  author_name: string
  author_avatar: string
  featured_image: string
  category: string
  tags: string[]
  view_count: number
  is_featured: boolean
  published_at: string
}

export function BlogList() {
  const { language } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    try {
      const url = filter === "all" ? "/api/blog" : `/api/blog?category=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("[v0] Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">{language === "tr" ? "Yükleniyor..." : "Loading..."}</div>
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{language === "tr" ? "Blog & Haberler" : "Blog & News"}</h1>
        <p className="text-xl text-muted-foreground">
          {language === "tr" ? "Sahadan hikayeler ve güncellemeler" : "Stories and updates from the field"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          {language === "tr" ? "Tümü" : "All"}
        </Button>
        <Button variant={filter === "impact" ? "default" : "outline"} onClick={() => setFilter("impact")}>
          {language === "tr" ? "Etki" : "Impact"}
        </Button>
        <Button variant={filter === "projects" ? "default" : "outline"} onClick={() => setFilter("projects")}>
          {language === "tr" ? "Projeler" : "Projects"}
        </Button>
        <Button variant={filter === "stories" ? "default" : "outline"} onClick={() => setFilter("stories")}>
          {language === "tr" ? "Hikayeler" : "Stories"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <Link href={`/blog/${post.slug}`}>
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={post.featured_image || "/placeholder.svg"}
                  alt={language === "tr" ? post.title_tr : post.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.is_featured && (
                  <Badge className="absolute top-3 right-3">{language === "tr" ? "Öne Çıkan" : "Featured"}</Badge>
                )}
              </div>
            </Link>

            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">
                  {post.category}
                </Badge>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-xl font-bold hover:text-accent transition-colors">
                  {language === "tr" ? post.title_tr : post.title_en}
                </h3>
              </Link>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {language === "tr" ? post.excerpt_tr : post.excerpt_en}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {post.author_name && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(post.published_at), "MMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.view_count}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/blog/${post.slug}`}>{language === "tr" ? "Devamını Oku" : "Read More"}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {language === "tr" ? "Blog yazısı bulunamadı" : "No blog posts found"}
        </div>
      )}
    </div>
  )
}
