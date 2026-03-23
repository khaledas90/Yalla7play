"use client";

import React, { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import {
  AppWindow,
  BarChart3,
  CheckCircle2,
  Download,
  Eye,
  Flame,
  Gamepad2,
  Megaphone,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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

const CONTENT_ITEMS: ContentItem[] = [
  { id: "g1", type: "game", name: "EA FC 26", category: "Sports", views: 9200, downloads: 4100, rating: 4.8, isFeatured: true, isTrending: true },
  { id: "g2", type: "game", name: "GTA V", category: "Action", views: 13400, downloads: 6200, rating: 4.9, isFeatured: true, isTrending: true },
  { id: "g3", type: "game", name: "Red Dead 2", category: "Adventure", views: 7800, downloads: 2900, rating: 4.7, isFeatured: false, isTrending: true },
  { id: "g4", type: "game", name: "Forza Horizon 5", category: "Racing", views: 6100, downloads: 2600, rating: 4.6, isFeatured: false, isTrending: false },
  { id: "g5", type: "game", name: "Tekken 8", category: "Fighting", views: 4800, downloads: 1700, rating: 4.4, isFeatured: false, isTrending: false },
  { id: "a1", type: "app", name: "TikTok Lite", category: "Social", views: 8500, downloads: 9100, rating: 4.3, isFeatured: true, isTrending: true },
  { id: "a2", type: "app", name: "CapCut", category: "Video", views: 9300, downloads: 9700, rating: 4.7, isFeatured: true, isTrending: true },
  { id: "a3", type: "app", name: "WhatsApp", category: "Communication", views: 7200, downloads: 8900, rating: 4.8, isFeatured: false, isTrending: true },
  { id: "a4", type: "app", name: "Telegram", category: "Communication", views: 5300, downloads: 6400, rating: 4.5, isFeatured: false, isTrending: false },
  { id: "a5", type: "app", name: "Snapseed", category: "Photo", views: 3200, downloads: 4100, rating: 4.2, isFeatured: false, isTrending: false },
];

export default function AdminPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>(CONTENT_ITEMS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
      activeAds: 4,
    };
  }, [contentItems]);

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

  return (
    <div className="space-y-6" dir="rtl">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageHeader title="Dashboard" description="إدارة كاملة للمحتوى والإعلانات والتحليلات" />
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/content/games/new">
                <Plus className="ml-1 h-4 w-4" />
                Add Game
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/content/apps/new">Add App</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/content/ads/new">Create Ad</Link>
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Views Over Time
            </CardTitle>
            <CardDescription>آخر 7 أيام</CardDescription>
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
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              Downloads Over Time
            </CardTitle>
            <CardDescription>آخر 7 أيام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {[55, 60, 75, 79, 84, 90, 95].map((value, index) => (
                <div key={index} className="flex h-28 items-end">
                  <div className="w-full rounded-t-md bg-emerald-500/80" style={{ height: `${value}%` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-slate-200 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="h-4 w-4 text-orange-500" />
              Top 5 Games by Views
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGames.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
                <span className="text-sm font-medium">{item.name}</span>
                <Badge variant="outline">{item.views.toLocaleString()}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="h-4 w-4 text-fuchsia-500" />
              Top 5 Apps by Downloads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topApps.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
                <span className="text-sm font-medium">{item.name}</span>
                <Badge variant="outline">{item.downloads.toLocaleString()}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="h-4 w-4 text-amber-600" />
              Ads Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
              إعلانات نشطة: <span className="font-semibold">{counts.activeAds}</span>
            </div>
            <div className="rounded-md border border-slate-200 px-3 py-2 text-sm">النوع: image / script</div>
            <div className="rounded-md border border-slate-200 px-3 py-2 text-sm">Position: header / sidebar / between items / footer</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Games & Apps Management</CardTitle>
            <CardDescription>Bulk Actions + Quick Toggle (Featured / Trending)</CardDescription>
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
          <div className="space-y-2">
            {contentItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <div className="col-span-1">
                  <Checkbox checked={selectedIds.includes(item.id)} onCheckedChange={() => toggleSelect(item.id)} />
                </div>
                <div className="col-span-3 font-medium">{item.name}</div>
                <div className="col-span-2 text-slate-600">{item.category}</div>
                <div className="col-span-3 text-slate-600">
                  V:{item.views.toLocaleString()} / D:{item.downloads.toLocaleString()} / R:{item.rating}
                </div>
                <div className="col-span-1">
                  <Button variant={item.isFeatured ? "default" : "outline"} size="sm" onClick={() => toggleFlag(item.id, "isFeatured")}>
                    Featured
                  </Button>
                </div>
                <div className="col-span-1">
                  <Button variant={item.isTrending ? "default" : "outline"} size="sm" onClick={() => toggleFlag(item.id, "isTrending")}>
                    Trending
                  </Button>
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.type === "game" ? `/admin/content/games/${item.id}` : `/admin/content/apps/${item.id}`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Features جاهزة للربط</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 px-3 py-2">Quick Action: Add Game</div>
          <div className="rounded-md border border-slate-200 px-3 py-2">Drag & Drop images (واجهة جاهزة للربط)</div>
          <div className="rounded-md border border-slate-200 px-3 py-2">Bulk Delete / Bulk Publish</div>
          <div className="rounded-md border border-slate-200 px-3 py-2">Toggle سريع: isFeatured / isTrending</div>
        </CardContent>
      </Card>
    </div>
  );
}
