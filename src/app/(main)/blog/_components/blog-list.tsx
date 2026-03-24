"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  author: string | null;
  publishedAt: string | null;
  views: number;
  category: string | null;
  tags: string[] | null;
};

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const url = selectedCategory
        ? `/api/blog?category=${encodeURIComponent(selectedCategory)}`
        : "/api/blog";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();

      const postsArray = data.posts || (Array.isArray(data) ? data : []);

      setPosts(postsArray);
      const uniqueCategories = Array.from(
        new Set(postsArray.map((p: BlogPost) => p.category).filter(Boolean))
      ) as string[];
      setCategories(uniqueCategories);
    } catch (error: any) {
      console.error("Error fetching blog posts:", error);
      setPosts([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const skeletonCards = useMemo(() => [1, 2, 3, 4], []);

  if (isLoading) {
    return (
      <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr]">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {skeletonCards.map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
              <div className="w-full aspect-[16/10] bg-gray-100" />
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-8">
          <div className="h-64 bg-gray-50 rounded-[3rem] animate-pulse" />
          <div className="h-48 bg-gray-50 rounded-[3rem] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-sm">
        <Icon icon="solar:document-text-bold" className="mx-auto mb-4 h-14 w-14 text-slate-300" />
        <h3 className="text-2xl font-black text-slate-800">لا توجد مقالات منشورة</h3>
        <p className="mt-2 text-sm font-bold text-slate-500">تأكد من إضافة مقالات منشورة من لوحة التحكم.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr]">
      {/* Blog Posts Column */}
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-2"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <Icon icon="solar:document-text-bold" className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                {/* Category Badge Over Image */}
                {post.category && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-white/90 backdrop-blur-md text-[#FF8A00] border-none shadow-lg px-3 py-1 font-bold">
                      {post.category}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6 lg:p-8">
                <h3 className="text-gray-900 text-xl font-black leading-tight mb-4 group-hover:text-[#FF8A00] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-gray-500 text-sm font-bold leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Icon icon="solar:calendar-linear" className="w-4 h-4 text-[#FF8A00]" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon icon="solar:eye-linear" className="w-4 h-4 text-[#FF8A00]" />
                      {post.views}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FFF8EE] text-[#FF8A00] flex items-center justify-center group-hover:bg-[#FF8A00] group-hover:text-white transition-colors duration-300">
                    <Icon icon="solar:arrow-left-linear" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar Column (About Us style) */}
      <aside className="space-y-8">
        {/* Join Us Ad Card (Copying About Us Sidebar pattern)
        <div className="rounded-[3rem] bg-slate-900 p-8 text-white shadow-xl shadow-orange-900/10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <Icon icon="solar:crown-minimalistic-bold" className="h-7 w-7 text-[#FF8A00]" />
              انضم لفريقنا
            </h3>
            <p className="text-slate-400 mb-8 font-bold leading-relaxed">
              هل أنت صانع محتوى؟ هل تحب تجربة الألعاب والتطبيقات؟ يمكنك الآن الربح عبر منصتنا بمشاركة شغفك.
            </p>
            <Link href="/join-us" className="inline-block w-full text-center rounded-2xl bg-[#FF8A00] py-4 font-black transition hover:bg-[#e67e00] shadow-lg shadow-orange-500/20">
              ابدأ رحلتك معنا
            </Link>
          </div>
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-[#FF8A00]/10 blur-2xl" />
        </div> */}


      </aside>

    </div>
  );
}
