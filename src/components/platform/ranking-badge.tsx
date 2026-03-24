type RankingBadgeProps = { rank: number };

const rankStyles: Record<number, string> = {
  1: "from-yellow-500 to-orange-400 text-slate-900",
  2: "from-slate-300 to-slate-100 text-slate-900",
  3: "from-amber-700 to-amber-500 text-white",
};

export function RankingBadge({ rank }: RankingBadgeProps) {
  return (
    <span
      className={`z-10 flex items-center gap-1 rounded-full bg-gradient-to-r px-3 py-1.5 text-[10px] font-black shadow-lg shadow-orange-500/20 uppercase tracking-tighter whitespace-nowrap ${rankStyles[rank] || "from-blue-700 to-blue-500 text-white"}`}
    >
      <span>TOP</span>
      <span className="text-sm leading-none opacity-80">|</span>
      <span>{rank}</span>
    </span>
  );
}
