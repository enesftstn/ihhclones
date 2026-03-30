"use client"

import { useLanguage } from "@/contexts/language-context"
import { Heart, Users, Shield, Leaf, HandHeart } from "lucide-react"

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "About Ahde Vefa",
      subtitle: "Social Solidarity and Assistance Association",
      aboutUs: {
        title: "About Us",
        text: "Ahde Vefa Social Solidarity and Assistance Association is a non-governmental organization established to strengthen social solidarity, bring hope to those in need, and spread the culture of mutual assistance. Since our establishment, we have been carrying out our activities with an understanding that puts human dignity at the center, based on the values of justice, compassion, and sharing. We aim to reach people in need in different segments of society, touch their lives, and improve their living conditions.",
        text2: "Our association carries out work to meet basic human needs, especially food, clothing, shelter, education, and healthcare, and stands by orphans, the elderly, and disadvantaged individuals. At the same time, it aims to produce permanent solutions through social responsibility projects, educational support, and awareness activities.",
        text3: "We care about developing sustainable projects that help individuals stand on their own feet, not just providing instant aid. In this direction, we act as a reliable bridge between our donors and those in need, with a transparent, accountable, and effective management approach.",
      },
      vision: {
        title: "Our Vision",
        text: "As Ahde Vefa Social Solidarity and Assistance Association, our vision is to be a pioneering and exemplary civil society organization that acts in accordance with the principles of justice, compassion, and solidarity, based on human dignity, and contributes to increasing social welfare.",
        text2: "We aim to become a structure that takes the goodness movement we started at the local level to national and international platforms, develops an effective, transparent, and sustainable model in reaching those in need, makes a difference with social responsibility projects, and stands out with its reliability and respectability.",
        text3: "We act with an understanding that encompasses all segments of society, spreads the culture of mutual assistance without discrimination, increases volunteer awareness, and aims to leave a more livable world for future generations.",
      },
      values: {
        title: "Our Values",
        items: [
          {
            icon: Heart,
            title: "Human-Centeredness",
            desc: "We believe that every individual has the right to a dignified life.",
          },
          {
            icon: Shield,
            title: "Transparency and Trust",
            desc: "We are open, honest, and accountable in all our activities.",
          },
          {
            icon: Users,
            title: "Solidarity",
            desc: "We create a stronger society by acting together.",
          },
          {
            icon: Leaf,
            title: "Sustainability",
            desc: "We aim to produce permanent and effective solutions.",
          },
          {
            icon: HandHeart,
            title: "Volunteerism",
            desc: "We believe in the power of volunteers in spreading goodness.",
          },
        ],
      },
      stats: {
        title: "Our Impact",
        items: [
          { number: "1000+", label: "Families Supported" },
          { number: "500+", label: "Lives Changed" },
          { number: "100+", label: "Active Volunteers" },
          { number: "50+", label: "Projects Completed" },
        ],
      },
    },
    tr: {
      title: "Ahde Vefa Hakkinda",
      subtitle: "Sosyal Yardimlasma ve Dayanisma Dernegi",
      aboutUs: {
        title: "Hakkimizda",
        text: "Ahde Vefa Sosyal Yardimlasma ve Dayanisma Dernegi, toplumsal dayanismayi guclendirmek, ihtiyac sahiplerine umut olmak ve yardimlasma kulturunu yayginlastirmak amaciyla kurulmus bir sivil toplum kurulusudur. Kurdugumuz gunden bu yana; insan onurunu esas alan, adalet, merhamet ve paylasma degerlerini merkezine koyan bir anlayisla faaliyetlerimizi surdurmekteyiz. Toplumun farkli kesimlerinde yasayan ihtiyac sahiplerine ulasarak, onlarin hayatlarina dokunmayi ve yasam kosullarini iyilestirmeyi hedefliyoruz.",
        text2: "Dernegimiz; gida, giyim, barinma, egitim ve saglik basta olmak uzere temel insani ihtiyaclarin karsilanmasina yonelik calismalar yurutmekte, yetim, oksuz, yasli ve dezavantajli bireylerin yaninda olmaktadir. Ayni zamanda sosyal sorumluluk projeleri, egitim destekleri ve farkindalik calismalari ile kalici cozumler uretmeyi amaclamaktadir.",
        text3: "Sadece anlik yardimlar sunmakla kalmayip, surdurulebilir projeler gelistirerek bireylerin kendi ayaklari uzerinde durabilmelerine katki saglamayi onemsiyoruz. Bu dogrultuda, bagisclarimiz ile ihtiyac sahipleri arasinda guvenilir bir kopru gorevi ustleniyor; seffaf, hesap verebilir ve etkin bir yonetim anlayisi ile hareket ediyoruz.",
      },
      vision: {
        title: "Vizyonumuz",
        text: "Ahde Vefa Sosyal Yardimlasma ve Dayanisma Dernegi olarak vizyonumuz; insan onurunu esas alan, adalet, merhamet ve dayanisma ilkeleri dogrultusunda hareket eden, toplumsal refahin artirilmasina katki saglayan oncu ve ornek bir sivil toplum kurulusu olmaktir.",
        text2: "Yerel duzeyde baslattigimiz iyilik hareketini ulusal ve uluslararasi platformlara tasiyarak; ihtiyac sahiplerine ulasmada etkin, seffaf ve surdurulebilir bir model gelistiren, sosyal sorumluluk projeleriyle fark olusturan, guvenirliligi ve sayginligi ile one cikan bir yapi haline gelmeyi hedefliyoruz.",
        text3: "Toplumun her kesimini kapsayan, ayrim gozetmeksizin yardimlasma kulturunu yayginlastiran, gonulluluk bilincini artiran ve gelecek nesillere daha yasanabilir bir dunya birakmayi amaclayan bir anlayisla hareket ediyoruz.",
      },
      values: {
        title: "Degerlerimiz",
        items: [
          {
            icon: Heart,
            title: "Insan Odaklilik",
            desc: "Her bireyin onurlu bir yasam hakkina sahip olduguna inaniriz.",
          },
          {
            icon: Shield,
            title: "Seffaflik ve Guven",
            desc: "Tum faaliyetlerimizde acik, durust ve hesap verebiliriz.",
          },
          {
            icon: Users,
            title: "Dayanisma",
            desc: "Birlikte hareket ederek daha guclu bir toplum olustururuz.",
          },
          {
            icon: Leaf,
            title: "Surdurulebilirlik",
            desc: "Kalici ve etkili cozumler uretmeyi hedefleriz.",
          },
          {
            icon: HandHeart,
            title: "Gonulluluk",
            desc: "Iyiligin yayilmasinda gonullu gucune inaniriz.",
          },
        ],
      },
      stats: {
        title: "Etkimiz",
        items: [
          { number: "1000+", label: "Desteklenen Aile" },
          { number: "500+", label: "Degisen Hayat" },
          { number: "100+", label: "Aktif Gonullu" },
          { number: "50+", label: "Tamamlanan Proje" },
        ],
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

      {/* About Us */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">{t.aboutUs.title}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground text-lg leading-relaxed">{t.aboutUs.text}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.aboutUs.text2}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.aboutUs.text3}</p>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t.vision.title}</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">{t.vision.text}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.vision.text2}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">{t.vision.text3}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">{t.values.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {t.values.items.map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="bg-card p-6 rounded-lg border text-center">
                  <Icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
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
      </div>
    </div>
  )
}
