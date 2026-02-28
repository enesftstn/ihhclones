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

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    titleEn: "",
    titleTr: "",
    descriptionEn: "",
    descriptionTr: "",
    shortDescriptionEn: "",
    shortDescriptionTr: "",
    imageUrl: "",
    goalAmount: "",
    isFeatured: false,
    isUrgent: false,
    slug: "",
  })

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns")
      const data = await res.json()
      setCampaigns(data.campaigns || [])
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsDialogOpen(false)
        fetchCampaigns()
        // Reset form
        setFormData({
          titleEn: "",
          titleTr: "",
          descriptionEn: "",
          descriptionTr: "",
          shortDescriptionEn: "",
          shortDescriptionTr: "",
          imageUrl: "",
          goalAmount: "",
          isFeatured: false,
          isUrgent: false,
          slug: "",
        })
      }
    } catch (error) {
      console.error("[v0] Error creating campaign:", error)
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
          </div>
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
                  <Label htmlFor="descriptionEn">Description (English)</Label>
                  <Textarea
                    id="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="descriptionTr">Description (Turkish)</Label>
                  <Textarea
                    id="descriptionTr"
                    value={formData.descriptionTr}
                    onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                    rows={4}
                    required
                  />
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
                    <Label htmlFor="goalAmount">Goal Amount ($)</Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      value={formData.goalAmount}
                      onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., palestine-relief"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded"
                    />
                    <span>Featured</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isUrgent}
                      onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                      className="rounded"
                    />
                    <span>Urgent</span>
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Create Campaign
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign: any) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle className="text-lg">{campaign.title_en}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{campaign.short_description_en}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>Goal: ${campaign.goal_amount}</span>
                    <span>Raised: ${campaign.raised_amount}</span>
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
