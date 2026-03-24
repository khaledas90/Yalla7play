import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

function toTags(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const tags = value
    .map((tag) => String(tag || "").trim())
    .filter(Boolean);
  return tags.length ? tags : null;
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const post = await prisma.blog.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/admin/blog/[id] error:", error);
    return NextResponse.json({ error: "فشل تحميل المقال" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
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

    const post = await prisma.blog.update({
      where: { id },
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

    return NextResponse.json(post);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("PATCH /api/admin/blog/[id] error:", error);
    return NextResponse.json({ error: "فشل تعديل المقال" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/blog/[id] error:", error);
    return NextResponse.json({ error: "فشل حذف المقال" }, { status: 500 });
  }
}
