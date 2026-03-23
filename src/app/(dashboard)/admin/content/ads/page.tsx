import { prisma } from "@/lib/db";
import { AdPosition, AdType } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function createAd(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  await prisma.ad.create({
    data: {
      title,
      position: String(formData.get("position") || "BETWEEN_ITEMS") as AdPosition,
      type: String(formData.get("type") || "IMAGE") as AdType,
      imageUrl: String(formData.get("imageUrl") || "").trim() || null,
      link: String(formData.get("link") || "").trim() || null,
      script: String(formData.get("script") || "").trim() || null,
      frequency: Number(formData.get("frequency") || 5),
      isActive: formData.get("isActive") === "on",
    },
  });
  revalidatePath("/admin/content/ads");
}

export default async function AdminAdsPage() {
  const ads = await prisma.ad.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Ads</h1>
      <form action={createAd} className="grid gap-3 rounded-xl border p-4 md:grid-cols-3">
        <input name="title" placeholder="Title" className="rounded border px-3 py-2" required />
        <select name="position" className="rounded border px-3 py-2">
          <option value="HEADER">Header</option>
          <option value="SIDEBAR">Sidebar</option>
          <option value="BETWEEN_ITEMS">Between items</option>
          <option value="FOOTER">Footer</option>
          <option value="POPUP">Popup</option>
        </select>
        <select name="type" className="rounded border px-3 py-2">
          <option value="IMAGE">Image</option>
          <option value="SCRIPT">Script</option>
        </select>
        <input name="imageUrl" placeholder="Image URL" className="rounded border px-3 py-2" />
        <input name="link" placeholder="Ad Link" className="rounded border px-3 py-2" />
        <input name="frequency" type="number" min={1} defaultValue={5} className="rounded border px-3 py-2" />
        <textarea name="script" placeholder="Ad script (optional)" className="rounded border px-3 py-2 md:col-span-3" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked />
          Enabled
        </label>
        <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white">Create</button>
      </form>
      <div className="rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-right">Title</th>
              <th className="p-3 text-right">Placement</th>
              <th className="p-3 text-right">Type</th>
              <th className="p-3 text-right">Enabled</th>
              <th className="p-3 text-right">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id} className="border-t">
                <td className="p-3">{ad.title}</td>
                <td className="p-3">{ad.position}</td>
                <td className="p-3">{ad.type}</td>
                <td className="p-3">{ad.isActive ? "Yes" : "No"}</td>
                <td className="p-3">{ad.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
