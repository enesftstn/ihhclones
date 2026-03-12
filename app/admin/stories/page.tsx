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
import { Plus, Trash2, ArrowLeft, Loader2, RefreshCw, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface ImpactStory {
    id: number
    name_en: string
    name_tr: string
    story_en: string
    story_tr: string
    location_en: string
    location_tr: string
    image_url: string
    year: number
    created_at: string
}

export default function AdminStoriesPage() {
    const [stories, setStories] = useState<ImpactStory[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        nameEn: "",
        nameTr: "",
        storyEn: "",
        storyTr: "",
        locationEn: "",
        locationTr: "",
        imageUrl: "",
        year: new Date().getFullYear().toString(),
    })

    useEffect(() => {
        fetchStories()
    }, [])

    const fetchStories = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/impact-stories")
            const data = await res.json()
            setStories(data.stories || [])
        } catch (error) {
            console.error("[v0] Error fetching stories:", error)
            toast.error("Failed to load stories")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/impact-stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success("Impact story created successfully")
                setIsDialogOpen(false)
                fetchStories()
                setFormData({
                    nameEn: "",
                    nameTr: "",
                    storyEn: "",
                    storyTr: "",
                    locationEn: "",
                    locationTr: "",
                    imageUrl: "",
                    year: new Date().getFullYear().toString(),
                })
            } else {
                const data = await res.json()
                toast.error(data.error || "Failed to create story")
            }
        } catch (error) {
            console.error("[v0] Error creating story:", error)
            toast.error("Failed to create story")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/impact-stories?id=${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                toast.success("Story deleted successfully")
                fetchStories()
            } else {
                toast.error("Failed to delete story")
            }
        } catch (error) {
            console.error("[v0] Error deleting story:", error)
            toast.error("Failed to delete story")
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
                        <h1 className="text-3xl font-bold">Impact Stories</h1>
                        <p className="text-muted-foreground mt-1">Share success stories and testimonials</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={fetchStories}>
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Story
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Add Impact Story</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nameEn">Name (English) *</Label>
                                            <Input
                                                id="nameEn"
                                                value={formData.nameEn}
                                                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                                placeholder="Person's name or title"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="nameTr">Name (Turkish) *</Label>
                                            <Input
                                                id="nameTr"
                                                value={formData.nameTr}
                                                onChange={(e) => setFormData({ ...formData, nameTr: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="storyEn">Story (English)</Label>
                                        <Textarea
                                            id="storyEn"
                                            value={formData.storyEn}
                                            onChange={(e) => setFormData({ ...formData, storyEn: e.target.value })}
                                            rows={4}
                                            placeholder="Share the impact story..."
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="storyTr">Story (Turkish)</Label>
                                        <Textarea
                                            id="storyTr"
                                            value={formData.storyTr}
                                            onChange={(e) => setFormData({ ...formData, storyTr: e.target.value })}
                                            rows={4}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="locationEn">Location (English)</Label>
                                            <Input
                                                id="locationEn"
                                                value={formData.locationEn}
                                                onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
                                                placeholder="e.g., Gaza, Palestine"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="locationTr">Location (Turkish)</Label>
                                            <Input
                                                id="locationTr"
                                                value={formData.locationTr}
                                                onChange={(e) => setFormData({ ...formData, locationTr: e.target.value })}
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
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="year">Year</Label>
                                            <Input
                                                id="year"
                                                type="number"
                                                value={formData.year}
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                            Add Story
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
                ) : stories.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground mb-4">No impact stories found</p>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Story
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stories.map((story) => (
                            <Card key={story.id} className="overflow-hidden">
                                {story.image_url && (
                                    <div className="h-40 relative">
                                        <img
                                            src={story.image_url}
                                            alt={story.name_en}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-lg">{story.name_en}</CardTitle>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        {story.location_en && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {story.location_en}
                                            </span>
                                        )}
                                        {story.year && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {story.year}
                                            </span>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground line-clamp-3">{story.story_en}</p>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="outline" className="w-full bg-transparent text-destructive hover:text-destructive">
                                                    <Trash2 className="h-3 w-3 mr-1" />
                                                    Delete Story
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Story</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete "{story.name_en}"? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(story.id)}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
