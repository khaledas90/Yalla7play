"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export type UserItem = {
  id: string;
  name: string | null;
  email: string;
  role: Role | "USER" | "WORKER";
  createdAt: string;
};

export function getUserColumns(
  onEdit: (item: UserItem) => void,
  onDelete: (item: UserItem) => void
): ColumnDef<UserItem>[] {
  return [
    { accessorKey: "name", header: "الاسم" },
    { accessorKey: "email", header: "البريد الإلكتروني" },
    {
      accessorKey: "role",
      header: "الدور",
      cell: ({ row }) =>
        row.original.role === "SUPER_ADMIN"
          ? "سوبر أدمن"
          : row.original.role === "ADMIN"
            ? "أدمن"
            : row.original.role === "WORKER"
              ? "عامل"
              : "مستخدم",
    },
    {
      accessorKey: "createdAt",
      header: "تاريخ الإنشاء",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString("ar-EG"),
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
