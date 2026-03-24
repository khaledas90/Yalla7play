"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

type DownloadLink = { name: string; url: string };

export function DownloadLinksGate({ links }: { links: DownloadLink[] }) {
    const totalSeconds = 15;
    const [remaining, setRemaining] = useState(totalSeconds);

    useEffect(() => {
        if (remaining <= 0) return;
        const timer = setInterval(() => {
            setRemaining((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [remaining]);

    const progress = useMemo(() => (totalSeconds - remaining) / totalSeconds, [remaining]);
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);

    if (remaining > 0) {
        return (
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
                <h3 className="mb-6 text-2xl font-black text-slate-800">جاري تجهيز روابط التحميل</h3>
                <div className="mx-auto flex w-fit items-center justify-center">
                    <svg width="140" height="140" className="-rotate-90">
                        <circle cx="70" cy="70" r={radius} stroke="#e2e8f0" strokeWidth="10" fill="transparent" />
                        <circle
                            cx="70"
                            cy="70"
                            r={radius}
                            stroke="#2563eb"
                            strokeWidth="10"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            style={{ transition: "stroke-dashoffset 1s linear" }}
                        />
                    </svg>
                    <div className="absolute text-center">
                        <p className="text-4xl font-black text-blue-700">{remaining}</p>
                        <p className="text-xs font-bold text-slate-500">ثانية</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!links.length) {
        return (
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
                <h3 className="text-2xl font-black text-slate-800">لا توجد روابط تحميل متاحة حالياً</h3>
            </div>
        );
    }

    return (
        <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="mb-3 text-2xl font-black text-slate-800">روابط التحميل</h3>
            {links.map((link, index) => (
                <a
                    key={`${link.url}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white transition hover:bg-blue-700"
                >
                    <ExternalLink className="h-5 w-5" />
                    {link.name}
                </a>
            ))}
        </div>
    );
}
