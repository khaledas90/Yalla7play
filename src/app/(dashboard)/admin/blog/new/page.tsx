"use client";

import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { BlogForm } from "../_components/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="مقال جديد"
        description="إضافة مقال جديد للمدونة"
      />
      <BlogForm
        submitLabel="إضافة المقال"
        cancelPath="/admin/blog"
        onSuccess={() => { }}
      />
    </div>
  );
}
