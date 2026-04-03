"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error("[v0] Error submitting contact form:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with our team - we're here to help",
      form: {
        title: "Send Us a Message",
        name: "Full Name",
        namePlaceholder: "John Doe",
        email: "Email Address",
        emailPlaceholder: "john@example.com",
        phone: "Phone Number",
        phonePlaceholder: "+90 5xx xxx xx xx",
        subject: "Subject",
        subjectPlaceholder: "How can we help you?",
        message: "Message",
        messagePlaceholder: "Write your message here...",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully! We'll get back to you soon.",
      },
      info: {
        title: "Contact Information",
        email: {
          label: "Email",
          value: "-----------------",
        },
        phone: {
          label: "Phone",
          value: "+90 507 880 06 41",
        },
        address: {
          label: "Address",
          value: "Doğan, 6. Sk. No:1, 41100 İzmit/Kocaeli",
        },
        hours: {
          label: "Office Hours",
          value: "Monday - Friday: 9:00 AM - 6:00 PM EST",
        },
      },
      offices: {
        title: "Our Offices",
        list: [
          {
            city: "Kocaeli",
            country: "Turkey",
            address: "Doğan, 6. Sk. No:1, 41100 İzmit/Kocaeli",
            phone: "+90 507 880 06 41",
          },
        ],
      },
    },
    tr: {
      title: "İletişim",
      subtitle: "Ekibimizle iletişime geçin - size yardımcı olmak için buradayız",
      form: {
        title: "Bize Mesaj Gönderin",
        name: "Ad Soyad",
        namePlaceholder: "Ahmet Yılmaz",
        email: "E-posta Adresi",
        emailPlaceholder: "ahmet@ornek.com",
        phone: "Telefon Numarası",
        phonePlaceholder: "+90 (212) 123-4567",
        subject: "Konu",
        subjectPlaceholder: "Size nasıl yardımcı olabiliriz?",
        message: "Mesaj",
        messagePlaceholder: "Mesajınızı buraya yazın...",
        submit: "Mesaj Gönder",
        submitting: "Gönderiliyor...",
        success: "Mesaj başarıyla gönderildi! Yakında size döneceğiz.",
      },
      info: {
        title: "İletişim Bilgileri",
        email: {
          label: "E-posta",
          value: "------------------------",
        },
        phone: {
          label: "Telefon",
          value: "+90 507 880 06 41",
        },
        address: {
          label: "Adres",
          value: "Doğan, 6. Sk. No:1, 41100 İzmit/Kocaeli",
        },
        hours: {
          label: "Çalışma Saatleri",
          value: "Pazartesi - Cuma: 09:00 - 18:00",
        },
      },
      offices: {
        title: "Ofislerimiz",
        list: [
          {
            city: "Kocaeli",
            country: "Türkiye",
            address: "Doğan, 6. Sk. No:1, 41100 İzmit/Kocaeli",
            phone: "+90 507 880 06 41",
          },
        ],
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.form.title}</h2>
              {submitSuccess && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg text-primary">
                  {t.form.success}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t.form.name}</label>
                    <Input
                      placeholder={t.form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t.form.email}</label>
                    <Input
                      type="email"
                      placeholder={t.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">{t.form.phone}</label>
                  <Input
                    type="tel"
                    placeholder={t.form.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">{t.form.subject}</label>
                  <Input
                    placeholder={t.form.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">{t.form.message}</label>
                  <Textarea
                    placeholder={t.form.messagePlaceholder}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={submitting}>
                  {submitting ? t.form.submitting : t.form.submit}
                </Button>
              </form>
              {/* </CHANGE> */}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold text-foreground mb-4">{t.info.title}</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.info.email.label}</div>
                    <div className="text-sm text-muted-foreground">{t.info.email.value}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.info.phone.label}</div>
                    <div className="text-sm text-muted-foreground">{t.info.phone.value}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.info.address.label}</div>
                    <div className="text-sm text-muted-foreground">{t.info.address.value}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.info.hours.label}</div>
                    <div className="text-sm text-muted-foreground">{t.info.hours.value}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold text-foreground mb-4">{t.offices.title}</h3>
              <div className="space-y-4">
                {t.offices.list.map((office, idx) => (
                  <div key={idx} className="pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="font-medium text-foreground">
                      {office.city}, {office.country}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{office.address}</div>
                    <div className="text-sm text-muted-foreground">{office.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
