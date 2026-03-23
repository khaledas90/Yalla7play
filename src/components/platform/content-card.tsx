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
      className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-3 shadow-sm transition duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.18)]"
    >
      {typeof rank === "number" && rank < 3 ? <RankingBadge rank={rank + 1} /> : null}
      <div className="relative mb-3 h-44 overflow-hidden rounded-xl">
        <Image
          src={item.thumbnail || item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <h3 className="line-clamp-1 text-base font-bold text-slate-900">{item.title}</h3>
      {item.category ? (
        <p className="mt-1 text-xs text-blue-700">{item.category.name}</p>
      ) : null}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-yellow-400" />
          {item.rating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
          <Download className="h-3.5 w-3.5 text-sky-400" />
          {item.downloads}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5 text-indigo-300" />
          {item.views}
        </span>
      </div>
    </Link>
  );
}
