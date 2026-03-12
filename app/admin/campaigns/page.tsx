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
import { Plus, Edit, Trash2, ArrowLeft, Loader2, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"

interface Campaign {
    id: number
    title_en: string
    title_tr: string
    description_en: string
    description_tr: string
    target_amount: string
    current_amount: string
    image_url: string
    category: string
    is_active: boolean
    created_at: string
}

export default function AdminCampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        titleEn: "",
        titleTr: "",
        descriptionEn: "",
        descriptionTr: "",
        imageUrl: "",
        targetAmount: "",
        category: "",
    })

    useEffect(() => {
        fetchCampaigns()
    }, [])

    const fetchCampaigns = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/campaigns")
            const data = await res.json()
            setCampaigns(data.campaigns || [])
        } catch (error) {
            console.error("[v0] Error fetching campaigns:", error)
            toast.error("Failed to load campaigns")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/campaigns", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success("Campaign created successfully")
                setIsDialogOpen(false)
                fetchCampaigns()
                setFormData({
                    titleEn: "",
                    titleTr: "",
                    descriptionEn: "",
                    descriptionTr: "",
                    imageUrl: "",
                    targetAmount: "",
                    category: "",
                })
            } else {
                const data = await res.json()
                toast.error(data.error || "Failed to create campaign")
            }
        } catch (error) {
            console.error("[v0] Error creating campaign:", error)
            toast.error("Failed to create campaign")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/campaigns?id=${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                toast.success("Campaign deleted successfully")
                fetchCampaigns()
            } else {
                toast.error("Failed to delete campaign")
            }
        } catch (error) {
            console.error("[v0] Error deleting campaign:", error)
            toast.error("Failed to delete campaign")
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
                        <h1 className="text-3xl font-bold">Manage Campaigns</h1>
                        <p className="text-muted-foreground mt-1">Create and manage fundraising campaigns</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={fetchCampaigns}>
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Campaign
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Create New Campaign</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="titleEn">Title (English) *</Label>
                                            <Input
                                                id="titleEn"
                                                value={formData.titleEn}
                                                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
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

                                    <div>
                                        <Label htmlFor="descriptionEn">Description (English)</Label>
                                        <Textarea
                                            id="descriptionEn"
                                            value={formData.descriptionEn}
                                            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                            rows={4}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="descriptionTr">Description (Turkish)</Label>
                                        <Textarea
                                            id="descriptionTr"
                                            value={formData.descriptionTr}
                                            onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                                            rows={4}
                                        />
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
                                            <Label htmlFor="targetAmount">Target Amount ($)</Label>
                                            <Input
                                                id="targetAmount"
                                                type="number"
                                                value={formData.targetAmount}
                                                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Input
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            placeholder="e.g., Emergency, Education, Health"
                                        />
                                    </div>

                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                            Create Campaign
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
                ) : campaigns.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground mb-4">No campaigns found</p>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Campaign
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map((campaign) => {
                            const targetAmount = parseFloat(campaign.target_amount || "0")
                            const currentAmount = parseFloat(campaign.current_amount || "0")
                            const percentage = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0

                            return (
                                <Card key={campaign.id} className="overflow-hidden">
                                    {campaign.image_url && (
                                        <div className="h-40 relative">
                                            <img
                                                src={campaign.image_url}
                                                alt={campaign.title_en}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-lg">{campaign.title_en}</CardTitle>
                                        {campaign.category && (
                                            <span className="inline-block text-xs uppercase bg-accent/10 text-accent px-2 py-0.5 rounded w-fit">
                                                {campaign.category}
                                            </span>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description_en}</p>

                                            {targetAmount > 0 && (
                                                <div className="space-y-2">
                                                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">${currentAmount.toLocaleString()} raised</span>
                                                        <span className="font-medium">${targetAmount.toLocaleString()} goal</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    Edit
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button size="sm" variant="outline" className="flex-1 bg-transparent text-destructive hover:text-destructive">
                                                            <Trash2 className="h-3 w-3 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{campaign.title_en}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(campaign.id)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
