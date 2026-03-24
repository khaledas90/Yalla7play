import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/game-2.png";
import { Icon } from "@iconify/react";

type HeroSliderProps = {
  items: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail?: string | null;
    image?: string | null;
    popularityScore: number;
  }>;
};

export function HeroSlider({ items }: HeroSliderProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b1c3d] via-[#1a237e] to-[#0d0d1e] p-8 md:p-12 shadow-2xl shadow-orange-900/10">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-orange-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content Side */}
          <div className="space-y-6 text-white text-right">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#FF8A00] backdrop-blur-xl border border-white/10">
              <span className="flex h-2 w-2 rounded-full bg-[#FF8A00]" />
              المنصة الأسرع تقنياً
            </div>
            
            <h1 className="text-3xl font-black leading-tight md:text-5xl">
              اكتشف عالم برامج <br />
              و<span className="text-[#FF8A00]">ألعاب مميزة</span>
            </h1>
            
            <p className="max-w-xl text-lg font-bold leading-relaxed text-blue-50 opacity-90">
              بوابتك الرسمية لتحميل أحدث المحتويات الموثوقة. استمتع بتجربة مستخدم سريعة، روابط مباشرة، ودعم متواصل.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/games" 
                className="group flex items-center gap-2 rounded-xl bg-[#FF8A00] px-6 py-3 text-base font-black transition-all hover:bg-[#e67e00] shadow-lg shadow-orange-500/20"
              >
                تصفح الألعاب
                <Icon icon="solar:gamepad-bold" className="h-5 w-5" />
              </Link>
              <Link 
                href="/applications" 
                className="group flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-base font-black backdrop-blur-md transition-all hover:bg-white/20 border border-white/10"
              >
                التطبيقات
                <Icon icon="solar:widget-bold" className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Image/Visual Side */}
          <div className="hidden lg:block relative h-64 text-center">
             <div className="flex h-full items-center justify-center">
                <Image
                  src={heroImage}
                  alt="Yalla7Play Hero Illustration"
                  className="w-auto h-64 object-contain animate-float drop-shadow-2xl"
                  priority
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
