"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export type ContentCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  gamesCount: number;
  appsCount: number;
};

export function getContentCategoryColumns(
  onEdit: (item: ContentCategory) => void,
  onDelete: (item: ContentCategory) => void
): ColumnDef<ContentCategory>[] {
  return [
    { accessorKey: "name", header: "اسم التصنيف" },
    { accessorKey: "slug", header: "الرابط المختصر" },
    {
      accessorKey: "icon",
      header: "الصورة",
      cell: ({ row }) =>
        row.original.icon ? (
          <img
            src={row.original.icon}
            alt={row.original.name}
            className="h-8 w-8 rounded object-cover"
          />
        ) : (
          <span className="text-xs text-slate-500">بدون</span>
        ),
    },
    {
      id: "count",
      header: "الألعاب / التطبيقات",
      cell: ({ row }) => (
        <span className="font-semibold">
          {row.original.gamesCount} / {row.original.appsCount}
        </span>
      ),
    },
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
