import { prisma } from "@/lib/db";
import { computePopularityScore } from "@/lib/platform";
import { revalidatePath } from "next/cache";

async function createGame(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const categoryId = String(formData.get("categoryId") || "").trim();
  if (!title || !slug || !categoryId) return;
  await prisma.game.create({
    data: {
      title,
      slug,
      categoryId,
      popularityScore: computePopularityScore({ downloads: 0, views: 0, rating: 0 }),
    },
  });
  revalidatePath("/admin/content/games");
}

export default async function AdminGamesPage() {
  const [games, categories] = await Promise.all([
    prisma.game.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Games</h1>
      <form action={createGame} className="grid gap-3 rounded-xl border p-4 md:grid-cols-4">
        <input name="title" placeholder="Title" className="rounded border px-3 py-2" required />
        <input name="slug" placeholder="slug" className="rounded border px-3 py-2" required />
        <select name="categoryId" className="rounded border px-3 py-2" required>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white">Create</button>
      </form>
      <div className="rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-right">Title</th>
              <th className="p-3 text-right">Category</th>
              <th className="p-3 text-right">Downloads</th>
              <th className="p-3 text-right">Rating</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-t">
                <td className="p-3">{game.title}</td>
                <td className="p-3">{game.category.name}</td>
                <td className="p-3">{game.downloads}</td>
                <td className="p-3">{game.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
