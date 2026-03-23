import { prisma } from "@/lib/db";
import { ContentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function createCategory(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const type = String(formData.get("type") || "BOTH") as ContentType;
  if (!name || !slug) return;
  await prisma.category.create({ data: { name, slug, type } });
  revalidatePath("/admin/content/categories");
}

export default async function AdminContentCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <form action={createCategory} className="grid gap-3 rounded-xl border p-4 md:grid-cols-4">
        <input name="name" placeholder="Name" className="rounded border px-3 py-2" required />
        <input name="slug" placeholder="slug" className="rounded border px-3 py-2" required />
        <select name="type" className="rounded border px-3 py-2">
          <option value="GAME">Game</option>
          <option value="APP">App</option>
          <option value="BOTH">Both</option>
        </select>
        <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white">Create</button>
      </form>
      <div className="rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-right">Name</th>
              <th className="p-3 text-right">Slug</th>
              <th className="p-3 text-right">Type</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">{c.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
