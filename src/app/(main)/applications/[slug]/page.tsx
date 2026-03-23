import { getAppBySlug } from "@/lib/platform";
import { notFound } from "next/navigation";

export default async function AppDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return notFound();

  return (
    <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-white p-8 text-slate-900 shadow-sm">
        <h1 className="text-3xl font-black">{app.title}</h1>
        <p className="mt-2 text-slate-600">{app.description || "لا يوجد وصف حاليا."}</p>
        <div className="mt-4 text-sm text-blue-700">القسم: {app.category.name}</div>
      </div>
    </main>
  );
}
