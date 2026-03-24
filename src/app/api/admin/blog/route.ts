import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function toTags(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const tags = value
    .map((tag) => String(tag || "").trim())
    .filter(Boolean);
  return tags.length ? tags : null;
}

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/admin/blog error:", error);
    return NextResponse.json({ error: "فشل تحميل المقالات" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const slug = String(body.slug || "")
      .trim()
      .toLowerCase();
    const content = String(body.content || "").trim();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "العنوان والرابط والمحتوى مطلوبة" },
        { status: 400 }
      );
    }

    const post = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: body.excerpt ? String(body.excerpt) : null,
        content,
        image: body.image ? String(body.image) : null,
        author: body.author ? String(body.author) : null,
        isPublished: Boolean(body.isPublished),
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        category: body.category ? String(body.category) : null,
        tags: toTags(body.tags),
        seoTitle: body.seoTitle ? String(body.seoTitle) : null,
        seoDescription: body.seoDescription ? String(body.seoDescription) : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("POST /api/admin/blog error:", error);
    return NextResponse.json({ error: "فشل إضافة المقال" }, { status: 500 });
  }
}
