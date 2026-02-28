"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, DollarSign, TrendingUp, MessageSquare, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  const handleLogout = () => {
    // In a real app, clear session/tokens
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-accent fill-accent" />
              <span className="text-2xl font-bold">Hope Relief Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your humanitarian efforts.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">
              <Link href="/admin/campaigns">Campaigns</Link>
            </TabsTrigger>
            <TabsTrigger value="news">
              <Link href="/admin/news">News</Link>
            </TabsTrigger>
            <TabsTrigger value="media">
              <Link href="/admin/media">Media</Link>
            </TabsTrigger>
            <TabsTrigger value="messages">
              <Link href="/admin/messages">Messages</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,284,500</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,456</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">3 ending this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">12 unread</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Latest contributions from donors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Anonymous", amount: "$500", campaign: "Palestine Relief" },
                      { name: "John Smith", amount: "$250", campaign: "Clean Water Project" },
                      { name: "Sarah Johnson", amount: "$1,000", campaign: "Emergency Food Aid" },
                      { name: "Anonymous", amount: "$150", campaign: "Medical Supplies" },
                    ].map((donation, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{donation.name}</p>
                          <p className="text-sm text-muted-foreground">{donation.campaign}</p>
                        </div>
                        <div className="font-bold text-accent">{donation.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Top performing campaigns this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Palestine Emergency Relief", raised: "$245,000", goal: "$300,000", percent: 82 },
                      { name: "Clean Water for Villages", raised: "$158,000", goal: "$200,000", percent: 79 },
                      { name: "Medical Aid for Children", raised: "$92,000", goal: "$150,000", percent: 61 },
                    ].map((campaign, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{campaign.name}</p>
                          <p className="text-sm text-muted-foreground">{campaign.percent}%</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-neutral-200 rounded-full h-2">
                            <div className="bg-accent h-2 rounded-full" style={{ width: `${campaign.percent}%` }} />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {campaign.raised} of {campaign.goal}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/">
            <Button variant="outline">← Back to Website</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
