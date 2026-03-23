import type { Metadata } from "next";
import { getGameBySlug } from "@/lib/platform";
import { notFound } from "next/navigation";
import { ContentDetailsUI } from "@/components/platform/content-details-ui";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "غير موجود" };
  return {
    title: `${game.title} - تحميل مباشر ومجاني | يلا7 بلاي`,
    description: game.description,
  };
}

export default async function GameDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return notFound();

  return <ContentDetailsUI item={game} type="games" />;
}
