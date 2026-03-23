"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { toast } from "sonner";
import { AdItem } from "./AdTable";

interface AdModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ad: AdItem | null;
  onSuccess: () => void;
}

export function AdModel({ open, onOpenChange, ad, onSuccess }: AdModelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!ad) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/ads/${ad.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }
      toast.success("تم حذف الإعلان بنجاح");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    } finally {
      setIsLoading(false);
    }
  };

  if (!ad) return null;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="حذف الإعلان"
      description={`هل أنت متأكد من حذف الإعلان "${ad.title}"؟`}
      confirmLabel="حذف"
      onConfirm={handleDelete}
      variant="destructive"
      isLoading={isLoading}
    />
  );
}
