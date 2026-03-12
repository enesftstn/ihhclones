import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    try {
        const allCampaigns = await db
            .select()
            .from(campaigns)
            .where(eq(campaigns.isActive, true))
            .orderBy(desc(campaigns.createdAt));

        return NextResponse.json({ campaigns: allCampaigns });
    } catch (error) {
        console.error("API Error (All Campaigns):", error);
        return NextResponse.json({ error: "Failed to load campaigns" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await requireAdmin();
        const body = await request.json();

        const { titleEn, titleTr, descriptionEn, descriptionTr, targetAmount, imageUrl, category } = body;

        if (!titleEn || !titleTr) {
            return NextResponse.json({ error: "Title is required in both languages" }, { status: 400 });
        }

        const result = await db.insert(campaigns).values({
            titleEn,
            titleTr,
            descriptionEn: descriptionEn || null,
            descriptionTr: descriptionTr || null,
            targetAmount: targetAmount ? String(targetAmount) : null,
            currentAmount: "0.00",
            imageUrl: imageUrl || null,
            category: category || null,
            isActive: true,
        });

        return NextResponse.json({ success: true, id: result[0].insertId });
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("API Error (Create Campaign):", error);
        return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
        }

        await db.update(campaigns)
            .set({ isActive: false })
            .where(eq(campaigns.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("API Error (Delete Campaign):", error);
        return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
    }
}
