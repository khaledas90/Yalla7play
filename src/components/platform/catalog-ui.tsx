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
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Blog style Hero */}
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#0b1c3d] to-[#1a237e] p-8 md:p-12 text-white shadow-2xl mb-16">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                {type === "games" ? <Gamepad2 className="h-7 w-7 text-[#FF8A00]" /> : <LayoutGrid className="h-7 w-7 text-[#FF8A00]" />}
              </div>
              <h1 className="text-4xl font-black md:text-6xl">{title}</h1>
            </div>
            <p className="text-xl text-blue-50 leading-relaxed font-bold opacity-90">
              تصفح أفضل ال{type === "games" ? "ألعاب" : "تطبيقات"} الحصرية والمجانية بروابط تحميل سريعة ومباشرة.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/5 blur-3xl opacity-30" />
          <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-[#FF8A00]/10 blur-2xl opacity-40" />
        </div>
        
                    {/* Categories Card */}
            <div className="rounded-[3rem] border border-orange-50 bg-white p-8 shadow-sm mb-16">
              <h3 className="text-2xl font-black text-slate-800 border-b-4 border-[#FF8A00] w-fit pb-2 mb-8">التصنيفات</h3>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href={`/${type}`}
                  className={`rounded-xl px-5 py-2.5 text-sm font-black transition ${
                    !currentCategory 
                      ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-500/20" 
                      : "bg-slate-50 text-slate-500 border border-transparent hover:border-orange-100 hover:text-[#FF8A00]"
                  }`}
                >
                  الكل
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/${type}?category=${c.slug}`}
                    className={`rounded-xl px-5 py-2.5 text-sm font-black transition ${
                      currentCategory === c.slug
                        ? "bg-[#FF8A00] text-white shadow-lg shadow-orange-500/20"
                        : "bg-slate-50 text-slate-500 border border-transparent hover:border-orange-100 hover:text-[#FF8A00]"
                    }`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

        <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr]">
          {/* Main Content (Cards) */}
          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.map((item) => (
                <ContentCard key={item.id} item={item} type={type} />
              ))}
            </div>

            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="mb-6 rounded-3xl bg-slate-50 p-8">
                  <Gamepad2 className="h-16 w-16 text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">لا يوجد محتوى</h3>
                <p className="mt-2 text-slate-400 font-bold">جرب البحث بكلمات أخرى أو تغيير التصنيف.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-10 border-t border-slate-100">
                <Link
                  href={`/${type === "games" ? "games" : "applications"}?page=${Math.max(1, page - 1)}${currentCategory ? `&category=${currentCategory}` : ""}`}
                  className={`flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-800 border border-slate-100 shadow-sm transition hover:shadow-xl hover:text-[#FF8A00] ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                >
                  <ChevronRight className="h-5 w-5" />
                  السابق
                </Link>
                
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF8A00] font-black text-white shadow-lg shadow-orange-500/20">
                  {page}
                </div>
                
                <Link
                  href={`/${type === "games" ? "games" : "applications"}?page=${Math.min(totalPages, page + 1)}${currentCategory ? `&category=${currentCategory}` : ""}`}
                  className={`flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-black text-slate-800 border border-slate-100 shadow-sm transition hover:shadow-xl hover:text-[#FF8A00] ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                >
                  التالي
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search Card */}
            <div className="rounded-[3rem] border border-orange-50 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 border-b-4 border-[#FF8A00] w-fit pb-2 mb-8">بحث سريع</h3>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-50 bg-slate-50/50 p-2 focus-within:border-orange-200 focus-within:bg-white transition-all">
                <Search className="mr-2 h-5 w-5 text-slate-300" />
                <input 
                  type="text" 
                  placeholder={`ابحث عن ${type === "games" ? "لعبة" : "تطبيق"}...`} 
                  className="flex-1 bg-transparent px-2 py-2 font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="rounded-[3rem] overflow-hidden shadow-sm">
              <AdPlaceholder size="rectangle" label="إعلان جانبي" />
            </div>

            {/* Platform Promotion (About Us style) */}
            <div className="rounded-[3rem] bg-slate-900 p-8 text-white shadow-xl shadow-orange-900/10 relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                   <Gamepad2 className="h-7 w-7 text-[#FF8A00]" />
                   يلا7 بلاي
                 </h3>
                 <p className="text-slate-400 mb-8 font-bold leading-relaxed">
                   استفد من روابط تحميل آمنة ومباشرة لأحدث ألعاب الهواتف الذكية والتطبيقات التقنية مجاناً.
                 </p>
                 <Link href="/join-us" className="inline-block w-full text-center rounded-2xl bg-[#FF8A00] py-4 font-black transition hover:bg-[#e67e00] shadow-lg shadow-orange-500/20">
                   انضم للمبدعين معنا
                 </Link>
               </div>
               <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-[#FF8A00]/10 blur-2xl" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
