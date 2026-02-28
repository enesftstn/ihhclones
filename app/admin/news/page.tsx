"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminNewsPage() {
  const [news, setNews] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    titleEn: "",
    titleTr: "",
    contentEn: "",
    contentTr: "",
    excerptEn: "",
    excerptTr: "",
    imageUrl: "",
    author: "",
    category: "",
    slug: "",
    isFeatured: false,
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news")
      const data = await res.json()
      setNews(data.news || [])
    } catch (error) {
      console.error("[v0] Error fetching news:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsDialogOpen(false)
        fetchNews()
        setFormData({
          titleEn: "",
          titleTr: "",
          contentEn: "",
          contentTr: "",
          excerptEn: "",
          excerptTr: "",
          imageUrl: "",
          author: "",
          category: "",
          slug: "",
          isFeatured: false,
        })
      }
    } catch (error) {
      console.error("[v0] Error creating news:", error)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Manage News</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add News Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create News Article</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titleEn">Title (English)</Label>
                    <Input
                      id="titleEn"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="titleTr">Title (Turkish)</Label>
                    <Input
                      id="titleTr"
                      value={formData.titleTr}
                      onChange={(e) => setFormData({ ...formData, titleTr: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contentEn">Content (English)</Label>
                  <Textarea
                    id="contentEn"
                    value={formData.contentEn}
                    onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contentTr">Content (Turkish)</Label>
                  <Textarea
                    id="contentTr"
                    value={formData.contentTr}
                    onChange={(e) => setFormData({ ...formData, contentTr: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded"
                  />
                  <span>Featured Article</span>
                </label>

                <Button type="submit" className="w-full">
                  Publish Article
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article: any) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{article.title_en}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt_en}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
