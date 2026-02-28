"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export default function ReportsPage() {
  const { language } = useLanguage()

  const reports = [
    { year: "2024", title: language === "tr" ? "Yıllık Rapor 2024" : "Annual Report 2024" },
    { year: "2023", title: language === "tr" ? "Yıllık Rapor 2023" : "Annual Report 2023" },
    { year: "2022", title: language === "tr" ? "Yıllık Rapor 2022" : "Annual Report 2022" },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">{language === "tr" ? "Raporlar" : "Reports"}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.year}>
              <CardContent className="p-6">
                <FileText className="mb-4 h-12 w-12 text-accent" />
                <h3 className="mb-2 text-xl font-bold">{report.title}</h3>
                <Button className="mt-4 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  {language === "tr" ? "İndir" : "Download"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
