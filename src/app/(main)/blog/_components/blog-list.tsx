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

const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "أفضل ألعاب الأكشن لعام 2026 التي يجب عليك تجربتها",
    slug: "best-action-games-2026",
    excerpt: "تعرف على قائمة أقوى ألعاب الأكشن والمغامرات التي ستصدر هذا العام مع مراجعة شاملة لأسلوب اللعب والرسوميات.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    author: "أحمد علي",
    publishedAt: "2026-03-20T10:00:00Z",
    views: 1250,
    category: "ألعاب",
    tags: ["أكشن", "2026", "مراجعات"]
  },
  {
    id: "2",
    title: "كيفية حماية هاتفك وتطبيقاتك من الاختراق والبرمجيات الضارة",
    slug: "protect-your-phone-security",
    excerpt: "دليل شامل لأهم الخطوات والإجراءات التي تضمن لك أماناً تاماً لهاتفك وحماية بياناتك الشخصية من المتطفلين.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    author: "سارة محمود",
    publishedAt: "2026-03-18T14:30:00Z",
    views: 840,
    category: "تقنية",
    tags: ["أمان", "خصوصية", "نصائح"]
  },
  {
    id: "3",
    title: "مراجعة شاملة لأفضل تطبيقات المونتاج على الجوال",
    slug: "best-video-editing-apps-mobile",
    excerpt: "إذا كنت صانع محتوى، فإليك أفضل التطبيقات التي ستساعدك على إنتاج فيديوهات احترافية مباشرة من هاتفك.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop",
    author: "محمد حسن",
    publishedAt: "2026-03-15T09:15:00Z",
    views: 2100,
    category: "تطبيقات",
    tags: ["مونتاج", "صناعة محتوى", "تطبيقات"]
  },
  {
    id: "4",
    title: "أسرار الربح من صناعة محتوى الألعاب في الوطن العربي",
    slug: "earn-money-from-gaming-content",
    excerpt: "اكتشف كيف يمكنك تحويل شغفك بالألعاب إلى مصدر دخل حقيقي ومستدام من خلال المنصات المختلفة.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop",
    author: "ياسين كريم",
    publishedAt: "2026-03-12T11:00:00Z",
    views: 3500,
    category: "انضم إلينا",
    tags: ["ربح", "يوتيوب", "ألعاب"]
  }
];

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
        // Use Mock Data if API fails or doesn't exist
        setPosts(MOCK_POSTS);
        const uniqueCategories = Array.from(
          new Set(MOCK_POSTS.map((p) => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();

      const postsArray = data.posts || (Array.isArray(data) ? data : []);
      
      if (postsArray.length === 0) {
        setPosts(MOCK_POSTS);
        const uniqueCategories = Array.from(
          new Set(MOCK_POSTS.map((p) => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      } else {
        setPosts(postsArray);
        const uniqueCategories = Array.from(
          new Set(postsArray.map((p: BlogPost) => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error: any) {
      console.error("Error fetching blog posts:", error);
      setPosts(MOCK_POSTS);
      const uniqueCategories = Array.from(
        new Set(MOCK_POSTS.map((p) => p.category).filter(Boolean))
      ) as string[];
      setCategories(uniqueCategories);
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
        {/* Join Us Ad Card (Copying About Us Sidebar pattern) */}
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
        </div>

        {/* Contact/Newsletter Card */}
        <div className="rounded-[3rem] border border-[#FFEDCC] bg-[#FFF8EE]/30 p-8 border-dashed">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-[#FF8A00]">
              <Icon icon="solar:letter-bold" className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-black text-slate-800">اشترك في النشرة</h4>
            <p className="text-sm font-bold text-slate-500">احصل على آخر المقالات والتحديثات مباشرة في بريدك.</p>
            <div className="w-full space-y-2">
              <input type="email" placeholder="بريدك الإلكتروني" className="w-full px-4 py-3 rounded-xl border border-[#FFEDCC] bg-white outline-none focus:ring-2 ring-[#FF8A00]/20" />
              <button className="w-full py-3 rounded-xl bg-slate-800 text-white font-black hover:bg-slate-700 transition">إرسال</button>
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
}
