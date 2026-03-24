"use client";

import React, { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { BlogPost } from "./BlogTable";
import { toast } from "sonner";

interface BlogModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost | null;
  onSuccess: () => void;
}

export function BlogModel({
  open,
  onOpenChange,
  post,
  onSuccess,
}: BlogModelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!post) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const raw = await response.text();
        let message = "حدث خطأ";
        try {
          const parsed = JSON.parse(raw) as { error?: string };
          message = parsed.error || message;
        } catch {
          message = raw?.slice(0, 200) || message;
        }
        throw new Error(message);
      }

      toast.success("تم حذف المقال بنجاح");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    } finally {
      setIsLoading(false);
    }
  };

  if (!post) return null;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="حذف المقال"
      description={`هل أنت متأكد من حذف المقال "${post.title}"؟`}
      confirmLabel="حذف"
      onConfirm={handleDelete}
      variant="destructive"
      isLoading={isLoading}
    />
  );
}
