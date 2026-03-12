"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Trash2, ArrowLeft, Loader2, RefreshCw, MoveUp, MoveDown, Link as LinkIcon, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

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
    is_active: boolean
    created_at: string
}

export default function AdminBannersPage() {
    const [banners, setBanners] = useState<Banner[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        titleEn: "",
        titleTr: "",
        subtitleEn: "",
        subtitleTr: "",
        imageUrl: "",
        linkUrl: "",
        buttonTextEn: "Donate Now",
        buttonTextTr: "Şimdi Bağış Yap",
        sortOrder: "0",
    })

    useEffect(() => {
        fetchBanners()
    }, [])

    const fetchBanners = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/banners")
            const data = await res.json()
            setBanners(data.banners || [])
        } catch (error) {
            console.error("[v0] Error fetching banners:", error)
            toast.error("Failed to load banners")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/banners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success("Banner created successfully")
                setIsDialogOpen(false)
                fetchBanners()
                setFormData({
                    titleEn: "",
                    titleTr: "",
                    subtitleEn: "",
                    subtitleTr: "",
                    imageUrl: "",
                    linkUrl: "",
                    buttonTextEn: "Donate Now",
                    buttonTextTr: "Şimdi Bağış Yap",
                    sortOrder: "0",
                })
            } else {
                const data = await res.json()
                toast.error(data.error || "Failed to create banner")
            }
        } catch (error) {
            console.error("[v0] Error creating banner:", error)
            toast.error("Failed to create banner")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/banners?id=${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                toast.success("Banner deleted successfully")
                fetchBanners()
            } else {
                toast.error("Failed to delete banner")
            }
        } catch (error) {
            console.error("[v0] Error deleting banner:", error)
            toast.error("Failed to delete banner")
        }
    }

    const updateSortOrder = async (id: number, newOrder: number) => {
        try {
            const res = await fetch("/api/banners", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, sortOrder: newOrder }),
            })

            if (res.ok) {
                fetchBanners()
            } else {
                toast.error("Failed to update order")
            }
        } catch (error) {
            console.error("[v0] Error updating order:", error)
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
                        <h1 className="text-3xl font-bold">Banner Management</h1>
                        <p className="text-muted-foreground mt-1">Manage homepage carousel banners</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={fetchBanners}>
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Banner
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Create New Banner</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="titleEn">Title (English) *</Label>
                                            <Input
                                                id="titleEn"
                                                value={formData.titleEn}
                                                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                                placeholder="Main heading..."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="titleTr">Title (Turkish) *</Label>
                                            <Input
                                                id="titleTr"
                                                value={formData.titleTr}
                                                onChange={(e) => setFormData({ ...formData, titleTr: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="subtitleEn">Subtitle (English)</Label>
                                            <Textarea
                                                id="subtitleEn"
                                                value={formData.subtitleEn}
                                                onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                                                rows={2}
                                                placeholder="Supporting text..."
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="subtitleTr">Subtitle (Turkish)</Label>
                                            <Textarea
                                                id="subtitleTr"
                                                value={formData.subtitleTr}
                                                onChange={(e) => setFormData({ ...formData, subtitleTr: e.target.value })}
                                                rows={2}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="imageUrl">Background Image URL *</Label>
                                        <Input
                                            id="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="https://..."
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Recommended: 1920x600px or larger
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="linkUrl">Button Link URL</Label>
                                        <Input
                                            id="linkUrl"
                                            value={formData.linkUrl}
                                            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                            placeholder="/donate or full URL"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="buttonTextEn">Button Text (English)</Label>
                                            <Input
                                                id="buttonTextEn"
                                                value={formData.buttonTextEn}
                                                onChange={(e) => setFormData({ ...formData, buttonTextEn: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="buttonTextTr">Button Text (Turkish)</Label>
                                            <Input
                                                id="buttonTextTr"
                                                value={formData.buttonTextTr}
                                                onChange={(e) => setFormData({ ...formData, buttonTextTr: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="sortOrder">Sort Order</Label>
                                        <Input
                                            id="sortOrder"
                                            type="number"
                                            value={formData.sortOrder}
                                            onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                                            placeholder="0"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Lower numbers appear first
                                        </p>
                                    </div>

                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                            Create Banner
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    </div>
                ) : banners.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground mb-4">No banners found</p>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Banner
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {banners.map((banner, index) => (
                            <Card key={banner.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-64 h-40 md:h-auto relative bg-muted flex-shrink-0">
                                        {banner.image_url ? (
                                            <img
                                                src={banner.image_url}
                                                alt={banner.title_en}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                            Order: {banner.sort_order}
                                        </div>
                                    </div>
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold">{banner.title_en}</h3>
                                                <p className="text-sm text-muted-foreground">{banner.title_tr}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => updateSortOrder(banner.id, banner.sort_order - 1)}
                                                    disabled={banner.sort_order <= 0}
                                                >
                                                    <MoveUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => updateSortOrder(banner.id, banner.sort_order + 1)}
                                                >
                                                    <MoveDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {banner.subtitle_en && (
                                            <p className="text-muted-foreground mt-2 line-clamp-2">{banner.subtitle_en}</p>
                                        )}
                                        <div className="flex items-center gap-4 mt-4 text-sm">
                                            {banner.link_url && (
                                                <span className="flex items-center gap-1 text-accent">
                                                    <LinkIcon className="h-3 w-3" />
                                                    {banner.link_url}
                                                </span>
                                            )}
                                            <span className="text-muted-foreground">
                                                Button: {banner.button_text_en || "Donate Now"}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="sm" variant="outline" className="bg-transparent text-destructive hover:text-destructive">
                                                        <Trash2 className="h-3 w-3 mr-1" />
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Banner</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this banner? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(banner.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
