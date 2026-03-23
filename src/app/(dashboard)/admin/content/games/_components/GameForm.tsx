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
import { GameItem } from "./GameTable";

interface GameFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game?: GameItem | null;
  categories: Array<{ id: string; name: string }>;
  onSuccess: () => void;
}

export function GameForm({
  open,
  onOpenChange,
  game,
  categories,
  onSuccess,
}: GameFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: game?.title || "",
    slug: game?.slug || "",
    thumbnail: game?.thumbnail || "",
    categoryId: game?.categoryId || "",
  });

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title,
        slug: game.slug,
        thumbnail: game.thumbnail,
        categoryId: game.categoryId,
      });
      return;
    }

    setFormData({
      title: "",
      slug: "",
      thumbnail: "",
      categoryId: categories[0]?.id || "",
    });
  }, [game, open, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = game ? `/api/admin/games/${game.id}` : "/api/admin/games";
      const method = game ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }

      toast.success(game ? "تم تحديث اللعبة بنجاح" : "تم إضافة اللعبة بنجاح");
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
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>{game ? "تعديل اللعبة" : "إضافة لعبة جديدة"}</DialogTitle>
          <DialogDescription>
            {game ? `تعديل بيانات اللعبة ${game.title}` : "إضافة لعبة جديدة"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label>اسم اللعبة</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>الرابط المختصر (Slug)</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>التصنيف</Label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
                required
                disabled={isLoading}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <FileUploader
              value={formData.thumbnail}
              onChange={(url) =>
                setFormData({ ...formData, thumbnail: String(url || "") })
              }
              label="صورة اللعبة"
              maxFiles={1}
              type="image"
              disabled={isLoading}
            />
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
            <Button type="submit" disabled={isLoading || !formData.thumbnail}>
              {isLoading ? "جاري الحفظ..." : game ? "حفظ" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
