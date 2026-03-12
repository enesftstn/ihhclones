"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Heart,
    Users,
    DollarSign,
    TrendingUp,
    MessageSquare,
    Settings,
    LogOut,
    Newspaper,
    Image as ImageIcon,
    Megaphone,
    Search,
    RefreshCw,
    BookOpen,
    Layout as LayoutIcon
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Donation {
    id: number
    donor_email: string
    donor_name: string
    amount: string
    currency: string
    campaign_id: number
    campaign_title_en: string
    campaign_title_tr: string
    payment_status: string
    is_recurring: boolean
    message: string
    created_at: string
}

interface Stats {
    total_donations: number
    total_amount: string
    unique_donors: number
    recurring_donations: number
}

export default function AdminDashboardPage() {
    const [donations, setDonations] = useState<Donation[]>([])
    const [stats, setStats] = useState<Stats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchDonations()
    }, [])

    const fetchDonations = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/donations")
            if (res.ok) {
                const data = await res.json()
                setDonations(data.donations || [])
                setStats(data.stats || null)
            }
        } catch (error) {
            console.error("[v0] Error fetching donations:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" })
            window.location.href = "/"
        } catch {
            window.location.href = "/"
        }
    }

    const filteredDonations = donations.filter(donation =>
        donation.donor_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.campaign_title_en?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
            case 'failed':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="border-b bg-background">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/logo.png"
                                alt="Ahde Vefa Logo"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <span className="text-2xl font-bold">Ahde Vefa Admin</span>
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
                    <p className="text-muted-foreground">Welcome back! Here is an overview of your humanitarian efforts.</p>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                    <Link href="/admin/campaigns">
                        <Card className="hover:border-accent transition-colors cursor-pointer h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <Megaphone className="h-8 w-8 text-accent mb-2" />
                                <span className="text-sm font-medium">Campaigns</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/news">
                        <Card className="hover:border-accent transition-colors cursor-pointer h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <Newspaper className="h-8 w-8 text-accent mb-2" />
                                <span className="text-sm font-medium">News</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/stories">
                        <Card className="hover:border-accent transition-colors cursor-pointer h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <BookOpen className="h-8 w-8 text-accent mb-2" />
                                <span className="text-sm font-medium">Impact Stories</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/banners">
                        <Card className="hover:border-accent transition-colors cursor-pointer h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <LayoutIcon className="h-8 w-8 text-accent mb-2" />
                                <span className="text-sm font-medium">Banners</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/media">
                        <Card className="hover:border-accent transition-colors cursor-pointer h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <ImageIcon className="h-8 w-8 text-accent mb-2" />
                                <span className="text-sm font-medium">Media</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/messages">
                        <Card className="hover:border-accent transition-colors cursor-pointer h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <MessageSquare className="h-8 w-8 text-accent mb-2" />
                                <span className="text-sm font-medium">Messages</span>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${stats?.total_amount ? parseFloat(stats.total_amount).toLocaleString() : "0"}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats?.total_donations || 0} donations total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Donors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.unique_donors || 0}</div>
                            <p className="text-xs text-muted-foreground">People who donated</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recurring Donations</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.recurring_donations || 0}</div>
                            <p className="text-xs text-muted-foreground">Monthly supporters</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Month</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{donations.length}</div>
                            <p className="text-xs text-muted-foreground">Donations recorded</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Donations Table */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle>Donations</CardTitle>
                                <CardDescription>View all donation records and donor information</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search donations..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 w-64"
                                    />
                                </div>
                                <Button variant="outline" size="icon" onClick={fetchDonations}>
                                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <RefreshCw className="h-8 w-8 animate-spin text-accent" />
                            </div>
                        ) : filteredDonations.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                {searchTerm ? "No donations found matching your search." : "No donations recorded yet."}
                            </div>
                        ) : (
                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Donor</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Campaign</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Recurring</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredDonations.map((donation) => (
                                            <TableRow key={donation.id}>
                                                <TableCell className="font-medium">
                                                    {donation.donor_name || "Anonymous"}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {donation.donor_email}
                                                </TableCell>
                                                <TableCell className="font-bold text-accent">
                                                    ${parseFloat(donation.amount).toFixed(2)} {donation.currency}
                                                </TableCell>
                                                <TableCell>
                                                    {donation.campaign_title_en || "General Donation"}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(donation.payment_status)}
                                                </TableCell>
                                                <TableCell>
                                                    {donation.is_recurring ? (
                                                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Monthly</Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground">One-time</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {donation.created_at ? new Date(donation.created_at).toLocaleDateString() : '-'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="mt-6">
                    <Link href="/">
                        <Button variant="outline">Back to Website</Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
