"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Heart, GraduationCap, Users, AlertTriangle, Megaphone, Shield, Sprout } from "lucide-react"

export default function MissionPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Our Mission",
      subtitle: "Bringing hope and aid to people in need",
      missionIntro: "As Ahde Vefa Social Solidarity and Assistance Association, our mission is to carry out effective, planned, and sustainable activities in order to improve the living conditions of individuals and families in need, support social justice, and create a lasting culture of solidarity in society.",
      missionAreas: {
        title: "In this direction;",
        items: [
          {
            icon: Heart,
            title: "Basic Humanitarian Aid",
            desc: "Providing support for basic needs such as food, clothing, shelter, and healthcare.",
          },
          {
            icon: GraduationCap,
            title: "Education and Future Support",
            desc: "Offering scholarship opportunities to students, providing educational materials, and developing projects that contribute to the future of young people.",
          },
          {
            icon: Users,
            title: "Social Responsibility Projects",
            desc: "Carrying out activities aimed at improving the living standards of orphans, the elderly, and disadvantaged individuals.",
          },
          {
            icon: AlertTriangle,
            title: "Emergency Aid and Crisis Management",
            desc: "Conducting fast, organized, and effective aid efforts in natural disasters, wars, and extraordinary situations.",
          },
          {
            icon: Megaphone,
            title: "Social Solidarity and Awareness",
            desc: "Spreading the culture of helping and sharing, increasing volunteer awareness, and creating social awareness.",
          },
          {
            icon: Shield,
            title: "Transparency and Trust",
            desc: "Adopting an accountable and reliable management approach by evaluating the donations entrusted by donors in the most accurate way.",
          },
          {
            icon: Sprout,
            title: "Sustainable Development Approach",
            desc: "Contributing to individuals being able to stand on their own feet by producing permanent solutions, not just instant aid.",
          },
        ],
      },
      conclusion: "With our human-centered, value-oriented, and solution-producing approach, we aim to grow goodness, multiply hope, and leave a lasting impact on society.",
    },
    tr: {
      title: "Misyonumuz",
      subtitle: "İhtiyaç içindeki insanlara umut ve yardım götürmek",
      missionIntro: "Ahde Vefa Sosyal Yardımlaşma ve Dayanışma Derneği olarak misyonumuz; ihtiyaç sahibi birey ve ailelerin yaşam koşullarını iyileştirmek, sosyal adaleti desteklemek ve toplumda kalıcı bir dayanışma kültürü oluşturmak amacıyla etkin, planlı ve sürdürülebilir çalışmalar yürütmektir.",
      missionAreas: {
        title: "Bu doğrultuda;",
        items: [
          {
            icon: Heart,
            title: "Temel İnsani Yardımlar",
            desc: "Gıda, giyim, barınma ve sağlık gibi temel ihtiyaçların karşılanmasına yönelik destekler sağlamak.",
          },
          {
            icon: GraduationCap,
            title: "Eğitim ve Gelecek Destekleri",
            desc: "Öğrencilere burs imkânı sunmak, eğitim materyalleri temin etmek ve gençlerin geleceğine katkı sağlayacak projeler geliştirmek.",
          },
          {
            icon: Users,
            title: "Sosyal Sorumluluk Projeleri",
            desc: "Yetim, öksüz, yaşlı ve dezavantajlı bireylerin hayat standartlarını yükseltmeye yönelik faaliyetler gerçekleştirmek.",
          },
          {
            icon: AlertTriangle,
            title: "Acil Yardım ve Kriz Yönetimi",
            desc: "Doğal afetler, savaşlar ve olağanüstü durumlarda hızlı, organize ve etkili yardım çalışmaları yürütmek.",
          },
          {
            icon: Megaphone,
            title: "Toplumsal Dayanışma ve Bilinçlendirme",
            desc: "Yardımlaşma ve paylaşma kültürünü yaygınlaştırmak, gönüllülük bilincini artırmak ve toplumsal farkındalık oluşturmak.",
          },
          {
            icon: Shield,
            title: "Şeffaflık ve Güven",
            desc: "Bağışçıların emanetlerini en doğru şekilde değerlendirerek, hesap verebilir ve güvenilir bir yönetim anlayışı benimsemek.",
          },
          {
            icon: Sprout,
            title: "Sürdürülebilir Kalkınma Yaklaşımı",
            desc: "Sadece anlık yardımlar değil, kalıcı çözümler üreterek bireylerin kendi ayakları üzerinde durabilmelerine katkı sağlamak.",
          },
        ],
      },
      conclusion: "İnsanı merkeze alan, değer odaklı ve çözüm üreten yaklaşımımızla; iyiliği büyütmeyi, umudu çoğaltmayı ve toplumda kalıcı bir etki bırakmayı amaçlıyoruz.",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">{t.title}</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">{t.subtitle}</p>
        </div>
      </div>

      {/* Mission Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">{t.missionIntro}</p>
        </div>
      </div>

      {/* Mission Areas */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">{t.missionAreas.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {t.missionAreas.items.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <Icon className="mb-4 h-10 w-10 text-accent" />
                    <h3 className="mb-2 text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-foreground font-medium leading-relaxed">{t.conclusion}</p>
        </div>
      </div>
    </div>
  )
}
