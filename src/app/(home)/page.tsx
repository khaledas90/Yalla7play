import type { Metadata } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/platform/hero-slider";
import { ContentCard } from "@/components/platform/content-card";
import { CategoryBadge } from "@/components/platform/category-badge";
import { getPlatformHomeData } from "@/lib/platform";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "يلا7 بلاي | منصة الألعاب والتطبيقات",
    description:
      "اكتشف أفضل الألعاب والتطبيقات مع التصنيفات، الأقسام، والمحتوى التقني.",
  };
}

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <Link href={href} className="text-sm text-blue-300 hover:text-blue-200">
          عرض الكل
        </Link>
      </div>
      {children}
    </section>
  );
}

export default async function HomePage() {
  const data = await getPlatformHomeData();

  return (
    <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <HeroSlider items={data.featured} />

        <Section title="الأكثر شعبية" href="/games?sort=popular">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.mostPopular.map((item, index) => (
              <ContentCard
                key={item.id}
                item={item}
                type="games"
                rank={index < 3 ? index : undefined}
              />
            ))}
          </div>
        </Section>

        <Section title="الرائج الآن" href="/games?sort=popular">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.trending.map((item) => (
              <ContentCard key={item.id} item={item} type="games" />
            ))}
          </div>
        </Section>

        <Section title="الأكثر تحميلا" href="/games?sort=downloads">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.mostDownloaded.map((item) => (
              <ContentCard key={item.id} item={item} type="games" />
            ))}
          </div>
        </Section>

        <Section title="الأكثر مشاهدة" href="/games?sort=popular">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.mostViewed.map((item) => (
              <ContentCard key={item.id} item={item} type="games" />
            ))}
          </div>
        </Section>

        <Section title="الأحدث إضافة" href="/applications?sort=latest">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.latestAdded.map((item) => (
              <ContentCard key={item.id} item={item} type="applications" />
            ))}
          </div>
        </Section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">الأقسام</h2>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category) => (
              <CategoryBadge key={category.id} name={category.name} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">من المدونة</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition hover:border-blue-300"
              >
                <h3 className="line-clamp-2 text-lg font-bold text-slate-900">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
