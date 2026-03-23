"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export type AdItem = {
  id: string;
  title: string;
  type: "IMAGE" | "SCRIPT";
  position: "HEADER" | "SIDEBAR" | "BETWEEN_ITEMS" | "FOOTER" | "POPUP";
  imageUrl: string | null;
  link: string | null;
  script: string | null;
  isActive: boolean;
  frequency: number | null;
};

export function getAdColumns(
  onEdit: (item: AdItem) => void,
  onDelete: (item: AdItem) => void
): ColumnDef<AdItem>[] {
  return [
    {
      accessorKey: "title",
      header: "العنوان",
    },
    {
      accessorKey: "position",
      header: "الموضع",
    },
    {
      accessorKey: "type",
      header: "النوع",
      cell: ({ row }) => (row.original.type === "IMAGE" ? "صورة" : "سكربت"),
    },
    {
      accessorKey: "imageUrl",
      header: "الصورة",
      cell: ({ row }) =>
        row.original.imageUrl ? (
          <img
            src={row.original.imageUrl}
            alt={row.original.title}
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <span className="text-xs text-slate-500">بدون</span>
        ),
    },
    {
      accessorKey: "isActive",
      header: "مفعل",
      cell: ({ row }) => (row.original.isActive ? "نعم" : "لا"),
    },
    {
      accessorKey: "frequency",
      header: "التكرار",
      cell: ({ row }) => row.original.frequency || "-",
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
