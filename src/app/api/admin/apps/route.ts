import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apps = await prisma.app.findMany({
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(
            apps.map((app) => ({
                id: app.id,
                title: app.title,
                slug: app.slug,
                thumbnail: app.thumbnail,
                categoryId: app.categoryId,
                categoryName: app.category.name,
                downloads: app.downloads,
                rating: app.rating,
            }))
        );
    } catch (error) {
        console.error("GET /api/admin/apps error:", error);
        return NextResponse.json({ error: "فشل تحميل التطبيقات" }, { status: 500 });
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

        const app = await prisma.app.create({
            data: {
                title,
                slug,
                thumbnail,
                categoryId,
                description: "وصف التطبيق",
            },
        });

        return NextResponse.json(app, { status: 201 });
    } catch (error: any) {
        if (error?.code === "P2002") {
            return NextResponse.json(
                { error: "الرابط المختصر مستخدم بالفعل" },
                { status: 409 }
            );
        }
        console.error("POST /api/admin/apps error:", error);
        return NextResponse.json({ error: "فشل إضافة التطبيق" }, { status: 500 });
    }
}
