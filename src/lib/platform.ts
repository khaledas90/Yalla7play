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
type BlogPost = { id: string; title: string; slug: string; excerpt: string; image?: string };

const categories: Category[] = [
    { id: "c1", name: "أكشن", slug: "action" },
    { id: "c2", name: "رياضة", slug: "sports" },
    { id: "c3", name: "سباقات", slug: "racing" },
    { id: "c4", name: "إنتاجية", slug: "productivity" },
    { id: "c5", name: "تصميم", slug: "design" },
];

const gamesMock: CatalogItem[] = [
    { id: "g1", title: "قتال الأبطال", slug: "heroes-battle", description: "لعبة أكشن جماعية سريعة.", thumbnail: "/main-bg.jpg", rating: 4.8, ratingCount: 340, views: 9800, downloads: 7400, popularityScore: 0, isFeatured: true, isTrending: true, published: true, createdAt: new Date("2026-03-10"), category: categories[0] },
    { id: "g2", title: "مدير الكرة", slug: "football-manager-pro", description: "لعبة إدارة فريق كرة قدم.", thumbnail: "/main-bg.jpg", rating: 4.6, ratingCount: 280, views: 8700, downloads: 6900, popularityScore: 0, isFeatured: false, isTrending: true, published: true, createdAt: new Date("2026-03-09"), category: categories[1] },
    { id: "g3", title: "سرعة المدينة", slug: "city-rush", description: "سباقات شوارع برسوم عالية.", thumbnail: "/main-bg.jpg", rating: 4.7, ratingCount: 310, views: 9100, downloads: 7200, popularityScore: 0, isFeatured: true, isTrending: false, published: true, createdAt: new Date("2026-03-12"), category: categories[2] },
    { id: "g4", title: "قناص الظل", slug: "shadow-sniper", description: "مهمات تكتيكية متعددة.", thumbnail: "/main-bg.jpg", rating: 4.5, ratingCount: 210, views: 8000, downloads: 6100, popularityScore: 0, isFeatured: false, isTrending: false, published: true, createdAt: new Date("2026-03-08"), category: categories[0] },
];

const appsMock: CatalogItem[] = [
    { id: "a1", title: "منظم المهام الذكي", slug: "smart-tasker", description: "تنظيم يومك وإدارة الأعمال.", thumbnail: "/main-bg.jpg", rating: 4.7, ratingCount: 190, views: 7600, downloads: 6200, popularityScore: 0, isFeatured: true, isTrending: true, published: true, createdAt: new Date("2026-03-11"), category: categories[3] },
    { id: "a2", title: "استوديو التصميم", slug: "design-studio-plus", description: "أدوات تصميم واجهات سريعة.", thumbnail: "/main-bg.jpg", rating: 4.8, ratingCount: 240, views: 6900, downloads: 5800, popularityScore: 0, isFeatured: true, isTrending: false, published: true, createdAt: new Date("2026-03-13"), category: categories[4] },
    { id: "a3", title: "محول الملفات", slug: "file-convertor", description: "تحويل صيغ الملفات بسهولة.", thumbnail: "/main-bg.jpg", rating: 4.4, ratingCount: 150, views: 5500, downloads: 5000, popularityScore: 0, isFeatured: false, isTrending: false, published: true, createdAt: new Date("2026-03-07"), category: categories[3] },
    { id: "a4", title: "مفكرة السحابة", slug: "cloud-notes", description: "تدوين ومزامنة عبر الأجهزة.", thumbnail: "/main-bg.jpg", rating: 4.6, ratingCount: 175, views: 6200, downloads: 5300, popularityScore: 0, isFeatured: false, isTrending: true, published: true, createdAt: new Date("2026-03-06"), category: categories[3] },
];

const blogPostsMock: BlogPost[] = [
    { id: "b1", title: "أفضل ألعاب 2026 للأجهزة المتوسطة", slug: "best-games-2026", excerpt: "اختيارات قوية بأداء ممتاز ومساحة أقل.", image: "/placeholder.svg" },
    { id: "b2", title: "كيف تختار التطبيق المناسب لإدارة يومك", slug: "pick-right-productivity-app", excerpt: "خطوات عملية لاختيار تطبيق فعلي ومفيد.", image: "/placeholder.svg" },
    { id: "b3", title: "مقارنة بين ألعاب السباقات الأكثر تحميلا", slug: "racing-games-comparison", excerpt: "مقارنة سريعة بين الأداء والجرافيك.", image: "/placeholder.svg" },
    { id: "b4", title: "نصائح لتحسين تجربة اللعب على الهاتف", slug: "mobile-gaming-tips", excerpt: "إعدادات مهمة لرفع الـ FPS وتحسين البطارية.", image: "/placeholder.svg" },
];

const adsMock = [
    {
        id: "ad1",
        title: "إعلان تجريبي",
        position: "BETWEEN_ITEMS",
        type: "IMAGE",
        imageUrl: "/main-bg.jpg",
        link: "#",
        script: null,
        frequency: 5,
        isActive: true,
    },
] as const;

const POPULARITY_WEIGHTS = {
    views: 0.4,
    downloads: 0.4,
    rating: 0.2,
} as const;

export function computePopularityScore(input: { downloads: number; views: number; rating: number }) {
    return input.views * POPULARITY_WEIGHTS.views + input.downloads * POPULARITY_WEIGHTS.downloads + input.rating * POPULARITY_WEIGHTS.rating;
}

function withScore(items: CatalogItem[]) {
    return items.map((item) => ({
        ...item,
        popularityScore: computePopularityScore(item),
    }));
}

export async function getPlatformHomeData() {
    const merged = [...withScore(gamesMock), ...withScore(appsMock)].sort((a, b) => b.popularityScore - a.popularityScore);
    const trending = merged.filter((item) => item.isTrending);
    return {
        categories,
        featured: merged.filter((item) => item.isFeatured).slice(0, 6),
        mostPopular: [...merged].sort((a, b) => b.views - a.views).slice(0, 8),
        trending: trending.slice(0, 8),
        mostDownloaded: [...merged].sort((a, b) => b.downloads - a.downloads).slice(0, 8),
        mostViewed: [...merged].sort((a, b) => b.views - a.views).slice(0, 8),
        latestAdded: [...merged].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 8),
        blogPosts: blogPostsMock,
    };
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
    const source = options.type === "games" ? withScore(gamesMock) : withScore(appsMock);
    const filtered = options.category ? source.filter((i) => i.category.slug === options.category) : source;
    const ordered = [...filtered].sort((a, b) =>
        sort === "downloads"
            ? b.downloads - a.downloads
            : sort === "rating"
                ? b.rating - a.rating
                : sort === "latest"
                    ? +new Date(b.createdAt) - +new Date(a.createdAt)
                    : b.popularityScore - a.popularityScore
    );
    const total = ordered.length;
    const start = (page - 1) * pageSize;
    const items = ordered.slice(start, start + pageSize);
    return { items, total, page, pageSize, categories };
}

export async function getAdsByPlacement(placement: string) {
    return adsMock.filter((ad) => ad.position === placement && ad.isActive);
}

export function shouldRenderInlineAd(index: number, frequency: number) {
    if (frequency <= 0) return false;
    return index % frequency === 0;
}

export function isImageAd(ad: { type: string }) {
    return ad.type === "IMAGE";
}

export async function getGameBySlug(slug: string) {
    return withScore(gamesMock).find((game) => game.slug === slug) || null;
}

export async function getAppBySlug(slug: string) {
    return withScore(appsMock).find((app) => app.slug === slug) || null;
}
