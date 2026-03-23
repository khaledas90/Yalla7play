import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard } from "@/components/platform/content-card";
import { getCatalogData } from "@/lib/platform";

export const metadata: Metadata = {
  title: "التطبيقات",
  description: "تصفح التطبيقات حسب القسم مع ترتيب ذكي.",
};

type SearchParams = { category?: string; sort?: "popular" | "downloads" | "rating" | "latest"; page?: string };

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const { items, total, pageSize, categories } = await getCatalogData({
    type: "apps",
    category: params.category,
    sort: params.sort,
    page,
  });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-3xl font-black text-slate-900">التطبيقات</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/applications"
            className="rounded-full border border-blue-200 bg-white px-3 py-1 text-sm text-slate-800"
          >
            الكل
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/applications?category=${c.slug || ""}`}
              className="rounded-full border border-blue-200 bg-white px-3 py-1 text-sm text-blue-700"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type="applications" />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/applications?page=${Math.max(1, page - 1)}`}
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-slate-800"
          >
            السابق
          </Link>
          <span className="text-sm text-slate-600">
            الصفحة {page} / {totalPages}
          </span>
          <Link
            href={`/applications?page=${Math.min(totalPages, page + 1)}`}
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-slate-800"
          >
            التالي
          </Link>
        </div>
      </div>
    </main>
  );
}
