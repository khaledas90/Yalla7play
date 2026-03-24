"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import {
  AppWindow,
  BarChart3,
  Boxes,
  CheckCircle2,
  Download,
  Eye,
  Gamepad2,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type ContentItem = {
  id: string;
  type: "game" | "app";
  name: string;
  category: string;
  views: number;
  downloads: number;
  rating: number;
  isFeatured: boolean;
  isTrending: boolean;
};

type CategoryItem = {
  id: string;
  name: string;
  gamesCount: number;
  appsCount: number;
};

export default function AdminPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeAds, setActiveAds] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [gamesRes, appsRes, categoriesRes, adsRes] = await Promise.all([
        fetch("/api/admin/games"),
        fetch("/api/admin/apps"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/ads"),
      ]);

      if (!gamesRes.ok || !appsRes.ok || !categoriesRes.ok || !adsRes.ok) {
        throw new Error("فشل تحميل بيانات لوحة التحكم");
      }

      const [gamesData, appsData, categoriesData, adsData] = await Promise.all([
        gamesRes.json(),
        appsRes.json(),
        categoriesRes.json(),
        adsRes.json(),
      ]);

      const gameItems: ContentItem[] = gamesData.map((game: any) => ({
        id: game.id,
        type: "game",
        name: game.title,
        category: game.categoryName || "-",
        views: Number(game.views || 0),
        downloads: Number(game.downloads || 0),
        rating: Number(game.rating || 0),
        isFeatured: Boolean(game.isFeatured),
        isTrending: Boolean(game.isTrending),
      }));

      const appItems: ContentItem[] = appsData.map((app: any) => ({
        id: app.id,
        type: "app",
        name: app.title,
        category: app.categoryName || "-",
        views: Number(app.views || 0),
        downloads: Number(app.downloads || 0),
        rating: Number(app.rating || 0),
        isFeatured: Boolean(app.isFeatured),
        isTrending: Boolean(app.isTrending),
      }));

      setContentItems([...gameItems, ...appItems]);
      setCategories(categoriesData);
      setActiveAds(adsData.filter((ad: any) => ad.isActive).length);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحميل بيانات لوحة التحكم");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const counts = useMemo(() => {
    const games = contentItems.filter((item) => item.type === "game");
    const apps = contentItems.filter((item) => item.type === "app");
    const totalViews = contentItems.reduce((sum, item) => sum + item.views, 0);
    const totalDownloads = contentItems.reduce((sum, item) => sum + item.downloads, 0);
    return {
      games: games.length,
      apps: apps.length,
      totalViews,
      totalDownloads,
      activeAds,
      categories: categories.length,
    };
  }, [contentItems, activeAds, categories.length]);

  const topGames = useMemo(
    () =>
      contentItems
        .filter((item) => item.type === "game")
        .sort((a, b) => b.views - a.views)
        .slice(0, 5),
    [contentItems]
  );

  const topApps = useMemo(
    () =>
      contentItems
        .filter((item) => item.type === "app")
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 5),
    [contentItems]
  );

  const toggleFlag = (id: string, key: "isFeatured" | "isTrending") => {
    setContentItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: !item[key] } : item)));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const bulkDelete = () => {
    setContentItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const bulkPublish = () => {
    setContentItems((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, isFeatured: true, isTrending: true } : item))
    );
  };

  const topCategories = useMemo(
    () =>
      [...categories]
        .sort((a, b) => b.gamesCount + b.appsCount - (a.gamesCount + a.appsCount))
        .slice(0, 5),
    [categories]
  );

  return (
    <div className="space-y-6" dir="rtl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageHeader title="لوحة التحكم" description="إدارة كاملة للمحتوى والإعلانات والتحليلات" />
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/content/games/new">
                <Plus className="ml-1 h-4 w-4" />
                إضافة لعبة
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/content/apps/new">إضافة تطبيق</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/content/ads/new">إنشاء إعلان</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="عدد الألعاب" value={counts.games} icon={Gamepad2} />
        <StatCard title="عدد التطبيقات" value={counts.apps} icon={AppWindow} />
        <StatCard title="عدد الزوار" value={counts.totalViews.toLocaleString()} icon={Eye} />
        <StatCard title="عدد التحميلات" value={counts.totalDownloads.toLocaleString()} icon={Download} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="عدد التصنيفات" value={counts.categories} icon={Boxes} />
        <StatCard title="الإعلانات النشطة" value={counts.activeAds} icon={BarChart3} />
      </div>

      <div className="grid gap-4 lg:grid-cols-1">
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-black">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              المشاهدات عبر الوقت
            </CardTitle>
            <CardDescription className="text-black">آخر 7 أيام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {[65, 72, 68, 80, 74, 90, 88].map((value, index) => (
                <div key={index} className="flex h-28 items-end">
                  <div className="w-full rounded-t-md bg-blue-500/80" style={{ height: `${value}%` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-black">أكثر التصنيفات استخدامًا</CardTitle>
          <CardDescription className="text-black">حسب مجموع الألعاب والتطبيقات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
              >
                <span className="font-medium text-black">{category.name}</span>
                <span className="text-sm text-black">
                  ألعاب: {category.gamesCount} / تطبيقات: {category.appsCount}
                </span>
              </div>
            ))}
            {topCategories.length === 0 && (
              <p className="text-sm text-slate-500">لا توجد تصنيفات بعد</p>
            )}
          </div>
        </CardContent>
      </Card>


      <Card className="border-slate-200 bg-white">
        <CardHeader className="flex flex-row items-center  justify-between">
          <div>
            <CardTitle className="text-black">إدارة الألعاب والتطبيقات</CardTitle>
            <CardDescription className="text-black">إجراءات جماعية + تبديل سريع (مميز / رائج)</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={bulkPublish} disabled={selectedIds.length === 0}>
              <CheckCircle2 className="ml-1 h-4 w-4" />
              نشر جماعي
            </Button>
            <Button variant="destructive" onClick={bulkDelete} disabled={selectedIds.length === 0}>
              <Trash2 className="ml-1 h-4 w-4" />
              حذف جماعي
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-500">جاري تحميل البيانات...</p>
          ) : (
            <div className="space-y-2">
              {contentItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <div className="col-span-1">
                    <Checkbox checked={selectedIds.includes(item.id)} onCheckedChange={() => toggleSelect(item.id)} />
                  </div>
                  <div className="col-span-3 font-medium text-black">{item.name}</div>
                  <div className="col-span-2  text-black  ">{item.category}</div>
                  <div className="col-span-3  text-black">
                    مشاهدات: {item.views.toLocaleString()} / تحميلات: {item.downloads.toLocaleString()} / تقييم: {item.rating}
                  </div>
                  <div className="col-span-1">
                    <Button variant={item.isFeatured ? "default" : "outline"} size="sm" onClick={() => toggleFlag(item.id, "isFeatured")}>
                      مميز
                    </Button>
                  </div>
                  <div className="col-span-1">
                    <Button variant={item.isTrending ? "default" : "outline"} size="sm" onClick={() => toggleFlag(item.id, "isTrending")}>
                      رائج
                    </Button>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="default" size="sm" asChild>
                      <Link href={item.type === "game" ? `/admin/content/games/${item.id}` : `/admin/content/apps/${item.id}`}>
                        تعديل
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              {contentItems.length === 0 && (
                <p className="text-sm text-slate-500">لا توجد ألعاب أو تطبيقات بعد</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
}
