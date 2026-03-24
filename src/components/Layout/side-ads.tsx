import React from "react";
import { AdPlaceholder } from "@/components/platform/ad-placeholder";

export function SideAds() {
  return (
    <>
      {/* Right Side Ad (Visually Right in RTL, so Screen Left in LTR) */}
      <div className="fixed right-0 top-32 z-10 hidden 2xl:block w-[160px] h-[calc(100vh-160px)] px-2">
        <div className="h-full w-full rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-md p-2 shadow-sm flex flex-col items-center justify-start gap-4">
           {/* Placeholder for skyscraper ad */}
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">إعلان جانبي</div>
           <AdPlaceholder size="skyscraper" className="w-full flex-1" label="إعلان" />
        </div>
      </div>

      {/* Left Side Ad */}
      <div className="fixed left-0 top-32 z-10 hidden 2xl:block w-[160px] h-[calc(100vh-160px)] px-2">
        <div className="h-full w-full rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-md p-2 shadow-sm flex flex-col items-center justify-start gap-4">
           {/* Placeholder for skyscraper ad */}
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">إعلان جانبي</div>
           <AdPlaceholder size="skyscraper" className="w-full flex-1" label="إعلان" />
        </div>
      </div>
    </>
  );
}
