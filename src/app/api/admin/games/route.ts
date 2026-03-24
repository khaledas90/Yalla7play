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
    const games = await prisma.game.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      games.map((game) => ({
        id: game.id,
        title: game.title,
        slug: game.slug,
        description: game.description,
        thumbnail: game.thumbnail,
        categoryId: game.categoryId,
        categoryName: game.category.name,
        version: game.version,
        updateInfo: game.updateInfo,
        operatingSystem: game.operatingSystem,
        developer: game.developer,
        size: game.size,
        storeType: game.storeType,
        playStoreUrl: game.playStoreUrl,
        appStoreUrl: game.appStoreUrl,
        downloadUrl: Array.isArray(game.downloadUrl) ? game.downloadUrl : [],
        securityCheck: game.securityCheck,
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

    const game = await prisma.game.create({
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
