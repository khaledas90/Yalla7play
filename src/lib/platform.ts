import { prisma } from "@/lib/db";

type Category = { id: string; name: string; slug: string };
type CatalogItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    gallery?: string[];
    rating: number;
    ratingCount: number;
    views: number;
    downloads: number;
    popularityScore: number;
    isFeatured: boolean;
    isTrending: boolean;
    published: boolean;
    createdAt: Date;
    category: { id: string; name: string; slug: string };
};
export type DownloadLink = { name: string; url: string };
export type ContentDetailsItem = CatalogItem & {
    updatedAt?: Date;
    version?: string | null;
    updateInfo?: string | null;
    operatingSystem?: string | null;
    developer?: string | null;
    size?: string | null;
    storeType?: "PLAY_STORE" | "APP_STORE" | "OTHER";
    playStoreUrl?: string | null;
    appStoreUrl?: string | null;
    downloadUrl?: DownloadLink[];
    securityCheck?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
};

function mapCatalogItem(item: any): CatalogItem {
    return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        thumbnail: item.thumbnail || null,
        gallery: Array.isArray(item.gallery) ? item.gallery : [],
        rating: item.rating ?? 0,
        ratingCount: item.ratingCount ?? 0,
        views: item.views ?? 0,
        downloads: item.downloads ?? 0,
        popularityScore: 0,
        isFeatured: Boolean(item.isFeatured),
        isTrending: Boolean(item.isTrending),
        published: Boolean(item.published),
        createdAt: item.createdAt,
        category: {
            id: item.category.id,
            name: item.category.name,
            slug: item.category.slug,
        },
    };
}

function toDownloadLinks(value: unknown): DownloadLink[] {
    if (!Array.isArray(value)) return [];
    return value
        .map((entry) => {
            if (entry && typeof entry === "object") {
                const row = entry as Record<string, unknown>;
                const name = String(row.name || "").trim();
                const url = String(row.url || "").trim();
                if (name && url) return { name, url };
            }
            return null;
        })
        .filter(Boolean) as DownloadLink[];
}


const POPULARITY_WEIGHTS = {
    views: 0.4,
    downloads: 0.4,
    rating: 0.2,
} as const;

export function computePopularityScore(input: { downloads: number; views: number; rating: number }) {
    return (
        input.views * POPULARITY_WEIGHTS.views +
        input.downloads * POPULARITY_WEIGHTS.downloads +
        input.rating * POPULARITY_WEIGHTS.rating
    );
}

function withScore(items: CatalogItem[]) {
    return items.map((item) => ({
        ...item,
        popularityScore: computePopularityScore(item),
    }));
}

export async function getPlatformHomeData() {
    try {
        const [categories, games, apps, blogPosts] = await Promise.all([
            prisma.category.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.game.findMany({
                where: { published: true, deletedAt: null },
                include: { category: true },
                orderBy: { createdAt: "desc" },
                take: 40,
            }),
            prisma.app.findMany({
                where: { published: true, deletedAt: null },
                include: { category: true },
                orderBy: { createdAt: "desc" },
                take: 40,
            }),
            prisma.blog.findMany({
                where: { isPublished: true },
                orderBy: { publishedAt: "desc" },
                take: 8,
            }),
        ]);

        const merged = withScore([...games.map(mapCatalogItem), ...apps.map(mapCatalogItem)]).sort(
            (a, b) => b.popularityScore - a.popularityScore
        );

        return {
            categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
            featured: merged.filter((item) => item.isFeatured).slice(0, 6),
            mostPopular: [...merged].sort((a, b) => b.views - a.views).slice(0, 8),
            trending: merged.filter((item) => item.isTrending).slice(0, 8),
            mostDownloaded: [...merged].sort((a, b) => b.downloads - a.downloads).slice(0, 8),
            mostViewed: [...merged].sort((a, b) => b.views - a.views).slice(0, 8),
            latestAdded: [...merged].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 8),
            blogPosts: blogPosts.map((post) => ({
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt || "",
                image: post.image || "/placeholder.svg",
            })),
        };
    } catch (error) {
        console.error("getPlatformHomeData failed, returning empty fallback:", error);
        return {
            categories: [],
            featured: [],
            mostPopular: [],
            trending: [],
            mostDownloaded: [],
            mostViewed: [],
            latestAdded: [],
            blogPosts: [],
        };
    }
}

export async function getCatalogData(options: {
    type: "games" | "apps";
    category?: string;
    sort?: "popular" | "downloads" | "rating" | "latest";
    page?: number;
    pageSize?: number;
}) {
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? 12;
    const sort = options.sort ?? "popular";

    const where = {
        published: true,
        deletedAt: null,
        ...(options.category ? { category: { slug: options.category } } : {}),
    } as const;

    const orderBy =
        sort === "downloads"
            ? { downloads: "desc" as const }
            : sort === "rating"
                ? { rating: "desc" as const }
                : { createdAt: "desc" as const };

    try {
        const [categories, total, rows] = await Promise.all([
            prisma.category.findMany({ orderBy: { createdAt: "desc" } }),
            options.type === "games"
                ? prisma.game.count({ where })
                : prisma.app.count({ where }),
            options.type === "games"
                ? prisma.game.findMany({
                    where,
                    include: { category: true },
                    orderBy,
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                })
                : prisma.app.findMany({
                    where,
                    include: { category: true },
                    orderBy,
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
        ]);

        const items = withScore((rows as any[]).map(mapCatalogItem)).sort((a, b) =>
            sort === "popular" ? b.popularityScore - a.popularityScore : 0
        );

        return {
            items,
            total,
            page,
            pageSize,
            categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
        };
    } catch (error) {
        console.error("getCatalogData failed, returning empty fallback:", error);
        return {
            items: [],
            total: 0,
            page,
            pageSize,
            categories: [],
        };
    }
}

export async function getAdsByPlacement(placement: string) {
    try {
        return await prisma.ad.findMany({
            where: {
                position: placement as any,
                isActive: true,
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("getAdsByPlacement failed, returning empty fallback:", error);
        return [];
    }
}

export function shouldRenderInlineAd(index: number, frequency: number) {
    if (frequency <= 0) return false;
    return index % frequency === 0;
}

export function isImageAd(ad: { type: string }) {
    return ad.type === "IMAGE";
}

export async function getGameBySlug(slug: string) {
    try {
        const game = await prisma.game.findFirst({
            where: { slug, published: true, deletedAt: null },
            include: { category: true },
        });
        if (!game) return null;
        const base = withScore([mapCatalogItem(game)])[0];
        return {
            ...base,
            updatedAt: game.updatedAt,
            version: game.version,
            updateInfo: game.updateInfo,
            operatingSystem: game.operatingSystem,
            developer: game.developer,
            size: game.size,
            storeType: game.storeType,
            playStoreUrl: game.playStoreUrl,
            appStoreUrl: game.appStoreUrl,
            downloadUrl: toDownloadLinks(game.downloadUrl),
            securityCheck: game.securityCheck,
            seoTitle: game.seoTitle,
            seoDescription: game.seoDescription,
        } as ContentDetailsItem;
    } catch (error) {
        console.error("getGameBySlug failed:", error);
        return null;
    }
}

export async function getAppBySlug(slug: string) {
    try {
        const app = await prisma.app.findFirst({
            where: { slug, published: true, deletedAt: null },
            include: { category: true },
        });
        if (!app) return null;
        const base = withScore([mapCatalogItem(app)])[0];
        return {
            ...base,
            updatedAt: app.updatedAt,
            version: app.version,
            updateInfo: app.updateInfo,
            operatingSystem: app.operatingSystem,
            developer: app.developer,
            size: app.size,
            storeType: app.storeType,
            playStoreUrl: app.playStoreUrl,
            appStoreUrl: app.appStoreUrl,
            downloadUrl: toDownloadLinks(app.downloadUrl),
            securityCheck: app.securityCheck,
            seoTitle: app.seoTitle,
            seoDescription: app.seoDescription,
        } as ContentDetailsItem;
    } catch (error) {
        console.error("getAppBySlug failed:", error);
        return null;
    }
}
