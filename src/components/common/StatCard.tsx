import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "destructive" | "info";
  className?: string;
}

const variantStyles = {
  default: "bg-blue-100 text-blue-600",
  primary: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-yellow-100 text-yellow-600",
  destructive: "bg-red-100 text-red-600",
  info: "bg-cyan-100 text-cyan-600",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs",
                trend.isPositive
                  ? "text-green-600"
                  : "text-red-600"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-full p-3", variantStyles[variant])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
