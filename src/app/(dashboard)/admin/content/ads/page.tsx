"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/Skeletons";
import { AdItem, getAdColumns } from "./_components/AdTable";
import { AdForm } from "./_components/AdForm";
import { AdModel } from "./_components/AdModel";

export default function AdsPage() {
  const [ads, setAds] = useState<AdItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AdItem | null>(null);

  const fetchAds = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/ads");
      if (!response.ok) throw new Error("Failed to fetch ads");
      const data = await response.json();
      setAds(data);
    } catch (error: any) {
      toast.error("حدث خطأ أثناء تحميل الإعلانات");
      console.error(error);
      setAds([]);
    } finally {
      setIsLoading(false);
}
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const columns = getAdColumns(
    (ad) => {
      setSelectedAd(ad);
      setIsEditDialogOpen(true);
    },
    (ad) => {
      setSelectedAd(ad);
      setIsDeleteDialogOpen(true);
    }
  );

  if (isLoading) {
  return (
      <div className="space-y-6" dir="rtl">
        <PageHeader title="إدارة الإعلانات" description="إضافة وتعديل وحذف الإعلانات" />
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="إدارة الإعلانات"
        description="إضافة وتعديل وحذف الإعلانات"
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إعلان جديد
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={ads}
        searchKey="title"
        searchPlaceholder="ابحث بعنوان الإعلان..."
      />

      <AdForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchAds}
      />
      <AdForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        ad={selectedAd}
        onSuccess={fetchAds}
      />
      <AdModel
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        ad={selectedAd}
        onSuccess={fetchAds}
      />
    </div>
  );
}
