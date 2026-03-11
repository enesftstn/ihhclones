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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Check } from "lucide-react"

// StripeCheckout bileşeninin tanımlı olduğunu varsayıyoruz
const StripeCheckout = ({ productId, amount, donorInfo }: any) => (
    <div className="p-4 border-2 border-dashed rounded-lg text-center bg-muted/20">
        Stripe Integration Ready - Final Amount: ${(amount / 100).toFixed(2)}
    </div>
)

export default function DonateForm() {
    const { language } = useLanguage()
    const searchParams = useSearchParams()
    const preselectedProductId = searchParams.get("campaign") || "general-donation"

    const [selectedProduct, setSelectedProduct] = useState(preselectedProductId)
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState("")
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
            const parsed = Number.parseFloat(customAmount)
            return isNaN(parsed) ? 0 : Math.round(parsed * 100)
        }
        return selectedAmount || 0
    }

    const canProceed = () => {
        return currentProduct && (selectedAmount || customAmount) && donorInfo.email && getFinalAmount() >= 100
    }

    // Kampanya Kartı Bileşeni
    const CampaignButton = ({ product }: { product: typeof DONATION_PRODUCTS[0] }) => {
        const isSelected = selectedProduct === product.id
        return (
            <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative ${isSelected
                        ? "border-accent bg-accent/15 ring-2 ring-accent/20 shadow-lg translate-x-1"
                        : "border-border bg-card hover:border-accent/40 hover:bg-accent/5 shadow-sm"
                    }`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                        <h3 className={`font-bold text-base transition-colors ${isSelected ? "text-accent" : "text-foreground"}`}>
                            {language === "tr" ? product.nameTranslations.tr : product.nameTranslations.en}
                        </h3>
                        <p className={`text-xs mt-1 leading-relaxed transition-colors ${isSelected ? "text-foreground/90 font-medium" : "text-muted-foreground"}`}>
                            {language === "tr" ? product.descriptionTranslations.tr : product.descriptionTranslations.en}
                        </p>
                    </div>
                    <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isSelected ? "bg-accent border-accent scale-110" : "bg-transparent border-muted opacity-30 scale-75"
                        }`}>
                        <Check className={`h-3 w-3 text-white stroke-[4px] ${isSelected ? "opacity-100" : "opacity-0"}`} />
                    </div>
                </div>
                {isSelected && (
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-accent rounded-l-lg" />
                )}
            </button>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {!showCheckout ? (
                    <>
                        <div className="text-center mb-10">
                            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-10 w-10 text-accent" />
                            </div>
                            <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
                                {language === "tr" ? "Bağış Yap" : "Make a Donation"}
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                                {language === "tr" ? "Yardımınız ihtiyaç sahiplerine umut oluyor." : "Your contribution brings hope to those in need."}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                            {/* Sol Kolon - Kampanya Seçimi (5 Birim) */}
                            <Card className="lg:col-span-5 border-none shadow-2xl bg-card/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                                        <div className="h-5 w-1 bg-accent rounded-full" />
                                        {language === "tr" ? "Kampanya Seçin" : "Select Campaign"}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs value={selectedProduct} onValueChange={setSelectedProduct} className="w-full">
                                        <TabsList className="grid grid-cols-2 mb-6 p-1 bg-muted rounded-xl">
                                            <TabsTrigger value="emergency" className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white font-semibold transition-all">
                                                {language === "tr" ? "Acil" : "Emergency"}
                                            </TabsTrigger>
                                            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white font-semibold transition-all">
                                                {language === "tr" ? "Tümü" : "All"}
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="emergency" className="space-y-4 outline-none">
                                            {DONATION_PRODUCTS.filter((p) => p.category === "emergency").map((product) => (
                                                <CampaignButton key={product.id} product={product} />
                                            ))}
                                        </TabsContent>

                                        <TabsContent value="all" className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar outline-none">
                                            {DONATION_PRODUCTS.map((product) => (
                                                <CampaignButton key={product.id} product={product} />
                                            ))}
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Sağ Kolon - Miktar ve Bilgiler (7 Birim) */}
                            <div className="lg:col-span-7 space-y-6">
                                <Card className="border-none shadow-xl overflow-hidden">
                                    <div className="h-1.5 bg-accent/20 w-full" />
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{language === "tr" ? "Bağış Miktarı" : "Donation Amount"}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {currentProduct?.suggestedAmounts.map((amount) => (
                                                <Button
                                                    key={amount}
                                                    variant={selectedAmount === amount ? "default" : "outline"}
                                                    className={`h-14 text-lg font-bold rounded-xl transition-all ${selectedAmount === amount
                                                            ? "bg-accent text-white hover:bg-accent/90 shadow-md ring-2 ring-accent/20"
                                                            : "hover:border-accent/40 hover:bg-accent/5"
                                                        }`}
                                                    onClick={() => handleAmountSelect(amount)}
                                                >
                                                    ${(amount / 100).toFixed(0)}
                                                </Button>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="custom-amount" className="text-sm font-semibold text-muted-foreground ml-1">
                                                {language === "tr" ? "Farklı Bir Miktar Belirle (USD)" : "Set a Custom Amount (USD)"}
                                            </Label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent font-bold text-xl">$</div>
                                                <Input
                                                    id="custom-amount"
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={customAmount}
                                                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                                                    className="pl-10 h-14 text-xl font-medium border-2 focus-visible:ring-accent rounded-xl transition-all"
                                                    min="1"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{language === "tr" ? "Bilgileriniz" : "Your Information"}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="donor-name" className="ml-1">{language === "tr" ? "Ad Soyad" : "Full Name"}</Label>
                                                <Input
                                                    id="donor-name"
                                                    className="h-11 rounded-lg"
                                                    placeholder={language === "tr" ? "Adınız" : "Your name"}
                                                    value={donorInfo.name}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="donor-email" className="ml-1">{language === "tr" ? "E-posta *" : "Email *"}</Label>
                                                <Input
                                                    id="donor-email"
                                                    type="email"
                                                    className="h-11 rounded-lg"
                                                    placeholder="example@email.com"
                                                    value={donorInfo.email}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="donor-message" className="ml-1">{language === "tr" ? "Mesaj (İsteğe bağlı)" : "Message (Optional)"}</Label>
                                            <Textarea
                                                id="donor-message"
                                                className="rounded-lg resize-none"
                                                placeholder={language === "tr" ? "Bağışınıza dair bir not bırakın..." : "Leave a note about your donation..."}
                                                value={donorInfo.message}
                                                onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                                                rows={3}
                                            />
                                        </div>

                                        <Button
                                            className="w-full h-16 text-xl font-extrabold bg-accent hover:bg-accent/90 text-white rounded-xl shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
                                            size="lg"
                                            onClick={() => setShowCheckout(true)}
                                            disabled={!canProceed()}
                                        >
                                            {language === "tr"
                                                ? `Bağışı Tamamla - $${(getFinalAmount() / 100).toFixed(2)}`
                                                : `Complete Donation - $${(getFinalAmount() / 100).toFixed(2)}`}
                                        </Button>
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground pt-2">
                                            <Check className="h-4 w-4" />
                                            <span className="text-[11px] font-medium uppercase tracking-tighter italic">Secure Payment via Stripe</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <Button variant="ghost" onClick={() => setShowCheckout(false)} className="mb-6 hover:bg-accent/10 font-medium">
                            {language === "tr" ? "← Bilgilerimi Düzenle" : "← Edit My Information"}
                        </Button>

                        <Card className="border-none shadow-2xl overflow-hidden rounded-2xl">
                            <div className="h-2 bg-accent w-full" />
                            <div className="p-8 bg-muted/20 border-b">
                                <h2 className="text-2xl font-bold">{language === "tr" ? "Güvenli Ödeme" : "Secure Checkout"}</h2>
                                <p className="text-muted-foreground mt-1">
                                    {language === "tr" ? "Ödemenizi tamamlamak için lütfen bilgileri doldurun." : "Please fill in the details to complete your payment."}
                                </p>
                            </div>
                            <CardContent className="p-8">
                                <StripeCheckout
                                    productId={selectedProduct}
                                    amount={getFinalAmount()}
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