import type { Metadata } from "next";
import { getCatalogData } from "@/lib/platform";
import { CatalogUI } from "@/components/platform/catalog-ui";

export const metadata: Metadata = {
  title: "التطبيقات | يلا7 بلاي",
  description: "تصفح أفضل التطبيقات لزيادة إنتاجيتك وتحسين أداء هاتفك.",
};

type SearchParams = { category?: string; sort?: "popular" | "downloads" | "rating" | "latest"; page?: string };

export default async function ApplicationsPage(props: { searchParams: Promise<SearchParams> }) {
  const params = await props.searchParams;
  const page = Number(params.page || 1);
  const { items, total, pageSize, categories } = await getCatalogData({
    type: "apps",
    category: params.category,
    sort: params.sort,
    page,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <CatalogUI
      title="التطبيقات"
      type="applications"
      items={items}
      categories={categories}
      page={page}
      totalPages={totalPages}
      currentCategory={params.category}
    />
  );
}
