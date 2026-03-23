import type { Metadata } from "next";
import { getCatalogData } from "@/lib/platform";
import { CatalogUI } from "@/components/platform/catalog-ui";

export const metadata: Metadata = {
  title: "الألعاب | يلا7 بلاي",
  description: "تصفح أحدث وأقوى الألعاب بجودة عالية وروابط سريعة.",
};

type SearchParams = { category?: string; sort?: "popular" | "downloads" | "rating" | "latest"; page?: string };

export default async function GamesPage(props: { searchParams: Promise<SearchParams> }) {
  const params = await props.searchParams;
  const page = Number(params.page || 1);
  const { items, total, pageSize, categories } = await getCatalogData({
    type: "games",
    category: params.category,
    sort: params.sort,
    page,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <CatalogUI
      title="الألعاب"
      type="games"
      items={items}
      categories={categories}
      page={page}
      totalPages={totalPages}
      currentCategory={params.category}
    />
  );
}
