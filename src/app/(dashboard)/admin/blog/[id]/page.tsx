"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { BlogForm } from "../_components/BlogForm";

export default function EditBlogPostPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="تعديل المقال"
        description="تعديل بيانات المقال"
      />
      <BlogForm
        postId={id}
        submitLabel="حفظ التغييرات"
        cancelPath="/admin/blog"
        onSuccess={() => { }}
      />
    </div>
  );
}
