"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/Skeletons";
import { AppItem, getAppColumns } from "./_components/AppTable";
import { AppForm } from "./_components/AppForm";
import { AppModel } from "./_components/AppModel";

export default function AppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [appsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/apps"),
        fetch("/api/admin/categories"),
      ]);
      if (!appsRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch data");
      const appsData = await appsRes.json();
      const categoriesData = await categoriesRes.json();
      setApps(appsData);
      setCategories(categoriesData.map((c: any) => ({ id: c.id, name: c.name })));
    } catch (error: any) {
      toast.error("حدث خطأ أثناء تحميل التطبيقات");
      console.error(error);
      setApps([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getAppColumns(
    (app) => {
      setSelectedApp(app);
      setIsEditDialogOpen(true);
    },
    (app) => {
      setSelectedApp(app);
      setIsDeleteDialogOpen(true);
    }
  );

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <PageHeader title="إدارة التطبيقات" description="إضافة وتعديل وحذف التطبيقات" />
        <TableSkeleton rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="إدارة التطبيقات"
        description="إضافة وتعديل وحذف التطبيقات"
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            تطبيق جديد
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={apps}
        searchKey="title"
        searchPlaceholder="ابحث باسم التطبيق..."
      />

      <AppForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        categories={categories}
        onSuccess={fetchData}
      />
      <AppForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        app={selectedApp}
        categories={categories}
        onSuccess={fetchData}
      />
      <AppModel
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        app={selectedApp}
        onSuccess={fetchData}
      />
    </div>
  );
}
