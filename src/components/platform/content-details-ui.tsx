import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AdPlaceholder } from "./ad-placeholder";
import { Star, Eye, Calendar, ShieldCheck, ChevronLeft, LayoutGrid, Gamepad2, Share2, Info } from "lucide-react";
import type { ContentDetailsItem } from "@/lib/platform";

type ContentDetailsProps = {
  item: ContentDetailsItem;
  type: "games" | "applications";
};

export function ContentDetailsUI({ item, type }: ContentDetailsProps) {
  const Icon = type === "games" ? Gamepad2 : LayoutGrid;

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      {/* Soft Background */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition">الرئيسية</Link>
          <ChevronLeft className="h-4 w-4" />
          <Link href={`/${type}`} className="hover:text-blue-600 transition">{type === "games" ? "الألعاب" : "التطبيقات"}</Link>
          <ChevronLeft className="h-4 w-4" />
          <span className="text-blue-600 line-clamp-1">{item.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr,300px]">
          <div className="space-y-12">
            {/* Main Header Card */}
            <div className="relative overflow-hidden rounded-[3rem] border border-blue-50 bg-white p-8 shadow-xl shadow-blue-900/5">
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                  <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="space-y-4 flex-1">
                  <h1 className="text-4xl font-black text-slate-800 leading-tight">{item.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm font-bold">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      {item.rating.toFixed(1)} ({item.ratingCount})
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Eye className="h-5 w-5" />
                      {item.views.toLocaleString()} مشاهدة
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Calendar className="h-5 w-5" />
                      {new Date(item.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long" })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href={`/${type}?category=${item.category.slug}`} className="rounded-xl bg-blue-50 px-4 py-1.5 text-xs font-black text-blue-600 transition hover:bg-blue-100">
                      {item.category.name}
                    </Link>
                    <span className="rounded-xl bg-green-50 px-4 py-1.5 text-xs font-black text-green-600">آمن وموثوق</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${type}/${item.slug}/download`}
                  className="flex flex-1 items-center justify-center gap-3 rounded-[2rem] bg-blue-600 py-5 text-xl font-black text-white shadow-xl shadow-blue-500/30 transition hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
                >
                  صفحة التحميل
                </Link>
                <button className="flex items-center justify-center gap-2 rounded-[2rem] border-2 border-slate-100 px-8 py-5 text-lg font-black text-slate-600 transition hover:bg-slate-50">
                  <Share2 className="h-6 w-6" />
                  مشاركة
                </button>
              </div>
            </div>

            {/* Ad Placeholder */}
            <AdPlaceholder size="leaderboard" />

            {/* Description/About */}
            <div className="space-y-8 rounded-[3rem] border border-blue-50 bg-white p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Info className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">تفاصيل عن {item.title}</h2>
              </div>

              <div className="prose prose-slate max-w-none prose-p:text-lg prose-p:font-bold prose-p:leading-relaxed prose-p:text-slate-600">
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>

              {/* Gallery */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2">
                  {item.gallery.map((img: string, i: number) => (
                    <div key={i} className="aspect-video overflow-hidden rounded-[2rem] border-4 border-slate-50">
                      <img src={img || "/placeholder.svg"} alt={`Screenshot ${i + 1}`} className="h-full w-full object-cover transition hover:scale-105" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Extended Details */}
            <div className="grid gap-4 rounded-[3rem] border border-blue-50 bg-white p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "الإصدار", value: item.version || "-" },
                { label: "التحديث", value: item.updateInfo || "-" },
                { label: "نظام التشغيل", value: item.operatingSystem || "-" },
                { label: "المطور", value: item.developer || "-" },
                { label: "الحجم", value: item.size || "-" },
                { label: "النوع", value: item.category?.name || "-" },
                { label: "نوع المتجر", value: item.storeType || "-" },
                { label: "Play Store", value: item.playStoreUrl || "-" },
                { label: "App Store", value: item.appStoreUrl || "-" },
                { label: "Security Check", value: item.securityCheck || "-" },
                { label: "SEO Title", value: item.seoTitle || "-" },
                { label: "SEO Description", value: item.seoDescription || "-" },
                {
                  label: "تاريخ الإنشاء",
                  value: new Date(item.createdAt).toLocaleDateString("ar-SA"),
                },
                {
                  label: "آخر تحديث",
                  value: item.updatedAt
                    ? new Date(item.updatedAt).toLocaleDateString("ar-SA")
                    : "-",
                },
                { label: "مميز", value: item.isFeatured ? "نعم" : "لا" },
                { label: "ترند", value: item.isTrending ? "نعم" : "لا" },
              ].map((info, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-bold text-slate-500">{info.label}</p>
                  <p className="break-words text-base font-black text-slate-800">{String(info.value)}</p>
                </div>
              ))}
            </div>

            {/* Security Section */}
            <div className="flex items-center gap-6 rounded-[3rem] bg-green-50 p-8 border-2 border-dashed border-green-200">
              <div className="hidden sm:flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-green-600 animate-pulse">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-green-900">تحميل آمن بنسبة 100%</h3>
                <p className="text-lg font-bold text-green-700 leading-relaxed">
                  تم فحص هذا الملف بجميع أدوات الحماية العالمية لضمان خلوه من الفيروسات والبرمجيات الضارة. يمكنك التحميل بكل ثقة ومجاناً تماماً.
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-8 sticky top-32 h-fit hidden lg:block">
            <div className="rounded-[2.5rem] border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-black text-slate-800 flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                معلومات إضافية
              </h3>
              <div className="space-y-4">
                {[
                  { label: "الحجم", value: item.size || "-" },
                  { label: "الإصدار", value: item.version || "-" },
                  { label: "الشركة", value: item.developer || "-" },
                  { label: "التحميلات", value: item.downloads.toLocaleString() },
                ].map((info, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-slate-400 font-bold">{info.label}</span>
                    <span className="text-slate-800 font-black">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdPlaceholder size="rectangle" label="إعلان جانبي" />
            <AdPlaceholder size="rectangle" className="opacity-70" label="إعلان جانبي" />
          </aside>
        </div>
      </div>
    </main>
  );
}

// Icons
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);
