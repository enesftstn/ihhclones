import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // 1. Adým: Promise olarak tanýmla
) {
    try {
        // 2. Adým: Params'ý bekleyerek (await) içinden id'yi al
        const { id } = await params;
        const campaignId = parseInt(id);

        // Nan kontrolü (Güvenlik için)
        if (isNaN(campaignId)) {
            return NextResponse.json({ error: "Geçersiz ID formatý" }, { status: 400 });
        }

        const result = await db
            .select()
            .from(campaigns)
            .where(eq(campaigns.id, campaignId))
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json({ error: "Kampanya bulunamadý" }, { status: 404 });
        }

        return NextResponse.json({ campaign: result[0] });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Sunucu hatasý" }, { status: 500 });
    }
}