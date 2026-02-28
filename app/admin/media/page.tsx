"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminMediaPage() {
  const [media, setMedia] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media/list")
      const data = await res.json()
      setMedia(data.media || [])
    } catch (error) {
      console.error("[v0] Error fetching media:", error)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setIsDialogOpen(false)
        fetchMedia()
        e.currentTarget.reset()
      }
    } catch (error) {
      console.error("[v0] Error uploading:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number, url: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return

    try {
      const res = await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, url }),
      })

      if (res.ok) {
        fetchMedia()
      }
    } catch (error) {
      console.error("[v0] Error deleting:", error)
    }
  }

  const copyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
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
            <h1 className="text-3xl font-bold">Media Library</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Media</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <Label htmlFor="file">Select File</Label>
                  <Input id="file" name="file" type="file" accept="image/*" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="altTextEn">Alt Text (English)</Label>
                    <Input id="altTextEn" name="altTextEn" />
                  </div>
                  <div>
                    <Label htmlFor="altTextTr">Alt Text (Turkish)</Label>
                    <Input id="altTextTr" name="altTextTr" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" name="tags" placeholder="campaign, palestine, emergency" />
                </div>

                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item: any) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square bg-neutral-100">
                <Image
                  src={item.blob_url || "/placeholder.svg"}
                  alt={item.alt_text_en || item.filename}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-3">
                <p className="text-xs font-medium truncate mb-2">{item.filename}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs bg-transparent"
                    onClick={() => copyUrl(item.blob_url, item.id)}
                  >
                    {copiedId === item.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 bg-transparent"
                    onClick={() => handleDelete(item.id, item.blob_url)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
