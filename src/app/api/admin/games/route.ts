import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      games.map((game) => ({
        id: game.id,
        title: game.title,
        slug: game.slug,
        thumbnail: game.thumbnail,
        categoryId: game.categoryId,
        categoryName: game.category.name,
        downloads: game.downloads,
        rating: game.rating,
      }))
    );
  } catch (error) {
    console.error("GET /api/admin/games error:", error);
    return NextResponse.json({ error: "فشل تحميل الألعاب" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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

    const game = await prisma.game.create({
      data: {
        title,
        slug,
        thumbnail,
        categoryId,
        description: "وصف اللعبة",
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("POST /api/admin/games error:", error);
    return NextResponse.json({ error: "فشل إضافة اللعبة" }, { status: 500 });
  }
}
