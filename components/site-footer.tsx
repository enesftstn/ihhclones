"use client"

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  const { t, language } = useLanguage()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image 
                src="/images/logo.png" 
                alt="Ahde Vefa Logo" 
                width={48} 
                height={48}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">AHDE VEFA</span>
                <span className="text-xs text-muted-foreground">Sosyal Yardımlaşma ve Dayanışma Derneği</span>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {language === "tr"
                ? "İhtiyaç içindeki topluluklara insani yardım ve kalkınma programları sağlıyoruz."
                : "Providing humanitarian aid and development programs to communities in need."}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">
              {language === "tr" ? "Hızlı Bağlantılar" : "Quick Links"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.mission")}
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.reports")}
                </Link>
              </li>
              <li>
                <Link href="/financials" className="text-muted-foreground hover:text-accent transition-colors">
                  {language === "tr" ? "Finansal Bilgiler" : "Financials"}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.careers")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">{language === "tr" ? "Programlar" : "Programs"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/emergency-relief" className="text-muted-foreground hover:text-accent transition-colors">
                  {language === "tr" ? "Acil Yardım" : "Emergency Relief"}
                </Link>
              </li>
              <li>
                <Link href="/orphan-sponsorship" className="text-muted-foreground hover:text-accent transition-colors">
                  {language === "tr" ? "Yetim Sponsorluğu" : "Orphan Sponsorship"}
                </Link>
              </li>
              <li>
                <Link href="/clean-water" className="text-muted-foreground hover:text-accent transition-colors">
                  {language === "tr" ? "Temiz Su Projeleri" : "Clean Water Projects"}
                </Link>
              </li>
              <li>
                <Link href="/medical-aid" className="text-muted-foreground hover:text-accent transition-colors">
                  {language === "tr" ? "Tıbbi Yardım" : "Medical Aid"}
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-muted-foreground hover:text-accent transition-colors">
                  {language === "tr" ? "Eğitim Programları" : "Education Programs"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{language === "tr" ? "E-posta" : "Email"}: info@hoperelief.org</li>
              <li>{language === "tr" ? "Telefon" : "Phone"}: +1 (555) 123-4567</li>
              <li>{language === "tr" ? "Adres" : "Address"}: 123 Charity Lane</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2025 Ahde Vefa Derneği. {t("footer.rights")} |{" "}
            <Link href="/privacy" className="hover:text-accent transition-colors">
              {language === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
            </Link>{" "}
            |{" "}
            <Link href="/terms" className="hover:text-accent transition-colors">
              {language === "tr" ? "Hizmet Şartları" : "Terms of Service"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
