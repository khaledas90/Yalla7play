"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/common/FileUploader";
import { toast } from "sonner";
import { AdItem } from "./AdTable";

interface AdFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ad?: AdItem | null;
  onSuccess: () => void;
}

export function AdForm({ open, onOpenChange, ad, onSuccess }: AdFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: ad?.title || "",
    type: ad?.type || ("IMAGE" as AdItem["type"]),
    position: ad?.position || ("BETWEEN_ITEMS" as AdItem["position"]),
    imageUrl: ad?.imageUrl || "",
    link: ad?.link || "",
    script: ad?.script || "",
    isActive: ad?.isActive ?? true,
    frequency: ad?.frequency || 5,
  });

  useEffect(() => {
    if (ad) {
      setFormData({
        title: ad.title,
        type: ad.type,
        position: ad.position,
        imageUrl: ad.imageUrl || "",
        link: ad.link || "",
        script: ad.script || "",
        isActive: ad.isActive,
        frequency: ad.frequency || 5,
      });
      return;
    }
    setFormData({
      title: "",
      type: "IMAGE",
      position: "BETWEEN_ITEMS",
      imageUrl: "",
      link: "",
      script: "",
      isActive: true,
      frequency: 5,
    });
  }, [ad, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = ad ? `/api/admin/ads/${ad.id}` : "/api/admin/ads";
      const method = ad ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }
      toast.success(ad ? "تم تحديث الإعلان بنجاح" : "تم إضافة الإعلان بنجاح");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>{ad ? "تعديل الإعلان" : "إضافة إعلان جديد"}</DialogTitle>
          <DialogDescription>إدارة بيانات الإعلان ومكان ظهوره</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label>العنوان</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>النوع</Label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as AdItem["type"],
                    })
                  }
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="IMAGE">صورة</option>
                  <option value="SCRIPT">سكربت</option>
                </select>
              </div>
              <div>
                <Label>الموضع</Label>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      position: e.target.value as AdItem["position"],
                    })
                  }
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="HEADER">الهيدر</option>
                  <option value="SIDEBAR">السايدبار</option>
                  <option value="BETWEEN_ITEMS">بين العناصر</option>
                  <option value="FOOTER">الفوتر</option>
                  <option value="POPUP">نافذة منبثقة</option>
                </select>
              </div>
            </div>
            {formData.type === "IMAGE" ? (
              <>
                <FileUploader
                  value={formData.imageUrl}
                  onChange={(url) =>
                    setFormData({ ...formData, imageUrl: String(url || "") })
                  }
                  label="صورة الإعلان"
                  maxFiles={1}
                  type="image"
                  disabled={isLoading}
                />
                <div>
                  <Label>رابط الإعلان</Label>
                  <Input
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://..."
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <div>
                <Label>كود السكربت</Label>
                <textarea
                  value={formData.script}
                  onChange={(e) =>
                    setFormData({ ...formData, script: e.target.value })
                  }
                  className="min-h-28 w-full rounded-md border px-3 py-2"
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>التكرار</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequency: Number(e.target.value || 1),
                    })
                  }
                />
              </div>
              <label className="mt-7 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                مفعل
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "جاري الحفظ..." : ad ? "حفظ" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
