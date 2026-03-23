import { prisma } from "@/lib/db";
import { AdPosition, AdType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ads = await prisma.ad.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(ads);
  } catch (error) {
    console.error("GET /api/admin/ads error:", error);
    return NextResponse.json({ error: "فشل تحميل الإعلانات" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const type = String(body.type || "IMAGE") as AdType;
    const position = String(body.position || "BETWEEN_ITEMS") as AdPosition;
    const imageUrl = String(body.imageUrl || "").trim() || null;
    const link = String(body.link || "").trim() || null;
    const script = String(body.script || "").trim() || null;
    const isActive = Boolean(body.isActive ?? true);
    const frequency = Number(body.frequency || 5);

    if (!title) {
      return NextResponse.json({ error: "عنوان الإعلان مطلوب" }, { status: 400 });
    }

    const ad = await prisma.ad.create({
      data: {
        title,
        type,
        position,
        imageUrl,
        link,
        script,
        isActive,
        frequency,
      },
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/ads error:", error);
    return NextResponse.json({ error: "فشل إضافة الإعلان" }, { status: 500 });
  }
}
