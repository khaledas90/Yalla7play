import type { Metadata } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/platform/hero-slider";
import { ContentCard } from "@/components/platform/content-card";
import { CategoryBadge } from "@/components/platform/category-badge";
import { AdPlaceholder } from "@/components/platform/ad-placeholder";
import { getPlatformHomeData } from "@/lib/platform";
import { ChevronLeft, Gamepad2, LayoutGrid, Newspaper, TrendingUp } from "lucide-react";
import Image from "next/image";
import game1 from "@/assets/game-1.png";

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
  icon: Icon,
  children,
  adAfter = false,
}: {
  title: string;
  href: string;
  icon: any;
  children: React.ReactNode;
  adAfter?: boolean;
}) {
  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8EE] text-[#FF8A00] backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-800">{title}</h2>
          </div>
          <Link 
            href={href} 
            className="group flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-[#FF8A00] transition-colors hover:bg-[#FFF8EE]"
          >
            عرض الكل
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
        {children}
      </section>
      {adAfter && <AdPlaceholder className="my-12" size="leaderboard" />}
    </div>
  );
}

export default async function HomePage() {
  const data = await getPlatformHomeData();

  return (
    <main className="relative min-h-screen pt-28 pb-20">
      {/* Soft Decorative Background Elements */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,138,0,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[800px] w-[800px] rounded-full bg-[#FFF8EE]/40 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 -z-10 h-[800px] w-[800px] rounded-full bg-slate-50/40 blur-[120px]" />

      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        {/* Top Banner Ad */}
        <AdPlaceholder className="mb-8" size="mobile-banner" label="إعلان علوي" />

        <HeroSlider items={data.featured} />

        <Section title="الأكثر شعبية" href="/games?sort=popular" icon={TrendingUp} adAfter>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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

        <Section title="ألعاب مميزة" href="/games" icon={Gamepad2}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {data.trending.map((item) => (
              <ContentCard key={item.id} item={item} type="games" />
            ))}
          </div>
        </Section>

        {/* Mid-page Ad Section */}
        <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
          <div className="space-y-20">
            <Section title="الأكثر تحميلاً" href="/games?sort=downloads" icon={TrendingUp}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.mostDownloaded.map((item) => (
                  <ContentCard key={item.id} item={item} type="games" />
                ))}
              </div>
            </Section>

            <Section title="أحدث التطبيقات" href="/applications?sort=latest" icon={LayoutGrid}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.latestAdded.map((item) => (
                  <ContentCard key={item.id} item={item} type="applications" />
                ))}
              </div>
            </Section>
          </div>
          
          <aside className="sticky top-32 h-fit space-y-6 hidden lg:block">
            <AdPlaceholder size="rectangle" label="إعلان جانبي" />
            <AdPlaceholder size="rectangle" label="إعلان جانبي" className="opacity-80" />
            
            <div className="rounded-3xl border border-orange-50 bg-white/50 p-6 backdrop-blur-xl">
              <h3 className="mb-4 text-lg font-bold text-slate-800">الأقسام الشائعة</h3>
              <div className="flex flex-wrap gap-2">
                {data.categories.slice(0, 10).map((category) => (
                  <CategoryBadge key={category.id} name={category.name} />
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="rounded-[2.5rem] bg-gradient-to-br from-[#0b1c3d] to-[#1a237e] p-8 text-white shadow-xl shadow-orange-500/20 md:p-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black md:text-5xl">انضم إلى مجتمع يلا7 بلاي</h2>
              <p className="text-lg text-blue-50 opacity-90">احصل على آخر التحديثات للألعاب والتطبيقات مباشرة في بريدك الإلكتروني.</p>
              <div className="flex max-w-md gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-md">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني" 
                  className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-blue-200 focus:outline-none"
                />
                <button className="rounded-xl bg-[#FF8A00] px-6 py-2 font-black text-white transition hover:bg-[#e67e00]">إشترك</button>
              </div>
            </div>
            <div className="hidden lg:block relative h-64 text-center">
               <div className="flex h-full items-center justify-center">
                 <Image 
                    src={game1} 
                    alt="Game Illustration" 
                    className="w-auto h-64 object-contain rotate-6" 
                 />
               </div>
            </div>
          </div>
        </section>

        <Section title="من المدونة" href="/blog" icon={Newspaper}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:shadow-orange-900/5"
              >
                <div className="mb-4 aspect-video overflow-hidden rounded-2xl">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="line-clamp-2 text-xl font-black text-slate-800 group-hover:text-[#FF8A00] transition-colors">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
                <div className="mt-6 flex items-center text-xs font-bold text-[#FF8A00]">
                  اقرأ المزيد 
                  <ChevronLeft className="h-3 w-3 mr-1" />
                </div>
              </Link>
            ))}
          </div>
        </Section>


        {/* Bottom Banner Ad */}
        <AdPlaceholder size="leaderboard" label="إعلان سفلي" />
      </div>
    </main>
  );
}
