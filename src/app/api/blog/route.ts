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

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") || undefined;
        const limitParam = Number(searchParams.get("limit") || 12);
        const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : 12;

        const posts = await prisma.blog.findMany({
            where: {
                isPublished: true,
                ...(category ? { category } : {}),
            },
            orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
            take: limit,
        });

        return NextResponse.json({
            posts: posts.map((post) => ({
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                image: post.image,
                author: post.author,
                publishedAt: post.publishedAt,
                views: post.views,
                category: post.category,
                tags: normalizeTags(post.tags),
                seoTitle: post.seoTitle,
                seoDescription: post.seoDescription,
            })),
        });
    } catch (error) {
        console.error("GET /api/blog error:", error);
        return NextResponse.json({ error: "فشل تحميل المقالات" }, { status: 500 });
    }
}
