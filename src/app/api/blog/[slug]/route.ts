import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function normalizeTags(tags: unknown): string[] | null {
  if (!tags) return null;
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t)).filter(Boolean);
  }
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed.map((t) => String(t)).filter(Boolean);
    } catch {
      return tags.split(",").map((t) => t.trim()).filter(Boolean);
    }
  }
  return null;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const post = await prisma.blog.findFirst({
      where: { slug, isPublished: true },
    });

    if (!post) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }

    await prisma.blog.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      publishedAt: post.publishedAt,
      views: post.views + 1,
      category: post.category,
      tags: normalizeTags(post.tags),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
    });
  } catch (error) {
    console.error("GET /api/blog/[slug] error:", error);
    return NextResponse.json({ error: "فشل تحميل المقال" }, { status: 500 });
  }
}
