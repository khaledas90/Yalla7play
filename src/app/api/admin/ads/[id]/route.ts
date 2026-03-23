import { prisma } from "@/lib/db";
import { AdPosition, AdType } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
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

    const ad = await prisma.ad.update({
      where: { id },
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

    return NextResponse.json(ad);
  } catch (error) {
    console.error("PATCH /api/admin/ads/[id] error:", error);
    return NextResponse.json({ error: "فشل تعديل الإعلان" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.ad.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/ads/[id] error:", error);
    return NextResponse.json({ error: "فشل حذف الإعلان" }, { status: 500 });
  }
}
