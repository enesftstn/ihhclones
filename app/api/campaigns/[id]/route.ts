import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // ID'yi sayýya çeviriyoruz
        const campaignId = parseInt(params.id);

        // Drizzle ile sorgu atýyoruz
        const result = await db
            .select()
            .from(campaigns)
            .where(eq(campaigns.id, campaignId))
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json({ error: "Kampanya bulunamadý" }, { status: 404 });
        }

        // Tek bir kampanya objesi döndürüyoruz
        return NextResponse.json({ campaign: result[0] });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Sunucu hatasý" }, { status: 500 });
    }
}