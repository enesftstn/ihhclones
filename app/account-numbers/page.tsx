"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function AccountNumbersPage() {
  const { language } = useLanguage()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const content = {
    en: {
      title: "Bank Account Numbers",
      subtitle: "Direct bank transfer details for donations",
      instructions:
        "You can donate directly to our bank accounts. Please include your name and contact information in the transfer description so we can send you a receipt.",
      copy: "Copy",
      copied: "Copied!",
      accounts: [
        {
          id: "usd",
          bank: "International Bank",
          currency: "USD",
          accountName: "Hope Relief Foundation",
          accountNumber: "1234567890",
          iban: "US12 3456 7890 1234 5678 90",
          swift: "INTLUS33XXX",
        },
        {
          id: "eur",
          bank: "European Bank",
          currency: "EUR",
          accountName: "Hope Relief Foundation",
          accountNumber: "0987654321",
          iban: "DE89 3704 0044 0532 0130 00",
          swift: "COBADEFFXXX",
        },
        {
          id: "try",
          bank: "Türkiye İş Bankası",
          currency: "TRY",
          accountName: "Umut Yardım Vakfı",
          accountNumber: "1122334455",
          iban: "TR33 0006 1005 1978 6457 8413 26",
          swift: "ISBKTRISXXX",
        },
        {
          id: "gbp",
          bank: "British Bank",
          currency: "GBP",
          accountName: "Hope Relief Foundation",
          accountNumber: "5566778899",
          iban: "GB29 NWBK 6016 1331 9268 19",
          swift: "NWBKGB2LXXX",
        },
      ],
    },
    tr: {
      title: "Banka Hesap Numaraları",
      subtitle: "Bağışlar için doğrudan banka havalesi detayları",
      instructions:
        "Doğrudan banka hesaplarımıza bağış yapabilirsiniz. Size makbuz gönderebilmemiz için lütfen transfer açıklamasına adınızı ve iletişim bilgilerinizi ekleyin.",
      copy: "Kopyala",
      copied: "Kopyalandı!",
      accounts: [
        {
          id: "usd",
          bank: "International Bank",
          currency: "USD",
          accountName: "Hope Relief Foundation",
          accountNumber: "1234567890",
          iban: "US12 3456 7890 1234 5678 90",
          swift: "INTLUS33XXX",
        },
        {
          id: "eur",
          bank: "European Bank",
          currency: "EUR",
          accountName: "Hope Relief Foundation",
          accountNumber: "0987654321",
          iban: "DE89 3704 0044 0532 0130 00",
          swift: "COBADEFFXXX",
        },
        {
          id: "try",
          bank: "Türkiye İş Bankası",
          currency: "TRY",
          accountName: "Umut Yardım Vakfı",
          accountNumber: "1122334455",
          iban: "TR33 0006 1005 1978 6457 8413 26",
          swift: "ISBKTRISXXX",
        },
        {
          id: "gbp",
          bank: "British Bank",
          currency: "GBP",
          accountName: "Hope Relief Foundation",
          accountNumber: "5566778899",
          iban: "GB29 NWBK 6016 1331 9268 19",
          swift: "NWBKGB2LXXX",
        },
      ],
    },
  }

  const t = content[language]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

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

      {/* Instructions */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-12">
            <p className="text-muted-foreground leading-relaxed">{t.instructions}</p>
          </div>
        </div>
      </div>

      {/* Account Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {t.accounts.map((account) => (
            <div key={account.id} className="bg-card p-6 rounded-lg border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{account.bank}</h3>
                  <div className="text-sm text-accent font-medium">{account.currency}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {language === "tr" ? "Hesap Adı" : "Account Name"}
                  </div>
                  <div className="text-sm font-medium text-foreground">{account.accountName}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {language === "tr" ? "Hesap Numarası" : "Account Number"}
                  </div>
                  <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                    <div className="text-sm font-mono">{account.accountNumber}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => copyToClipboard(account.accountNumber, `${account.id}-acc`)}
                    >
                      {copiedId === `${account.id}-acc` ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          {t.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          {t.copy}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">IBAN</div>
                  <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                    <div className="text-sm font-mono">{account.iban}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => copyToClipboard(account.iban, `${account.id}-iban`)}
                    >
                      {copiedId === `${account.id}-iban` ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          {t.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          {t.copy}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">SWIFT/BIC</div>
                  <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                    <div className="text-sm font-mono">{account.swift}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => copyToClipboard(account.swift, `${account.id}-swift`)}
                    >
                      {copiedId === `${account.id}-swift` ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          {t.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          {t.copy}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
