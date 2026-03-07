import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

// Not: Dil desteğini burada basitleştirmek için bir yardımcı fonksiyon kullanacağız.
// Normalde bu bilgi URL'den veya çerezden (cookie) gelir.
export default async function NewsPage() {
    // 1. Veritabanından verileri çek (En yeni en üstte)
    const dbNews = await db.select().from(news).orderBy(desc(news.createdAt));

    // Dil seçeneğini varsayılan olarak 'tr' alalım (veya projenin yapısına göre ayarlayabilirsin)
    const language = "tr";

    const translations = {
        en: { title: "News & Updates", subtitle: "Stay informed...", readMore: "Read Full Story" },
        tr: { title: "Haberler ve Güncellemeler", subtitle: "En son insani yardım...", readMore: "Haberin Devamı" }
    };

    const t = translations[language];

    return (
        <div className="min-h-screen">
            {/* Hero Kısmı */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
                        <p className="text-xl text-muted-foreground">{t.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Veritabanından Gelen Haberler */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {dbNews.map((article) => (
                        <div key={article.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-muted relative">
                                <img
                                    src={article.imageUrl || "/placeholder.jpg"}
                                    alt={language === "tr" ? article.titleTr : article.titleEn}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                    <Calendar className="h-3 w-3" />
                                    <span>{article.publishedAt?.toLocaleDateString()}</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-accent font-medium">{article.category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {language === "tr" ? article.titleTr : article.titleEn}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {language === "tr" ? article.excerptTr : article.excerptEn}
                                </p>
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
    );
}