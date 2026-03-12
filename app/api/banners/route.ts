import { db } from "@/lib/db";
import { banners } from "@/lib/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    try {
        const allBanners = await db
            .select()
            .from(banners)
            .where(eq(banners.isActive, true))
            .orderBy(asc(banners.sortOrder), desc(banners.createdAt));

        return NextResponse.json({ banners: allBanners });
    } catch (error) {
        console.error("API Error (Banners):", error);
        return NextResponse.json({ error: "Failed to load banners" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await requireAdmin();
        const body = await request.json();

        const { titleEn, titleTr, subtitleEn, subtitleTr, imageUrl, linkUrl, buttonTextEn, buttonTextTr, sortOrder } = body;

        if (!titleEn || !titleTr || !imageUrl) {
            return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 });
        }

        const result = await db.insert(banners).values({
            titleEn,
            titleTr,
            subtitleEn: subtitleEn || null,
            subtitleTr: subtitleTr || null,
            imageUrl,
            linkUrl: linkUrl || null,
            buttonTextEn: buttonTextEn || "Donate Now",
            buttonTextTr: buttonTextTr || "Şimdi Bağış Yap",
            sortOrder: sortOrder ? parseInt(sortOrder) : 0,
            isActive: true,
        });

        return NextResponse.json({ success: true, id: result[0].insertId });
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("API Error (Create Banner):", error);
        return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Banner ID is required" }, { status: 400 });
        }

        await db.update(banners)
            .set({ isActive: false })
            .where(eq(banners.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("API Error (Delete Banner):", error);
        return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await requireAdmin();
        const body = await request.json();
        const { id, sortOrder } = body;

        if (!id) {
            return NextResponse.json({ error: "Banner ID is required" }, { status: 400 });
        }

        await db.update(banners)
            .set({ sortOrder: parseInt(sortOrder) || 0 })
            .where(eq(banners.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("API Error (Update Banner):", error);
        return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
    }
}
