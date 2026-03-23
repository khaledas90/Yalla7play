import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            games: true,
            apps: true,
          },
        },
      },
    });

    return NextResponse.json(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        gamesCount: category._count.games,
        appsCount: category._count.apps,
      }))
    );
  } catch (error) {
    console.error("GET /api/admin/categories error:", error);
    return NextResponse.json(
      { error: "فشل تحميل التصنيفات" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        icon,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }

    console.error("POST /api/admin/categories error:", error);
    return NextResponse.json(
      { error: "فشل إضافة التصنيف" },
      { status: 500 }
    );
  }
}
