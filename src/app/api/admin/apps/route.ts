import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type DownloadLink = { name: string; url: string };

function toDownloadLinks(value: unknown): DownloadLink[] {
    if (Array.isArray(value)) {
        return value
            .map((item) => {
                if (item && typeof item === "object") {
                    const obj = item as Record<string, unknown>;
                    const name = String(obj.name || "").trim();
                    const url = String(obj.url || "").trim();
                    if (name && url) return { name, url };
                }
                const raw = String(item || "").trim();
                if (!raw) return null;
                const [namePart, urlPart] = raw.split("|");
                const name = String(namePart || "").trim();
                const url = String(urlPart || "").trim();
                return name && url ? { name, url } : null;
            })
            .filter(Boolean) as DownloadLink[];
    }
    if (typeof value === "string") {
        return value
            .split(/\r?\n|,/)
            .map((v) => v.trim())
            .map((row) => {
                const [namePart, urlPart] = row.split("|");
                const name = String(namePart || "").trim();
                const url = String(urlPart || "").trim();
                return name && url ? { name, url } : null;
            })
            .filter(Boolean) as DownloadLink[];
    }
    return [];
}

export async function GET() {
    try {
        const apps = await prisma.app.findMany({
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(
            apps.map((app) => {
                const item = app as any;
                return {
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    description: item.description,
                    thumbnail: item.thumbnail,
                    categoryId: item.categoryId,
                    categoryName: item.category.name,
                    version: item.version ?? null,
                    updateInfo: item.updateInfo ?? null,
                    operatingSystem: item.operatingSystem ?? null,
                    developer: item.developer ?? null,
                    size: item.size ?? null,
                    storeType: item.storeType ?? "OTHER",
                    playStoreUrl: item.playStoreUrl ?? null,
                    appStoreUrl: item.appStoreUrl ?? null,
                    downloadUrl: Array.isArray(item.downloadUrl) ? item.downloadUrl : [],
                    securityCheck: item.securityCheck ?? null,
                    downloads: item.downloads,
                    rating: item.rating,
                };
            })
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
        const description = String(body.description || "").trim();
        const thumbnail = String(body.thumbnail || "").trim();
        const categoryId = String(body.categoryId || "").trim();
        const downloadUrls = toDownloadLinks(body.downloadUrl);
        if (!title || !slug || !thumbnail || !categoryId || !description) {
            return NextResponse.json(
                { error: "الحقول المطلوبة غير مكتملة" },
                { status: 400 }
            );
        }

        const app = await prisma.app.create({
            data: {
                title,
                slug,
                description,
                thumbnail,
                categoryId,
                version: body.version ? String(body.version) : null,
                updateInfo: body.updateInfo ? String(body.updateInfo) : null,
                operatingSystem: body.operatingSystem ? String(body.operatingSystem) : null,
                developer: body.developer ? String(body.developer) : null,
                size: body.size ? String(body.size) : null,
                storeType:
                    body.storeType === "PLAY_STORE" || body.storeType === "APP_STORE"
                        ? body.storeType
                        : "OTHER",
                playStoreUrl: body.playStoreUrl ? String(body.playStoreUrl) : null,
                appStoreUrl: body.appStoreUrl ? String(body.appStoreUrl) : null,
                downloadUrl: downloadUrls,
                securityCheck: body.securityCheck ? String(body.securityCheck) : null,
            } as any,
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
