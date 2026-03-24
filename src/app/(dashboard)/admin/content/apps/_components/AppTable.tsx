"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export type AppItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  categoryName: string;
  version?: string | null;
  updateInfo?: string | null;
  operatingSystem?: string | null;
  developer?: string | null;
  size?: string | null;
  storeType?: "PLAY_STORE" | "APP_STORE" | "OTHER";
  playStoreUrl?: string | null;
  appStoreUrl?: string | null;
  downloadUrl?: Array<{ name: string; url: string }>;
  securityCheck?: string | null;
  downloads: number;
  rating: number;
};

export function getAppColumns(
  onEdit: (item: AppItem) => void,
  onDelete: (item: AppItem) => void
): ColumnDef<AppItem>[] {
  return [
    {
      accessorKey: "thumbnail",
      header: "الصورة",
      cell: ({ row }) => (
        <img
          src={row.original.thumbnail}
          alt={row.original.title}
          className="h-10 w-10 rounded object-cover"
        />
      ),
    },
    { accessorKey: "title", header: "اسم التطبيق" },
    { accessorKey: "slug", header: "الرابط المختصر" },
    { accessorKey: "categoryName", header: "التصنيف" },
    { accessorKey: "downloads", header: "التحميلات" },
    { accessorKey: "rating", header: "التقييم" },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row.original)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];
}
