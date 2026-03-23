"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { toast } from "sonner";
import { AppItem } from "./AppTable";

interface AppModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  app: AppItem | null;
  onSuccess: () => void;
}

export function AppModel({ open, onOpenChange, app, onSuccess }: AppModelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!app) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/apps/${app.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }
      toast.success("تم حذف التطبيق بنجاح");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    } finally {
      setIsLoading(false);
    }
  };

  if (!app) return null;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="حذف التطبيق"
      description={`هل أنت متأكد من حذف التطبيق "${app.title}"؟`}
      confirmLabel="حذف"
      onConfirm={handleDelete}
      variant="destructive"
      isLoading={isLoading}
    />
  );
}
