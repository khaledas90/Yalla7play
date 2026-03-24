"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import AnimatedContent from "@/components/animated-content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateStructuredData } from "@/lib/seo/structured-data";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  author: string | null;
  publishedAt: string | null;
  views: number;
  category: string | null;
  tags: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

const MOCK_DETAILS: Record<string, BlogPost> = {
  "earn-money-from-gaming-content": {
    id: "4",
    title: "أسرار الربح من صناعة محتوى الألعاب في الوطن العربي",
    slug: "earn-money-from-gaming-content",
    excerpt: "اكتشف كيف يمكنك تحويل شغفك بالألعاب إلى مصدر دخل حقيقي ومستدام من خلال المنصات المختلفة واستراتيجيات التسويق الحديثة.",
    content: `
      <h2>مقدمة في عالم الربح من الألعاب</h2>
      <p>لم يعد اللعب مجرد تسلية فحسب، بل أصبح صناعة تدر مليارات الدولارات سنوياً. في عالمنا العربي، هناك فرص هائلة لصناع المحتوى الذين يمتلكون الشغف والقدرة على تقديم محتوى مميز.</p>
      
      <h3>1. إنشاء قناة على يوتيوب وتويتش</h3>
      <p>البث المباشر (Streaming) هو أحد أسرع الطرق لبناء قاعدة جماهيرية. يمكنك من خلال منصة <strong>Twitch</strong> أو <strong>YouTube Gaming</strong> الحصول على دعم مباشر من المتابعين عبر التبرعات أو الاشتراكات الشهرية.</p>

      <blockquote>
        الصبر والاستمرار هما مفتاح النجاح في عالم صناعة المحتوى. لا تتوقع نتائج سريعة من الشهر الأول.
      </blockquote>

      <h3>2. التسويق بالعمولة (Affiliate Marketing)</h3>
      <p>يمكنك مراجعة الأجهزة والملحقات الخاصة بالألعاب ووضع روابط لشراء هذه المنتجات. ستحصل على عمولة مقابل كل عملية شراء تتم من خلالك.</p>

      <h3>3. الانضمام إلى برنامج يلا7 بلاي</h3>
      <p>نحن في <strong>يلا7 بلاي</strong> نوفر فرصة ذهبية للمبدعين لزيادة أرباحهم من خلال مشاركة روابط الألعاب والتطبيقات الموثوقة والحصول على مكافآت دورية بناءً على الأداء.</p>

      <h3>خاتمة</h3>
      <p>صناعة محتوى الألعاب تتطلب إبداعاً وتطويراً مستمراً. ابدأ الآن بالأدوات المتاحة لك وطوّر مهاراتك مع مرور الوقت.</p>
    `,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop",
    author: "ياسين كريم",
    publishedAt: "2026-03-12T11:00:00Z",
    views: 3500,
    category: "انضم إلينا",
    tags: ["ربح", "يوتيوب", "ألعاب"],
    seoTitle: "الربح من محتوى الألعاب",
    seoDescription: "دليل شامل للربح من صناعة محتوى الألعاب"
  },
  "best-action-games-2026": {
    id: "1",
    title: "أفضل ألعاب الأكشن لعام 2026 التي يجب عليك تجربتها",
    slug: "best-action-games-2026",
    excerpt: "تعرف على قائمة أقوى ألعاب الأكشن والمغامرات التي ستصدر هذا العام مع مراجعة شاملة لأسلوب اللعب والرسوميات.",
    content: `
      <p>هذا العام يعد من أقوى الأعوام لمحبي ألعاب الأكشن. إليكم تفاصيل أهم الإصدارات المرتقبة...</p>
      <h2>ألعاب عالم مفتوح جديدة</h2>
      <p>شهدنا تطوراً مذهلاً في تقنيات الرسوميات وأسلوب اللعب...</p>
    `,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    author: "أحمد علي",
    publishedAt: "2026-03-20T10:00:00Z",
    views: 1250,
    category: "ألعاب",
    tags: ["أكشن", "2026", "مراجعات"],
    seoTitle: "أفضل ألعاب 2026",
    seoDescription: "أفضل ألعاب الأكشن"
  }
};

const MOCK_RELATED = [
  MOCK_DETAILS["earn-money-from-gaming-content"],
  MOCK_DETAILS["best-action-games-2026"]
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [structuredData, setStructuredData] = useState<any>(null);

  // Helper function to parse tags
  const parseTags = (tags: string[] | string | null): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      try {
        const parsed = JSON.parse(tags);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If it's not valid JSON, try splitting by comma
        return tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    return [];
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post && post.publishedAt) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yalla7play.com";
      const image = post.image || `${siteUrl}/og-image.jpg`;
      
      const data = generateStructuredData({
        type: "Article",
        data: {
          headline: post.title,
          description: post.excerpt || "",
          image,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          author: post.author || "يلا7 بلاي",
        },
      });
      setStructuredData(data);
    }
  }, [post]);

  const fetchPost = async () => {

    setIsLoading(true);
    try {
      const response = await fetch(`/api/blog/${slug}`);
      
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        // Use Mock Data
        if (MOCK_DETAILS[slug]) {
          setPost(MOCK_DETAILS[slug]);
          setRelatedPosts(MOCK_RELATED.filter(p => p.slug !== slug).slice(0, 3));
        } else {
          throw new Error("Post not found or invalid response type");
        }
        return;
      }

      const data = await response.json();
      setPost(data);
      
      // Fetch related posts
      fetchRelatedPosts(data.id);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      // Final fallback to mock if available for this slug
      if (MOCK_DETAILS[slug]) {
        setPost(MOCK_DETAILS[slug]);
        setRelatedPosts(MOCK_RELATED.filter(p => p.slug !== slug).slice(0, 3));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedPosts = async (currentPostId: string) => {
    try {
      const response = await fetch(`/api/blog?limit=4`);
      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.includes("application/json")) {
        const data = await response.json();
        const postsArray = data.posts || (Array.isArray(data) ? data : []);
        // Filter out current post and limit to 3
        const filtered = postsArray
          .filter((p: BlogPost) => p.id !== currentPostId)
          .slice(0, 3);
        setRelatedPosts(filtered);
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

 
  const tagsArray = useMemo(() => parseTags(post?.tags || null), [post?.tags]);

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('تم نسخ الرابط بنجاح');
    } catch (error) {
      toast.error('فشل نسخ الرابط');
    }
  };

  const shareOnPlatform = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    const shareLinks: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    };

    const url = shareLinks[platform];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: post?.excerpt || '',
          url: shareUrl,
        });
      } catch (error: any) {
        // User cancelled or error occurred
        if (error.name !== 'AbortError') {
          toast.error('فشل المشاركة');
        }
      }
    } else {
      // Fallback to copy link
      copyLink();
    }
  };

  if (isLoading) {
    return (
      <main>
        <div className="container mt-40 mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <div className="container mx-auto px-4 py-20 text-center">
          <Icon
            icon="solar:document-text-bold"
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
          <Link
            href="/blog"
            className="text-blue-600 hover:underline"
          >
            العودة إلى المدونة
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        {/* Decorative Background Elements */}
        {/* Background mesh (soft) for the whole page body */}
        <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[800px] w-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Custom Blog Detail Hero (About Us Style) */}
          <AnimatedContent distance={22} duration={0.7}>
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#0b1c3d] to-[#1a237e] p-8 md:p-12 text-white shadow-2xl mb-12 md:mb-16">
            <div className="relative z-10 max-w-4xl">
              {/* Category Badge */}
              {post.category && (
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] md:text-xs font-black text-[#FF8A00] uppercase tracking-widest">
                    <Icon icon="solar:bookmark-bold" className="w-3.5 h-3.5" />
                    {post.category}
                  </span>
                </div>
              )}

              
              <h1 className="text-3xl font-black md:text-6xl mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed font-bold opacity-90 max-w-2xl">
                  {post.excerpt}
                </p>
              )}

              {/* Quick Meta in Hero */}
              <div className="mt-8 md:mt-10 flex flex-wrap gap-4 md:gap-6 text-xs md:sm font-bold text-blue-200">

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Icon icon="solar:user-bold" className="w-4 h-4" />
                  </div>
                  <span>{post.author || "فريق يلا7 بلاي"}</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Icon icon="solar:calendar-bold" className="w-4 h-4" />
                  </div>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </div>
            {/* Background elements for hero */}
            <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/5 blur-3xl opacity-30" />
            <div className="absolute -left-10 top-1/4 h-32 w-32 rounded-full bg-[#FF8A00]/10 blur-2xl" />
          </div>
          </AnimatedContent>

        </div>




      <article dir="rtl" className="py-12 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm justify-center lg:justify-start">
              <span className="flex items-center gap-2 text-slate-500 font-bold bg-[#FFF8EE] px-3 py-1.5 rounded-xl border border-orange-100">
                <Icon icon="solar:eye-bold" className="w-4 h-4 text-[#FF8A00]" />
                {post.views} مشاهدة
              </span>
            </div>


 
            {tagsArray.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tagsArray.map((tag: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
 
          {post.image && (
            <div className="flex justify-center mb-12">
              <div className="relative w-[600px] h-[300px]  overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
          )}
 
          <div
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
              prose-h1:text-4xl prose-h1:leading-tight prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
              prose-h2:text-3xl prose-h2:leading-tight prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:leading-tight prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-gray-700 prose-p:mb-6 prose-p:text-lg
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:list-disc prose-ul:pr-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:pr-6 prose-ol:mb-6
              prose-li:mb-2 prose-li:text-gray-700 prose-li:leading-relaxed
              prose-blockquote:border-r-4 prose-blockquote:border-blue-500 prose-blockquote:pr-6 prose-blockquote:py-2 prose-blockquote:my-6 prose-blockquote:bg-blue-50 prose-blockquote:rounded-lg prose-blockquote:italic prose-blockquote:text-gray-700
              prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:border prose-img:border-gray-200
              prose-hr:border-gray-200 prose-hr:my-8
              prose-table:w-full prose-table:my-6 prose-table:border-collapse
              prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:px-4 prose-th:py-2 prose-th:text-right
              prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
             "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 rounded-full bg-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">مقالات ذات صلة</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-blue-200"
                  >
                    {relatedPost.image && (
                      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {relatedPost.category && (
                        <Badge 
                          variant="outline" 
                          className="mb-3 w-fit text-xs"
                        >
                          {relatedPost.category}
                        </Badge>
                      )}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                        {relatedPost.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Icon icon="solar:calendar-bold" className="w-3.5 h-3.5" />
                            {formatDate(relatedPost.publishedAt)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:eye-bold" className="w-3.5 h-3.5" />
                          {relatedPost.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF8A00] text-white font-medium hover:bg-[#e67e00] transition-colors shadow-md hover:shadow-lg"
              >

                <Icon icon="solar:arrow-right-bold" className="w-5 h-5" />
                العودة إلى المدونة
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Icon icon="solar:share-bold" className="w-4 h-4" />
                    مشاركة المقال
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {typeof window !== 'undefined' && 'share' in navigator && (
                    <DropdownMenuItem
                      onClick={handleNativeShare}
                      className="cursor-pointer"
                    >
                      <Icon icon="solar:share-bold" className="w-4 h-4 ml-2" />
                      مشاركة...
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={copyLink}
                    className="cursor-pointer"
                  >
                    <Icon icon="solar:copy-bold" className="w-4 h-4 ml-2" />
                    نسخ الرابط
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => shareOnPlatform('facebook')}
                    className="cursor-pointer"
                  >
                    <Icon icon="mdi:facebook" className="w-4 h-4 ml-2 text-blue-600" />
                    فيسبوك
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => shareOnPlatform('twitter')}
                    className="cursor-pointer"
                  >
                    <Icon icon="simple-icons:x" className="w-4 h-4 ml-2" />
                    تويتر / X
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => shareOnPlatform('whatsapp')}
                    className="cursor-pointer"
                  >
                    <Icon icon="mdi:whatsapp" className="w-4 h-4 ml-2 text-green-600" />
                    واتساب
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => shareOnPlatform('telegram')}
                    className="cursor-pointer"
                  >
                    <Icon icon="mdi:telegram" className="w-4 h-4 ml-2 text-blue-500" />
                    تيليجرام
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => shareOnPlatform('linkedin')}
                    className="cursor-pointer"
                  >
                    <Icon icon="mdi:linkedin" className="w-4 h-4 ml-2 text-blue-700" />
                    لينكد إن
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </article>
      </main>
    </>
  );
}
