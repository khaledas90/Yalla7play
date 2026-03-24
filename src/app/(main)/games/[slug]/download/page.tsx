import { notFound } from "next/navigation";
import Image from "next/image";
import { getGameBySlug } from "@/lib/platform";
import { DownloadLinksGate } from "@/components/platform/download-links-gate";

export default async function GameDownloadPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const game = await getGameBySlug(slug);
    if (!game) return notFound();

    const links = [
        ...(game.downloadUrl || []),
        ...(game.playStoreUrl ? [{ name: "Play Store", url: game.playStoreUrl }] : []),
        ...(game.appStoreUrl ? [{ name: "App Store", url: game.appStoreUrl }] : []),
    ];

    return (
        <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-32">
            <div className="mx-auto max-w-3xl space-y-6">
                <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-100">
                            <Image src={game.thumbnail || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800">{game.title}</h1>
                            <p className="text-sm font-bold text-slate-500">صفحة التحميل المباشر</p>
                        </div>
                    </div>
                </div>

                <DownloadLinksGate links={links} />
            </div>
        </main>
    );
}
