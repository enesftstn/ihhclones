"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Heart, Users, Megaphone, Building } from "lucide-react"

export default function GetInvolvedPage() {
  const { language } = useLanguage()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    skills: [] as string[],
    availability: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          skills: [],
          availability: "",
          message: "",
        })
        setTimeout(() => {
          setSubmitSuccess(false)
          setIsDialogOpen(false)
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Error submitting volunteer form:", error)
    } finally {
      setSubmitting(false)
    }
  }
  // </CHANGE>

  const content = {
    en: {
      title: "Get Involved",
      subtitle: "Join us in making a difference - there are many ways to help",
      ways: [
        {
          icon: Heart,
          title: "Become a Donor",
          desc: "Your financial support directly helps families in need. Set up a one-time or monthly donation to provide consistent support.",
          action: "Start Donating",
        },
        {
          icon: Users,
          title: "Volunteer",
          desc: "Join our team of dedicated volunteers working on the ground or remotely. Share your skills and time to make an impact.",
          action: "Apply to Volunteer",
        },
        {
          icon: Megaphone,
          title: "Fundraise",
          desc: "Start your own fundraising campaign for Hope Relief. Engage your community and help us reach more people in need.",
          action: "Start a Campaign",
        },
        {
          icon: Building,
          title: "Corporate Partnership",
          desc: "Partner with us through corporate sponsorships, employee giving programs, or cause marketing initiatives.",
          action: "Partner With Us",
        },
      ],
      volunteer: {
        title: "Volunteer Opportunities",
        form: {
          title: "Volunteer Application",
          name: "Full Name",
          email: "Email Address",
          phone: "Phone Number",
          country: "Country",
          city: "City",
          skills: "Skills / Expertise",
          availability: "Availability",
          message: "Why do you want to volunteer?",
          submit: "Submit Application",
          submitting: "Submitting...",
          success: "Application submitted successfully!",
        },
        positions: [
          {
            title: "Field Workers",
            location: "Various Countries",
            desc: "Work directly in our project areas delivering aid and managing programs.",
          },
          {
            title: "Medical Professionals",
            location: "Crisis Zones",
            desc: "Provide healthcare services in our mobile clinics and emergency response teams.",
          },
          {
            title: "Content Creators",
            location: "Remote",
            desc: "Help document our work through photography, videography, and writing.",
          },
          {
            title: "Social Media Managers",
            location: "Remote",
            desc: "Manage our social media presence and engage with supporters online.",
          },
          {
            title: "Grant Writers",
            location: "Remote",
            desc: "Research and write grant proposals to secure funding for our projects.",
          },
          {
            title: "Translators",
            location: "Remote",
            desc: "Translate materials and communications for our multilingual operations.",
          },
        ],
      },
    },
    tr: {
      title: "Dahil Olun",
      subtitle: "Fark yaratmak için bize katılın - yardım etmenin birçok yolu var",
      ways: [
        {
          icon: Heart,
          title: "Bağışçı Olun",
          desc: "Mali desteğiniz ihtiyaç sahibi ailelere doğrudan yardımcı oluyor. Tutarlı destek sağlamak için tek seferlik veya aylık bağış ayarlayın.",
          action: "Bağış Yapmaya Başlayın",
        },
        {
          icon: Users,
          title: "Gönüllü Olun",
          desc: "Sahada veya uzaktan çalışan özveri dolu gönüllüler ekibimize katılın. Becerilerinizi ve zamanınızı paylaşarak etki yaratın.",
          action: "Gönüllü Başvurusu",
        },
        {
          icon: Megaphone,
          title: "Bağış Toplayın",
          desc: "Umut Yardım için kendi bağış kampanyanızı başlatın. Topluluğunuzu dahil edin ve daha fazla ihtiyaç sahibine ulaşmamıza yardımcı olun.",
          action: "Kampanya Başlat",
        },
        {
          icon: Building,
          title: "Kurumsal Ortaklık",
          desc: "Kurumsal sponsorluklar, çalışan bağış programları veya neden pazarlama girişimleri yoluyla ortağımız olun.",
          action: "Ortak Olun",
        },
      ],
      volunteer: {
        title: "Gönüllülük Fırsatları",
        form: {
          title: "Gönüllü Başvurusu",
          name: "Ad Soyad",
          email: "E-posta Adresi",
          phone: "Telefon Numarası",
          country: "Ülke",
          city: "Şehir",
          skills: "Beceriler / Uzmanlık",
          availability: "Müsaitlik",
          message: "Neden gönüllü olmak istiyorsunuz?",
          submit: "Başvuruyu Gönder",
          submitting: "Gönderiliyor...",
          success: "Başvuru başarıyla gönderildi!",
        },
        positions: [
          {
            title: "Saha Çalışanları",
            location: "Çeşitli Ülkeler",
            desc: "Proje alanlarımızda doğrudan yardım dağıtımı ve program yönetimi yapın.",
          },
          {
            title: "Tıbbi Profesyoneller",
            location: "Kriz Bölgeleri",
            desc: "Mobil kliniklerimizde ve acil müdahale ekiplerimizde sağlık hizmeti sağlayın.",
          },
          {
            title: "İçerik Üreticiler",
            location: "Uzaktan",
            desc: "Fotoğrafçılık, videografi ve yazı yoluyla çalışmalarımızı belgelemeye yardımcı olun.",
          },
          {
            title: "Sosyal Medya Yöneticileri",
            location: "Uzaktan",
            desc: "Sosyal medya varlığımızı yönetin ve çevrimiçi destekçilerle etkileşim kurun.",
          },
          {
            title: "Hibe Yazarları",
            location: "Uzaktan",
            desc: "Projelerimiz için fon sağlamak üzere hibe teklifleri araştırın ve yazın.",
          },
          {
            title: "Çevirmenler",
            location: "Uzaktan",
            desc: "Çok dilli operasyonlarımız için materyalleri ve iletişimi çevirin.",
          },
        ],
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-accent/20 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Ways to Help */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {t.ways.map((way, idx) => {
            const Icon = way.icon
            return (
              <div key={idx} className="bg-card p-8 rounded-lg border hover:border-accent transition-colors">
                <Icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">{way.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{way.desc}</p>
                {idx === 1 ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent hover:bg-accent/90">{way.action}</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{t.volunteer.form.title}</DialogTitle>
                      </DialogHeader>
                      {submitSuccess && (
                        <div className="p-4 bg-primary/10 border border-primary rounded-lg text-primary">
                          {t.volunteer.form.success}
                        </div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">{t.volunteer.form.name}</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">{t.volunteer.form.email}</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">{t.volunteer.form.phone}</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="country">{t.volunteer.form.country}</Label>
                            <Input
                              id="country"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">{t.volunteer.form.city}</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="availability">{t.volunteer.form.availability}</Label>
                          <Input
                            id="availability"
                            value={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            placeholder="e.g., Weekends, Full-time"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">{t.volunteer.form.message}</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? t.volunteer.form.submitting : t.volunteer.form.submit}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="bg-accent hover:bg-accent/90">{way.action}</Button>
                )}
                {/* </CHANGE> */}
              </div>
            )
          })}
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.volunteer.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.volunteer.positions.map((position, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-bold text-foreground mb-2">{position.title}</h3>
                <p className="text-sm text-accent mb-3">{position.location}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{position.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
