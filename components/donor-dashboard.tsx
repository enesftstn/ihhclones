"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Download, Calendar, DollarSign, Award, Settings } from "lucide-react"
import { format } from "date-fns"

interface DonorProfile {
  email: string
  full_name: string
  phone: string
  country: string
  preferred_language: string
  is_anonymous: boolean
  total_donated: number
  donation_count: number
  recurring_donations_active: number
  last_donation_date: string
}

interface Donation {
  id: number
  product_id: string
  amount: number
  currency: string
  is_recurring: boolean
  created_at: string
  status: string
}

interface Certificate {
  id: number
  certificate_type: string
  certificate_url: string
  amount: number
  issued_date: string
}

export function DonorDashboard() {
  const { language } = useLanguage()
  const [donorEmail, setDonorEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState<DonorProfile | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: "",
    phone: "",
    country: "",
    is_anonymous: false,
  })

  const handleLogin = async () => {
    if (!donorEmail || !donorEmail.includes("@")) {
      alert(language === "tr" ? "Geçerli bir e-posta adresi girin" : "Enter a valid email address")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/donor/profile?email=${encodeURIComponent(donorEmail)}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setDonations(data.donations)
        setCertificates(data.certificates)
        setEditForm({
          full_name: data.profile.full_name || "",
          phone: data.profile.phone || "",
          country: data.profile.country || "",
          is_anonymous: data.profile.is_anonymous || false,
        })
        setIsLoggedIn(true)
      } else {
        alert(language === "tr" ? "Profil bulunamadı" : "Profile not found")
      }
    } catch (error) {
      console.error("[v0] Error logging in:", error)
      alert(language === "tr" ? "Giriş başarısız" : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/donor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: donorEmail,
          ...editForm,
        }),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setIsEditing(false)
        alert(language === "tr" ? "Profil güncellendi" : "Profile updated")
      }
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      alert(language === "tr" ? "Güncelleme başarısız" : "Update failed")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
            <CardTitle className="text-2xl">{language === "tr" ? "Bağışçı Paneli" : "Donor Dashboard"}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {language === "tr"
                ? "Bağış geçmişinizi görüntülemek için e-posta adresinizle giriş yapın"
                : "Login with your email to view your donation history"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="donor-email">{language === "tr" ? "E-posta Adresi" : "Email Address"}</Label>
              <Input
                id="donor-email"
                type="email"
                placeholder={language === "tr" ? "ornek@email.com" : "example@email.com"}
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="mt-2"
              />
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading
                ? language === "tr"
                  ? "Yükleniyor..."
                  : "Loading..."
                : language === "tr"
                  ? "Giriş Yap"
                  : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === "tr" ? "Hoş Geldiniz" : "Welcome"}, {profile?.full_name || profile?.email}!
          </h1>
          <p className="text-muted-foreground">
            {language === "tr" ? "Bağış geçmişiniz ve profiliniz" : "Your donation history and profile"}
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
          {language === "tr" ? "Çıkış Yap" : "Logout"}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">${((profile?.total_donated || 0) / 100).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{language === "tr" ? "Toplam Bağış" : "Total Donated"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile?.donation_count || 0}</p>
                <p className="text-sm text-muted-foreground">{language === "tr" ? "Bağış Sayısı" : "Donations"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile?.recurring_donations_active || 0}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "tr" ? "Aylık Bağışlar" : "Monthly Gifts"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-3 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{certificates.length}</p>
                <p className="text-sm text-muted-foreground">{language === "tr" ? "Sertifikalar" : "Certificates"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="donations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="donations">{language === "tr" ? "Bağışlar" : "Donations"}</TabsTrigger>
          <TabsTrigger value="certificates">{language === "tr" ? "Sertifikalar" : "Certificates"}</TabsTrigger>
          <TabsTrigger value="profile">{language === "tr" ? "Profil" : "Profile"}</TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "tr" ? "Bağış Geçmişi" : "Donation History"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {donations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">${(donation.amount / 100).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        {donation.product_id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(new Date(donation.created_at), "MMM dd, yyyy")}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {donation.is_recurring && (
                        <Badge variant="secondary">{language === "tr" ? "Aylık" : "Monthly"}</Badge>
                      )}
                      <Badge className="capitalize">{donation.status}</Badge>
                    </div>
                  </div>
                ))}
                {donations.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    {language === "tr" ? "Henüz bağış yapılmamış" : "No donations yet"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "tr" ? "Sertifikalar ve Makbuzlar" : "Certificates & Receipts"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold capitalize">{cert.certificate_type.replace(/_/g, " ")}</div>
                      <div className="text-sm text-muted-foreground">${(cert.amount / 100).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(new Date(cert.issued_date), "MMM dd, yyyy")}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={cert.certificate_url} download>
                        <Download className="h-4 w-4 mr-2" />
                        {language === "tr" ? "İndir" : "Download"}
                      </a>
                    </Button>
                  </div>
                ))}
                {certificates.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    {language === "tr" ? "Sertifika bulunmuyor" : "No certificates available"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>{language === "tr" ? "Profil Bilgileri" : "Profile Information"}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (isEditing ? handleUpdateProfile() : setIsEditing(true))}
                disabled={loading}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? (language === "tr" ? "Kaydet" : "Save") : language === "tr" ? "Düzenle" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{language === "tr" ? "E-posta" : "Email"}</Label>
                <Input value={profile?.email} disabled className="mt-2" />
              </div>

              <div>
                <Label htmlFor="full_name">{language === "tr" ? "Ad Soyad" : "Full Name"}</Label>
                <Input
                  id="full_name"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">{language === "tr" ? "Telefon" : "Phone"}</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="country">{language === "tr" ? "Ülke" : "Country"}</Label>
                <Input
                  id="country"
                  value={editForm.country}
                  onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_anonymous"
                  checked={editForm.is_anonymous}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, is_anonymous: checked as boolean })}
                  disabled={!isEditing}
                />
                <Label htmlFor="is_anonymous" className="cursor-pointer">
                  {language === "tr" ? "Anonim bağışçı olarak görün" : "Appear as anonymous donor"}
                </Label>
              </div>

              {isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                  {language === "tr" ? "İptal" : "Cancel"}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
