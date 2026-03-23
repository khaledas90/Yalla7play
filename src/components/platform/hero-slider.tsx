import Image from "next/image";
import Link from "next/link";

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
        <section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-[#eaf2ff] via-[#f4f8ff] to-[#fff7ed] p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)]" />
            <div className="relative grid gap-4 md:grid-cols-3">
                {items.slice(0, 3).map((item) => (
                    <Link
                        key={item.id}
                        href={`/games/${item.slug}`}
                        className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/90 p-3 transition hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]"
                    >
                        <div className="relative mb-3 h-40 overflow-hidden rounded-xl">
                            <Image
                                src={item.thumbnail || item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition duration-500 group-hover:scale-105"
                            />
                        </div>
                        <h2 className="line-clamp-1 text-lg font-extrabold text-slate-900">{item.title}</h2>
                        <p className="mt-1 text-sm text-blue-700">
                            درجة الشعبية: {Math.round(item.popularityScore)}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
