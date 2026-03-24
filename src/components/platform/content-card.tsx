import Link from "next/link";
import Image from "next/image";
import { Download, Eye, Star } from "lucide-react";
import { RankingBadge } from "./ranking-badge";

type ContentCardProps = {
  item: {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string | null;
    image?: string | null;
    rating: number;
    downloads: number;
    views: number;
    category?: { name: string } | null;
  };
  type: "games" | "applications";
  rank?: number;
};

export function ContentCard({ item, type, rank }: ContentCardProps) {
  return (
    <Link
      href={`/${type}/${item.slug}`}
      className="group relative overflow-hidden rounded-[2rem] border border-orange-50 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-900/5"
    >
      {/* Ranking Badge */}
      {typeof rank === "number" && rank < 3 ? <RankingBadge rank={rank + 1} /> : null}
      
      {/* Thumbnail */}
      <div className="relative mb-4 h-48 overflow-hidden rounded-[1.5rem] bg-slate-50">
        <Image
          src={item.thumbnail || item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Category Overlay */}
        {item.category && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-[#FF8A00] shadow-sm">
              {item.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-3">
        <h3 className="line-clamp-1 text-lg font-black text-slate-800 group-hover:text-[#FF8A00] transition-colors">
          {item.title}
        </h3>
        
        {/* Stats Row */}
        <div className="flex items-center gap-4 py-3 border-t border-slate-50 mt-4 text-[11px] font-bold text-slate-400">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-[#FF8A00] fill-[#FF8A00]" />
            {item.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-slate-300" />
            {item.views}
          </span>
          <span className="mr-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#FF8A00]">تفاصيل</span>
        </div>

        {/* Full-width Branded Download Button */}
        <div className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-[#FF8A00] text-white font-black text-md shadow-lg shadow-orange-500/10 transition-all duration-300 hover:bg-[#e67e00] hover:scale-[1.02] active:scale-95 group-hover:shadow-orange-500/30">
           <span>تحميل الآن</span>
           <Download className="h-5 w-5 animate-bounce-subtle" />
        </div>
      </div>
    </Link>



  );
}

