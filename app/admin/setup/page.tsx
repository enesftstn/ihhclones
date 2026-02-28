"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export default function DatabaseSetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const setupDatabase = async () => {
    setStatus("loading")
    setMessage("Setting up database tables...")

    try {
      const response = await fetch("/api/setup-database", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to setup database")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error occurred")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Database Setup</CardTitle>
          <CardDescription>Initialize all database tables for the humanitarian relief website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "idle" && (
            <>
              <p className="text-sm text-muted-foreground">
                Click the button below to create all required database tables and insert sample data.
              </p>
              <Button onClick={setupDatabase} className="w-full">
                Setup Database
              </Button>
            </>
          )}

          {status === "loading" && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status === "success" && (
            <Alert className="border-green-500 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status !== "idle" && (
            <Button onClick={() => (window.location.href = "/admin/login")} variant="outline" className="w-full">
              Go to Admin Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
