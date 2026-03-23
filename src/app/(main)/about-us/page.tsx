import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Yalla7Play platform and our mission.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">About Yalla7Play</h1>
        <p className="mt-4 leading-8 text-slate-700">
          Yalla7Play is a scalable discovery platform for games and applications. We combine
          ranking signals (views, downloads, and ratings), editorial curation, and category-driven
          navigation to help users find quality content quickly.
        </p>
        <p className="mt-3 leading-8 text-slate-700">
          Our team builds a modern, high-performance SaaS architecture with Next.js App Router,
          TypeScript, Prisma, and MySQL, while ensuring a responsive, dark-themed, and highly
          interactive user experience.
        </p>
      </section>
    </main>
  );
}
