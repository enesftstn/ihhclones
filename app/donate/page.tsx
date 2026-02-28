import { Suspense } from "react"
import DonateForm from "@/components/donate-form"

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background to-muted py-12 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <DonateForm />
    </Suspense>
  )
}
