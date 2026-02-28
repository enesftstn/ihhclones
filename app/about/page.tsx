"use client"

import { useLanguage } from "@/contexts/language-context"
import { Heart, Users, Globe, Award } from "lucide-react"

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "About Hope Relief Foundation",
      subtitle: "Bringing hope to those in need since 1995",
      mission: {
        title: "Our Mission",
        text: "Hope Relief Foundation is dedicated to providing humanitarian aid and support to vulnerable communities worldwide. We believe every person deserves access to basic necessities: clean water, food, healthcare, and education.",
      },
      vision: {
        title: "Our Vision",
        text: "A world where no one suffers from poverty, hunger, or lack of basic human rights. We strive to create sustainable solutions that empower communities to thrive independently.",
      },
      values: {
        title: "Our Values",
        items: [
          {
            icon: Heart,
            title: "Compassion",
            desc: "We treat everyone with dignity and respect, showing empathy in all our actions.",
          },
          {
            icon: Users,
            title: "Community",
            desc: "We work hand-in-hand with local communities to understand their needs.",
          },
          {
            icon: Globe,
            title: "Global Impact",
            desc: "We operate in 50+ countries, reaching millions of people every year.",
          },
          {
            icon: Award,
            title: "Transparency",
            desc: "We maintain the highest standards of accountability and ethical practices.",
          },
        ],
      },
      stats: {
        title: "Our Impact",
        items: [
          { number: "50+", label: "Countries Served" },
          { number: "2M+", label: "Lives Changed" },
          { number: "500+", label: "Active Volunteers" },
          { number: "1,000+", label: "Projects Completed" },
        ],
      },
      story: {
        title: "Our Story",
        text: "Founded in 1995, Hope Relief Foundation began as a small grassroots organization responding to a local crisis. Over the years, we've grown into a global humanitarian network, but our core mission remains unchanged: to provide immediate relief to those suffering and to build long-term solutions that create lasting change. Our teams work tirelessly in conflict zones, disaster areas, and impoverished communities, ensuring that help reaches those who need it most.",
      },
    },
    tr: {
      title: "Umut Yardım Vakfı Hakkında",
      subtitle: "1995'ten beri ihtiyaç sahiplerine umut getiriyoruz",
      mission: {
        title: "Misyonumuz",
        text: "Umut Yardım Vakfı, dünya çapında savunmasız topluluklara insani yardım ve destek sağlamaya kendini adamıştır. Her insanın temel gereksinimlere erişim hakkına sahip olduğuna inanıyoruz: temiz su, gıda, sağlık ve eğitim.",
      },
      vision: {
        title: "Vizyonumuz",
        text: "Hiç kimsenin yoksulluk, açlık veya temel insan haklarının eksikliğinden acı çekmediği bir dünya. Toplulukların bağımsız olarak gelişmesini sağlayan sürdürülebilir çözümler yaratmaya çalışıyoruz.",
      },
      values: {
        title: "Değerlerimiz",
        items: [
          {
            icon: Heart,
            title: "Merhamet",
            desc: "Herkese onur ve saygıyla davranır, tüm eylemlerimizde empati gösteririz.",
          },
          {
            icon: Users,
            title: "Topluluk",
            desc: "İhtiyaçlarını anlamak için yerel topluluklarla el ele çalışırız.",
          },
          {
            icon: Globe,
            title: "Küresel Etki",
            desc: "50'den fazla ülkede faaliyet gösteriyor, her yıl milyonlarca insana ulaşıyoruz.",
          },
          {
            icon: Award,
            title: "Şeffaflık",
            desc: "En yüksek hesap verebilirlik ve etik uygulama standartlarını koruyoruz.",
          },
        ],
      },
      stats: {
        title: "Etkimiz",
        items: [
          { number: "50+", label: "Hizmet Verilen Ülke" },
          { number: "2M+", label: "Değişen Hayat" },
          { number: "500+", label: "Aktif Gönüllü" },
          { number: "1,000+", label: "Tamamlanan Proje" },
        ],
      },
      story: {
        title: "Hikayemiz",
        text: "1995 yılında kurulan Umut Yardım Vakfı, yerel bir krize yanıt veren küçük bir kök organizasyon olarak başladı. Yıllar içinde küresel bir insani yardım ağına dönüştük, ancak temel misyonumuz değişmeden kaldı: acı çekenlere acil yardım sağlamak ve kalıcı değişim yaratan uzun vadeli çözümler inşa etmek. Ekiplerimiz çatışma bölgelerinde, afet alanlarında ve yoksul topluluklarda yorulmadan çalışarak yardımın en çok ihtiyaç duyanlara ulaşmasını sağlıyor.",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-accent/20 to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t.mission.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.mission.text}</p>
          </div>
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t.vision.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.vision.text}</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.values.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {t.values.items.map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="bg-card p-6 rounded-lg border text-center">
                  <Icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.stats.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {t.stats.items.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t.story.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.story.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
