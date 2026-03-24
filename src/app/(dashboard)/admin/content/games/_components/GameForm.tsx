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
import TextEditor from "@/components/TextEditor";

interface GameFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game?: GameItem | null;
  categories: Array<{ id: string; name: string }>;
  onSuccess: () => void;
}

type DownloadLink = { name: string; url: string };

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
    description: game?.description || "",
    thumbnail: game?.thumbnail || "",
    categoryId: game?.categoryId || "",
    version: game?.version || "",
    updateInfo: game?.updateInfo || "",
    operatingSystem: game?.operatingSystem || "",
    developer: game?.developer || "",
    size: game?.size || "",
    storeType: game?.storeType || "OTHER",
    playStoreUrl: game?.playStoreUrl || "",
    appStoreUrl: game?.appStoreUrl || "",
    downloadUrl: (game?.downloadUrl as DownloadLink[] | undefined) || [{ name: "", url: "" }],
    securityCheck: game?.securityCheck || "",
  });

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title,
        slug: game.slug,
        description: game.description || "",
        thumbnail: game.thumbnail,
        categoryId: game.categoryId,
        version: game.version || "",
        updateInfo: game.updateInfo || "",
        operatingSystem: game.operatingSystem || "",
        developer: game.developer || "",
        size: game.size || "",
        storeType: game.storeType || "OTHER",
        playStoreUrl: game.playStoreUrl || "",
        appStoreUrl: game.appStoreUrl || "",
        downloadUrl: (game.downloadUrl as DownloadLink[] | undefined) || [{ name: "", url: "" }],
        securityCheck: game.securityCheck || "",
      });
      return;
    }

    setFormData({
      title: "",
      slug: "",
      description: "",
      thumbnail: "",
      categoryId: categories[0]?.id || "",
      version: "",
      updateInfo: "",
      operatingSystem: "",
      developer: "",
      size: "",
      storeType: "OTHER",
      playStoreUrl: "",
      appStoreUrl: "",
      downloadUrl: [{ name: "", url: "" }],
      securityCheck: "",
    });
  }, [game, open, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        downloadUrl: formData.downloadUrl.filter((item) => item.name.trim() || item.url.trim()),
      };
      const url = game ? `/api/admin/games/${game.id}` : "/api/admin/games";
      const method = game ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto" dir="rtl">
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
              <Label>الوصف</Label>
              <TextEditor
                value={formData.description}
                onChange={(_, htmlValue) =>
                  setFormData({ ...formData, description: htmlValue })
                }
                dir="rtl"
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
            <div>
              <Label>نوع المتجر</Label>
              <select
                value={formData.storeType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    storeType: e.target.value as "PLAY_STORE" | "APP_STORE" | "OTHER",
                  })
                }
                className="w-full rounded-md border px-3 py-2"
                disabled={isLoading}
              >
                <option value="PLAY_STORE">Play Store</option>
                <option value="APP_STORE">App Store</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <Label>الإصدار</Label>
              <Input
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>معلومات التحديث</Label>
              <Input
                value={formData.updateInfo}
                onChange={(e) => setFormData({ ...formData, updateInfo: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>نظام التشغيل</Label>
              <Input
                value={formData.operatingSystem}
                onChange={(e) => setFormData({ ...formData, operatingSystem: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>المطور</Label>
              <Input
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>الحجم</Label>
              <Input
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>روابط التحميل</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      downloadUrl: [...formData.downloadUrl, { name: "", url: "" }],
                    })
                  }
                  disabled={isLoading}
                >
                  + إضافة رابط
                </Button>
              </div>
              <div className="space-y-2">
                {formData.downloadUrl.map((link, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr_auto]">
                    <Input
                      placeholder="اسم الرابط"
                      value={link.name}
                      onChange={(e) => {
                        const nextLinks = [...formData.downloadUrl];
                        nextLinks[index] = { ...nextLinks[index], name: e.target.value };
                        setFormData({ ...formData, downloadUrl: nextLinks });
                      }}
                      disabled={isLoading}
                    />
                    <Input
                      placeholder="https://example.com"
                      value={link.url}
                      onChange={(e) => {
                        const nextLinks = [...formData.downloadUrl];
                        nextLinks[index] = { ...nextLinks[index], url: e.target.value };
                        setFormData({ ...formData, downloadUrl: nextLinks });
                      }}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          downloadUrl:
                            formData.downloadUrl.length > 1
                              ? formData.downloadUrl.filter((_, i) => i !== index)
                              : [{ name: "", url: "" }],
                        })
                      }
                      disabled={isLoading}
                    >
                      حذف
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>رابط Play Store</Label>
              <Input
                value={formData.playStoreUrl}
                onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>رابط App Store</Label>
              <Input
                value={formData.appStoreUrl}
                onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>نص الفحص الأمني</Label>
              <Input
                value={formData.securityCheck}
                onChange={(e) => setFormData({ ...formData, securityCheck: e.target.value })}
                disabled={isLoading}
              />
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
