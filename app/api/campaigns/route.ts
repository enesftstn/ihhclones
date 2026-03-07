import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Tüm aktif kampanyalarý en yeni eklenenden baþlayarak getiriyoruz
        const allCampaigns = await db
            .select()
            .from(campaigns)
            .where(eq(campaigns.isActive, true))
            .orderBy(desc(campaigns.createdAt));

        return NextResponse.json({ campaigns: allCampaigns });
    } catch (error) {
        console.error("API Error (All Campaigns):", error);
        return NextResponse.json({ error: "Kampanyalar yüklenemedi" }, { status: 500 });
    }
}
