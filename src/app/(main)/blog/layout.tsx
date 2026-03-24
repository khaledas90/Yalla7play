import type { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "المدونة - يلا7 بلاي",
    description: "تابع المدونة في يلا7 بلاي لقراءة مقالات عن الألعاب والتطبيقات التي تهمك في الوطن العربي.",
    url: "/blog",
  });
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
