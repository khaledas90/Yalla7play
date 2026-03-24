import React from "react";

interface AdPlaceholderProps {
  className?: string;
  size?: "leaderboard" | "rectangle" | "square" | "mobile-banner" | "skyscraper" | "vertical";
  label?: string;
}

export function AdPlaceholder({
  className = "",
  size = "leaderboard",
  label = "إعلان",
}: AdPlaceholderProps) {
  const sizeClasses = {
    leaderboard: "w-full h-32",
    rectangle: "w-full max-w-[336px] h-72",
    square: "w-72 h-72",
    "mobile-banner": "w-full h-20",
    skyscraper: "w-full h-full min-h-[600px]",
    vertical: "w-full h-full",
  };

  return (
    <div
      className={`relative mx-auto flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-blue-100 bg-blue-50/30 text-blue-300 drop-shadow-sm transition-all hover:bg-blue-50/50 ${sizeClasses[size]} ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium tracking-wider opacity-60">
          {label}
        </span>
        <div className="h-px w-12 bg-blue-200" />
      </div>
      
      {/* Decorative corner elements for modern feel */}
      <div className="absolute top-2 left-2 h-2 w-2 rounded-full bg-blue-100" />
      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-100" />
      <div className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-blue-100" />
      <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-blue-100" />
    </div>
  );
}
