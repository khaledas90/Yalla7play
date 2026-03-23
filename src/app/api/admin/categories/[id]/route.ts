import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const name = String(body.name || "").trim();
    const slug = String(body.slug || "")
      .trim()
      .toLowerCase();
    const icon =
      body.icon && String(body.icon).trim().length > 0
        ? String(body.icon).trim()
        : null;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "الاسم والرابط المختصر مطلوبان" },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        icon,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }

    console.error("PATCH /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: "فشل تعديل التصنيف" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.code === "P2003") {
      return NextResponse.json(
        { error: "لا يمكن حذف التصنيف لأنه مرتبط بعناصر موجودة" },
        { status: 409 }
      );
    }

    console.error("DELETE /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: "فشل حذف التصنيف" },
      { status: 500 }
    );
  }
}
