import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Order Statuses
  PENDING: {
    label: "قيد الانتظار",
    className: "bg-yellow-100 text-yellow-800",
  },
  QUOTED: {
    label: "بانتظار موافقة السعر",
    className: "bg-blue-100 text-blue-800",
  },
  PAID: {
    label: "مدفوع",
    className: "bg-green-100 text-green-800",
  },
  ASSIGNED: {
    label: "تم الإسناد",
    className: "bg-indigo-100 text-indigo-800",
  },
  IN_PROGRESS: {
    label: "قيد التنفيذ",
    className: "bg-cyan-100 text-cyan-800",
  },
  DELIVERED: {
    label: "تم التسليم",
    className: "bg-teal-100 text-teal-800",
  },
  REVISION: {
    label: "تعديل",
    className: "bg-orange-100 text-orange-800",
  },
  COMPLETED: {
    label: "مكتمل",
    className: "bg-green-100 text-green-800",
  },
  CANCELLED: {
    label: "ملغي",
    className: "bg-red-100 text-red-800",
  },
  OVERDUE: {
    label: "متأخر",
    className: "bg-red-100 text-red-800",
  },
  // Payment Statuses
  FAILED: {
    label: "فشل",
    className: "bg-red-100 text-red-800",
  },
  REFUNDED: {
    label: "مسترد",
    className: "bg-gray-100 text-gray-800",
  },
  // User Statuses
  ACTIVE: {
    label: "نشط",
    className: "bg-green-100 text-green-800",
  },
  INACTIVE: {
    label: "معطل",
    className: "bg-gray-100 text-gray-800",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
