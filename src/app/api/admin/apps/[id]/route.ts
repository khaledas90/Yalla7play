import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const title = String(body.title || "").trim();
    const slug = String(body.slug || "").trim().toLowerCase();
    const thumbnail = String(body.thumbnail || "").trim();
    const categoryId = String(body.categoryId || "").trim();

    if (!title || !slug || !thumbnail || !categoryId) {
      return NextResponse.json(
        { error: "الحقول المطلوبة غير مكتملة" },
        { status: 400 }
      );
    }

    const app = await prisma.app.update({
      where: { id },
      data: {
        title,
        slug,
        thumbnail,
        categoryId,
      },
    });

    return NextResponse.json(app);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("PATCH /api/admin/apps/[id] error:", error);
    return NextResponse.json({ error: "فشل تعديل التطبيق" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.app.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/apps/[id] error:", error);
    return NextResponse.json({ error: "فشل حذف التطبيق" }, { status: 500 });
  }
}
