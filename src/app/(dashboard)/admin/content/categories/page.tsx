"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/Skeletons";
import {
  ContentCategory,
  getContentCategoryColumns,
} from "./_components/ContentCategoryTable";
import { ContentCategoryForm } from "./_components/ContentCategoryForm";
import { ContentCategoryModel } from "./_components/ContentCategoryModel";

export default function ContentCategoriesPage() {
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ContentCategory | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error: any) {
      toast.error("حدث خطأ أثناء تحميل التصنيفات");
      console.error(error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = getContentCategoryColumns(
    (category) => {
      setSelectedCategory(category);
      setIsEditDialogOpen(true);
    },
    (category) => {
      setSelectedCategory(category);
      setIsDeleteDialogOpen(true);
    }
  );

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <PageHeader
          title="إدارة التصنيفات"
          description="إضافة وتعديل وحذف التصنيفات"
        />
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="إدارة التصنيفات"
        description="إضافة وتعديل وحذف التصنيفات"
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            تصنيف جديد
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={categories}
        searchKey="name"
        searchPlaceholder="ابحث باسم التصنيف..."
      />

      <ContentCategoryForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchCategories}
      />
      <ContentCategoryForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />
      <ContentCategoryModel
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />
    </div>
  );
}
