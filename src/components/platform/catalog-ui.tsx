import Link from "next/link";
import { ContentCard } from "@/components/platform/content-card";
import { AdPlaceholder } from "@/components/platform/ad-placeholder";
import { ChevronRight, ChevronLeft, LayoutGrid, Gamepad2, Search, Filter } from "lucide-react";

type CatalogPageProps = {
  title: string;
  type: "games" | "applications";
  items: any[];
  categories: any[];
  page: number;
  totalPages: number;
  currentCategory?: string;
};

export function CatalogUI({
  title,
  type,
  items,
  categories,
  page,
  totalPages,
  currentCategory,
}: CatalogPageProps) {
  const icon = type === "games" ? Gamepad2 : LayoutGrid;

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      {/* Soft Background */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex font-black h-14 w-14 items-center justify-center rounded-2xl bg-blue-100/50 text-blue-600 backdrop-blur-md">
              <span className="sr-only">{title}</span>
              {type === "games" ? <Gamepad2 className="h-8 w-8" /> : <LayoutGrid className="h-8 w-8" />}
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-800">{title}</h1>
              <p className="font-bold text-slate-400">تصفح أفضل ال{type === "games" ? "ألعاب" : "تطبيقات"}</p>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 rounded-2xl border-2 border-slate-50 bg-white/50 p-2 backdrop-blur-md md:max-w-md">
            <Search className="mr-2 h-5 w-5 text-slate-300" />
            <input 
              type="text" 
              placeholder={`بحث في ${title}...`} 
              className="flex-1 bg-transparent px-2 py-1 font-bold text-slate-800 focus:outline-none"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition hover:bg-blue-200">
               <Filter className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="mb-12 flex flex-wrap items-center gap-3">
          <Link 
            href={`/${type === "games" ? "games" : "applications"}`}
            className={`rounded-2xl px-6 py-2.5 text-sm font-black transition ${
              !currentCategory 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                : "bg-white text-slate-500 border border-slate-100 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            الكل
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/${type === "games" ? "games" : "applications"}?category=${c.slug}`}
              className={`rounded-2xl px-6 py-2.5 text-sm font-black transition ${
                currentCategory === c.slug
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white text-slate-500 border border-slate-100 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <AdPlaceholder className="mb-12" size="leaderboard" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type={type} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 rounded-full bg-slate-50 p-8">
              <Gamepad2 className="h-16 w-16 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">لا يوجد محتوى</h3>
            <p className="mt-2 text-slate-400">جرب البحث بكلمات أخرى أو تغيير التصنيف.</p>
          </div>
        )}

        <div className="mt-20 flex items-center justify-center gap-4">
          <Link
            href={`/${type === "games" ? "games" : "applications"}?page=${Math.max(1, page - 1)}${currentCategory ? `&category=${currentCategory}` : ""}`}
            className={`flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-800 border border-slate-100 shadow-sm transition hover:shadow-xl ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            <ChevronRight className="h-5 w-5" />
            السابق
          </Link>
          
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 font-black text-blue-600">
            {page}
          </div>
          <span className="text-sm font-bold text-slate-400">من {totalPages}</span>

          <Link
            href={`/${type === "games" ? "games" : "applications"}?page=${Math.min(totalPages, page + 1)}${currentCategory ? `&category=${currentCategory}` : ""}`}
            className={`flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-800 border border-slate-100 shadow-sm transition hover:shadow-xl ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
          >
            التالي
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        <AdPlaceholder className="mt-20" size="leaderboard" label="إعلان سفلي" />
      </div>
    </main>
  );
}
