"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { toast } from "sonner";
import { ContentCategory } from "./ContentCategoryTable";

interface ContentCategoryModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ContentCategory | null;
  onSuccess: () => void;
}

export function ContentCategoryModel({
  open,
  onOpenChange,
  category,
  onSuccess,
}: ContentCategoryModelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!category) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }
      toast.success("تم حذف التصنيف بنجاح");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    } finally {
      setIsLoading(false);
    }
  };

  if (!category) return null;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="حذف التصنيف"
      description={`هل أنت متأكد من حذف "${category.name}"؟`}
      confirmLabel="حذف"
      onConfirm={handleDelete}
      variant="destructive"
      isLoading={isLoading}
    />
  );
}
