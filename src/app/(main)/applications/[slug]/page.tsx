import type { Metadata } from "next";
import { getAppBySlug } from "@/lib/platform";
import { notFound } from "next/navigation";
import { ContentDetailsUI } from "@/components/platform/content-details-ui";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return { title: "غير موجود" };
  return {
    title: `${app.title} - تحميل مباشر ومجاني | يلا7 بلاي`,
    description: app.description,
  };
}

export default async function AppDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return notFound();

  return <ContentDetailsUI item={app} type="applications" />;
}
