import Image from "next/image";

type AdSlotProps = {
    ad: {
        type: "IMAGE" | "SCRIPT";
        imageUrl: string | null;
        link: string | null;
        script: string | null;
        title: string;
    };
};

export function AdSlot({ ad }: AdSlotProps) {
    if (ad.type === "SCRIPT" && ad.script) {
        return (
            <div
                className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
                dangerouslySetInnerHTML={{ __html: ad.script }}
            />
        );
    }

    if (ad.type === "IMAGE" && ad.imageUrl) {
        const content = (
            <div className="relative h-24 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/60">
                <Image src={ad.imageUrl} alt={ad.title} fill className="object-cover" sizes="100vw" />
            </div>
        );
        return ad.link ? (
            <a href={ad.link} target="_blank" rel="noreferrer noopener">
                {content}
            </a>
        ) : (
            content
        );
    }

    return null;
}
