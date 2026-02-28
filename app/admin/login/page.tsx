"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
      } else {
        setError(data.error || "Login failed")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Network error. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-10 w-10 text-accent fill-accent" />
            <span className="text-3xl font-bold text-foreground">Hope Relief</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-5 w-5" />
            <span className="text-lg">Admin Portal</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@hoprelief.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
            ← Back to website
          </Link>
        </div>

        <div className="mt-8 p-4 bg-secondary rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Secure Access</p>
              <p className="text-xs text-muted-foreground">
                This portal is protected with enterprise-grade security including password encryption, rate limiting,
                and session management.
              </p>
            </div>
          </div>
        </div>

        {/* Demo credentials for testing */}
        <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-muted-foreground text-center">
            <strong className="text-accent">Demo Credentials:</strong>
            <br />
            Email: admin@hoprelief.org
            <br />
            Password: Admin123!
          </p>
        </div>
      </div>
    </div>
  )
}
