"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { DONATION_PRODUCTS } from "@/lib/donation-products"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Check } from "lucide-react"


export default function DonateForm() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const preselectedProductId = searchParams.get("campaign") || "general-donation"

  const [selectedProduct, setSelectedProduct] = useState(preselectedProductId)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showCheckout, setShowCheckout] = useState(false)

  const currentProduct = DONATION_PRODUCTS.find((p) => p.id === selectedProduct)

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const getFinalAmount = () => {
    if (customAmount) {
      return Math.round(Number.parseFloat(customAmount) * 100)
    }
    return selectedAmount || 0
  }

  const canProceed = () => {
    return currentProduct && (selectedAmount || customAmount) && donorInfo.email && getFinalAmount() >= 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {!showCheckout ? (
          <>
            <div className="text-center mb-8">
              <Heart className="h-16 w-16 text-accent mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {language === "tr" ? "Bağış Yap" : "Make a Donation"}
              </h1>
              <p className="text-xl text-muted-foreground">
                {language === "tr" ? "Yardımınız hayat kurtarıyor" : "Your contribution saves lives"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Campaign Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === "tr" ? "Kampanya Seçin" : "Select Campaign"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedProduct} onValueChange={setSelectedProduct}>
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="emergency">{language === "tr" ? "Acil" : "Emergency"}</TabsTrigger>
                      <TabsTrigger value="all">{language === "tr" ? "Tümü" : "All"}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="emergency" className="space-y-3">
                      {DONATION_PRODUCTS.filter((p) => p.category === "emergency").map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedProduct === product.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {language === "tr" ? product.nameTranslations.tr : product.nameTranslations.en}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {language === "tr"
                                  ? product.descriptionTranslations.tr
                                  : product.descriptionTranslations.en}
                              </p>
                            </div>
                            {selectedProduct === product.id && (
                              <Check className="h-5 w-5 text-accent ml-2 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </TabsContent>

                    <TabsContent value="all" className="space-y-3 max-h-96 overflow-y-auto">
                      {DONATION_PRODUCTS.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedProduct === product.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {language === "tr" ? product.nameTranslations.tr : product.nameTranslations.en}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {language === "tr"
                                  ? product.descriptionTranslations.tr
                                  : product.descriptionTranslations.en}
                              </p>
                            </div>
                            {selectedProduct === product.id && (
                              <Check className="h-5 w-5 text-accent ml-2 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Right Column - Amount & Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "tr" ? "Bağış Miktarı" : "Donation Amount"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {currentProduct?.suggestedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          className="h-14 text-lg"
                          onClick={() => handleAmountSelect(amount)}
                        >
                          ${(amount / 100).toFixed(0)}
                        </Button>
                      ))}
                    </div>

                    <div>
                      <Label htmlFor="custom-amount">
                        {language === "tr" ? "Özel Miktar (USD)" : "Custom Amount (USD)"}
                      </Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="mt-2"
                        min="1"
                        step="0.01"
                      />
                    </div>

                    {currentProduct?.isRecurring && (
                      <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                        <Checkbox
                          id="recurring"
                          checked={isRecurring}
                          onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
                        />
                        <Label htmlFor="recurring" className="cursor-pointer">
                          {language === "tr" ? "Aylık tekrarlayan bağış yap" : "Make this a monthly recurring donation"}
                        </Label>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{language === "tr" ? "Bilgileriniz" : "Your Information"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="donor-name">
                        {language === "tr" ? "Ad Soyad (İsteğe bağlı)" : "Full Name (Optional)"}
                      </Label>
                      <Input
                        id="donor-name"
                        placeholder={language === "tr" ? "Adınız" : "Your name"}
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="donor-email">{language === "tr" ? "E-posta *" : "Email *"}</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        placeholder={language === "tr" ? "ornek@email.com" : "example@email.com"}
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="donor-message">
                        {language === "tr" ? "Mesaj (İsteğe bağlı)" : "Message (Optional)"}
                      </Label>
                      <Textarea
                        id="donor-message"
                        placeholder={
                          language === "tr" ? "Destekleyici bir mesaj bırakın..." : "Leave a message of support..."
                        }
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    <Button
                      className="w-full h-12 text-lg"
                      size="lg"
                      onClick={() => setShowCheckout(true)}
                      disabled={!canProceed()}
                    >
                      {language === "tr"
                        ? `Ödemeye Geç - $${(getFinalAmount() / 100).toFixed(2)}`
                        : `Proceed to Payment - $${(getFinalAmount() / 100).toFixed(2)}`}
                      {isRecurring && (language === "tr" ? "/ay" : "/mo")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Button variant="outline" onClick={() => setShowCheckout(false)} className="mb-4">
              {language === "tr" ? "← Geri Dön" : "← Go Back"}
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>{language === "tr" ? "Ödeme Bilgileri" : "Payment Details"}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === "tr" ? "Güvenli ödeme için Stripe kullanıyoruz" : "We use Stripe for secure payments"}
                </p>
              </CardHeader>
              <CardContent>
                <StripeCheckout
                  productId={selectedProduct}
                  amount={getFinalAmount()}
                  isRecurring={isRecurring}
                  donorInfo={donorInfo}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
