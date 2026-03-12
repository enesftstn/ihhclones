"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-6">
              <Link href="/account-numbers" className="hover:underline">
                {language === "tr" ? "Hesap Numaraları" : "Account Numbers"}
              </Link>
              <Link href="/contact" className="hover:underline">
                {language === "tr" ? "İletişim" : "Contact Us"}
              </Link>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setLanguage("en")}
                className={`hover:underline transition-opacity ${language === "en" ? "font-bold" : "opacity-70"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("tr")}
                className={`hover:underline transition-opacity ${language === "tr" ? "font-bold" : "opacity-70"}`}
              >
                TR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/images/logo.png" 
              alt="Ahde Vefa Logo" 
              width={48} 
              height={48}
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">AHDE VEFA</span>
              <span className="text-xs text-muted-foreground leading-tight hidden sm:block">Sosyal Yardımlaşma ve Dayanışma Derneği</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/projects" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              {t("nav.projects")}
            </Link>
            <Link
              href="/where-we-work"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {language === "tr" ? "Çalışma Alanları" : "Where We Work"}
            </Link>
            <Link href="/news" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              {t("nav.news")}
            </Link>
            <Link
              href="/get-involved"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {language === "tr" ? "Destek Ol" : "Get Involved"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/admin/login">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button className="hidden md:flex bg-accent hover:bg-accent/90">{t("nav.donate")}</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/about" className="text-sm font-medium text-foreground">
              {t("nav.about")}
            </Link>
            <Link href="/projects" className="text-sm font-medium text-foreground">
              {t("nav.projects")}
            </Link>
            <Link href="/where-we-work" className="text-sm font-medium text-foreground">
              {language === "tr" ? "Çalışma Alanları" : "Where We Work"}
            </Link>
            <Link href="/news" className="text-sm font-medium text-foreground">
              {t("nav.news")}
            </Link>
            <Link href="/get-involved" className="text-sm font-medium text-foreground">
              {language === "tr" ? "Destek Ol" : "Get Involved"}
            </Link>
            <Link href="/admin/login" className="text-sm font-medium text-foreground">
              {t("nav.login")}
            </Link>
            <Link href="/donate" className="w-full">
              <Button className="w-full bg-accent hover:bg-accent/90">{t("nav.donate")}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
