type RankingBadgeProps = { rank: number };

const rankStyles: Record<number, string> = {
  1: "from-yellow-500 to-orange-400 text-slate-900",
  2: "from-slate-300 to-slate-100 text-slate-900",
  3: "from-amber-700 to-amber-500 text-white",
};

export function RankingBadge({ rank }: RankingBadgeProps) {
  return (
    <span
      className={`absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r px-2.5 py-1 text-xs font-black shadow-lg ${rankStyles[rank] || "from-blue-700 to-blue-500 text-white"}`}
    >
      Top {rank}
    </span>
  );
}
