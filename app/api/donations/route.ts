import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: Request) {
    try {
        await requireAdmin()

        const { searchParams } = new URL(request.url)
        const limit = Math.min(Number.parseInt(searchParams.get("limit") || "50"), 100)
        const offset = Number.parseInt(searchParams.get("offset") || "0")

        // Get donations with optional campaign info
        const donations = await query(
            `SELECT d.*, c.title_en as campaign_title_en, c.title_tr as campaign_title_tr
             FROM donations d
             LEFT JOIN campaigns c ON d.campaign_id = c.id
             ORDER BY d.created_at DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
        )

        // Get total count
        const countResult = await query("SELECT COUNT(*) as total FROM donations")
        const total = countResult[0]?.total || 0

        // Get stats
        const statsResult = await query(`
            SELECT 
                COUNT(*) as total_donations,
                SUM(amount) as total_amount,
                COUNT(DISTINCT donor_email) as unique_donors,
                SUM(CASE WHEN is_recurring = 1 THEN 1 ELSE 0 END) as recurring_donations
            FROM donations
            WHERE payment_status = 'completed'
        `)

        return NextResponse.json({
            donations,
            total,
            stats: statsResult[0] || {
                total_donations: 0,
                total_amount: 0,
                unique_donors: 0,
                recurring_donations: 0
            }
        })
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.error("[DB] Error fetching donations:", error)
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
    }
}
