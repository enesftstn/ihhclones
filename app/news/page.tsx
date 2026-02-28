"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

export default function NewsPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "News & Updates",
      subtitle: "Stay informed about our latest humanitarian work and impact stories",
      readMore: "Read Full Story",
      news: [
        {
          title: "Emergency Response Team Deployed to Gaza",
          date: "December 28, 2024",
          category: "Emergency Relief",
          excerpt:
            "Our rapid response team has successfully delivered 50 tons of medical supplies and emergency aid to hospitals in Gaza. The shipment includes critical medications, surgical equipment, and food packages for 10,000 families.",
          image: "query=emergency medical supplies delivery gaza",
        },
        {
          title: "500 Cataract Surgeries Completed in 2024",
          date: "December 20, 2024",
          category: "Healthcare",
          excerpt:
            "We've reached a major milestone with 500 successful cataract surgeries performed across five countries. These life-changing procedures have restored sight to individuals who had been living in darkness for years.",
          image: "query=cataract surgery medical mission",
        },
        {
          title: "25 New Water Wells Bring Clean Water to Rural Africa",
          date: "December 15, 2024",
          category: "Water Projects",
          excerpt:
            "Through your generous donations, we've constructed 25 new water wells in rural communities across Somalia, Ethiopia, and Kenya. Over 50,000 people now have access to clean drinking water for the first time.",
          image: "query=water well construction africa village",
        },
        {
          title: "Winter Relief Campaign Reaches 20,000 Families",
          date: "December 10, 2024",
          category: "Emergency Relief",
          excerpt:
            "As harsh winter conditions hit refugee camps, our teams distributed warm clothing, blankets, and heating fuel to 20,000 families across Syria, Lebanon, and Turkey, ensuring they can survive the cold months ahead.",
          image: "query=winter relief refugee camp blankets",
        },
        {
          title: "New School Opens for Syrian Refugee Children",
          date: "December 5, 2024",
          category: "Education",
          excerpt:
            "A brand new school facility opened its doors to 800 Syrian refugee children in Turkey. The modern building includes 20 classrooms, a library, computer lab, and playground, giving these children hope for a brighter future.",
          image: "query=school children classroom education",
        },
        {
          title: "Mobile Medical Clinics Reach Remote Communities",
          date: "November 28, 2024",
          category: "Healthcare",
          excerpt:
            "Our fleet of mobile medical clinics has provided free healthcare services to 15,000 people in remote areas of Yemen and Somalia. These clinics bring doctors, nurses, and essential medications to those who have no other access to medical care.",
          image: "query=mobile medical clinic healthcare workers",
        },
      ],
    },
    tr: {
      title: "Haberler ve Güncellemeler",
      subtitle: "En son insani yardım çalışmalarımız ve etki hikayelerimizden haberdar olun",
      readMore: "Haberin Devamı",
      news: [
        {
          title: "Acil Müdahale Ekibi Gazze'ye Gönderildi",
          date: "28 Aralık 2024",
          category: "Acil Yardım",
          excerpt:
            "Hızlı müdahale ekibimiz, Gazze'deki hastanelere 50 ton tıbbi malzeme ve acil yardım başarıyla ulaştırdı. Sevkiyat, 10.000 aile için kritik ilaçlar, cerrahi ekipman ve gıda paketleri içeriyor.",
          image: "query=emergency medical supplies delivery gaza",
        },
        {
          title: "2024'te 500 Katarakt Ameliyatı Tamamlandı",
          date: "20 Aralık 2024",
          category: "Sağlık",
          excerpt:
            "Beş ülkede gerçekleştirilen 500 başarılı katarakt ameliyatıyla büyük bir kilometre taşına ulaştık. Bu hayat değiştiren prosedürler, yıllarca karanlıkta yaşayan bireylerin görme gücünü geri kazandırdı.",
          image: "query=cataract surgery medical mission",
        },
        {
          title: "25 Yeni Su Kuyusu Kırsal Afrika'ya Temiz Su Getiriyor",
          date: "15 Aralık 2024",
          category: "Su Projeleri",
          excerpt:
            "Cömert bağışlarınız sayesinde Somali, Etiyopya ve Kenya'daki kırsal topluluklarda 25 yeni su kuyusu inşa ettik. 50.000'den fazla insan artık ilk kez temiz içme suyuna erişiyor.",
          image: "query=water well construction africa village",
        },
        {
          title: "Kış Yardım Kampanyası 20.000 Aileye Ulaştı",
          date: "10 Aralık 2024",
          category: "Acil Yardım",
          excerpt:
            "Mülteci kamplarına sert kış koşulları vurduğunda, ekiplerimiz Suriye, Lübnan ve Türkiye'deki 20.000 aileye sıcak giysi, battaniye ve ısınma yakıtı dağıttı, soğuk ayları atlatabilmelerini sağladı.",
          image: "query=winter relief refugee camp blankets",
        },
        {
          title: "Suriyeli Mülteci Çocuklar İçin Yeni Okul Açıldı",
          date: "5 Aralık 2024",
          category: "Eğitim",
          excerpt:
            "Türkiye'de 800 Suriyeli mülteci çocuğa yepyeni bir okul tesisi kapılarını açtı. Modern bina, 20 sınıf, kütüphane, bilgisayar laboratuvarı ve oyun alanı içeriyor, bu çocuklara daha parlak bir gelecek umudu veriyor.",
          image: "query=school children classroom education",
        },
        {
          title: "Mobil Tıp Klinikleri Uzak Topluluklara Ulaşıyor",
          date: "28 Kasım 2024",
          category: "Sağlık",
          excerpt:
            "Mobil tıp kliniği filomuz, Yemen ve Somali'nin uzak bölgelerindeki 15.000 kişiye ücretsiz sağlık hizmeti sağladı. Bu klinikler, tıbbi bakıma başka erişimi olmayanlara doktor, hemşire ve temel ilaçlar getiriyor.",
          image: "query=mobile medical clinic healthcare workers",
        },
      ],
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

      {/* News Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.news.map((article, idx) => (
            <div key={idx} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent/30 to-primary/30 relative overflow-hidden">
                <img
                  src={`/ceholder-svg-height-200-width-400-.jpg?height=200&width=400&${article.image}`}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-accent font-medium">{article.category}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 text-balance">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{article.excerpt}</p>
                <Button variant="ghost" className="group p-0 h-auto hover:bg-transparent">
                  {t.readMore}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
