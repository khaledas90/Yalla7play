"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Globe } from "lucide-react";
import { toast } from "sonner";
import { FileUploader } from "@/components/common/FileUploader";

type Settings = {
  id: string;
  platformName: string;
  logo: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  siteTitle: string | null;
  siteDescription: string | null;
  siteKeywords: string | null;
  adsEnabled: boolean;
  currency: string;
};

interface SettingsFormProps {
  settings: Settings | null;
  onSuccess: () => void;
}

export function SettingsForm({ settings, onSuccess }: SettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Settings | null>(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  if (!formData) {
    return <div>جاري التحميل...</div>;
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }

      toast.success("تم حفظ الإعدادات بنجاح");

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("settingsUpdated"));
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            الإعدادات الأساسية للموقع
          </CardTitle>
          <CardDescription>
            الحقول التالية مرتبطة مباشرة بجدول Setting في قاعدة البيانات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>اسم الموقع</Label>
            <Input
              value={formData.platformName}
              onChange={(e) =>
                setFormData({ ...formData, platformName: e.target.value })
              }
            />
          </div>

          <FileUploader
            value={formData.logo || ""}
            onChange={(url) =>
              setFormData({ ...formData, logo: String(url || "") || null })
            }
            label="شعار الموقع"
            maxFiles={1}
            type="image"
          />

          <div>
            <Label>عنوان SEO</Label>
            <Input
              value={formData.siteTitle || ""}
              onChange={(e) =>
                setFormData({ ...formData, siteTitle: e.target.value })
              }
            />
          </div>

          <div>
            <Label>وصف SEO</Label>
            <Textarea
              value={formData.siteDescription || ""}
              onChange={(e) =>
                setFormData({ ...formData, siteDescription: e.target.value })
              }
              rows={3}
            />
          </div>
          <div>
            <Label>الكلمات المفتاحية (SEO Keywords - مفصولة بفاصلة)</Label>
            <Textarea
              value={formData.siteKeywords || ""}
              onChange={(e) =>
                setFormData({ ...formData, siteKeywords: e.target.value })
              }
              rows={2}
              placeholder="مثال: خدمة طلابية, حل أسايمنت, أبحاث جامعية"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>تفعيل الإعلانات</Label>
              <p className="text-sm text-slate-500">
                التحكم في تفعيل أو إيقاف الإعلانات بالموقع
              </p>
            </div>
            <Switch
              checked={formData.adsEnabled}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, adsEnabled: checked })
              }
              dir="ltr"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-start">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="ml-2 h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}
