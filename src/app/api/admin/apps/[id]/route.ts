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

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
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

    const app = await prisma.app.update({
      where: { id },
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
      },
    });

    return NextResponse.json(app);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "الرابط المختصر مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("PATCH /api/admin/apps/[id] error:", error);
    return NextResponse.json({ error: "فشل تعديل التطبيق" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.app.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/apps/[id] error:", error);
    return NextResponse.json({ error: "فشل حذف التطبيق" }, { status: 500 });
  }
}
