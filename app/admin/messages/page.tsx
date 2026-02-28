"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, MailOpen } from "lucide-react"
import Link from "next/link"

export default function AdminMessagesPage() {
  const [contacts, setContacts] = useState([])
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    // In real app, fetch from API
    // For now using mock data
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Messages & Applications</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "John Doe", email: "john@example.com", subject: "Partnership Inquiry", status: "new" },
                  { name: "Sarah Smith", email: "sarah@example.com", subject: "Donation Question", status: "read" },
                  {
                    name: "Ahmed Hassan",
                    email: "ahmed@example.com",
                    subject: "Volunteer Opportunity",
                    status: "new",
                  },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {contact.status === "new" ? (
                        <Mail className="h-5 w-5 text-accent" />
                      ) : (
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {contact.status === "new" && <Badge variant="default">New</Badge>}
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Emily Johnson", country: "USA", skills: "Medical", status: "pending" },
                  { name: "Mohammed Ali", country: "Turkey", skills: "Translation", status: "approved" },
                  { name: "Lisa Chen", country: "Canada", skills: "Logistics", status: "pending" },
                ].map((volunteer, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{volunteer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {volunteer.country} • {volunteer.skills}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={volunteer.status === "approved" ? "default" : "secondary"}>
                        {volunteer.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
