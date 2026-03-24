import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export default async function WorkerPage() {
    const session = await auth();
    const role = String(session?.user?.role || "").toUpperCase();

    if (!session?.user) {
        redirect("/login?callbackUrl=/worker");
    }

    if (role !== "WORKER") {
        redirect("/login?error=AccessDenied");
    }

    return (
        <div className="mx-auto max-w-4xl space-y-4 p-6" dir="rtl">
            <h1 className="text-2xl font-bold">لوحة العامل</h1>
            <p className="text-slate-600">
                هذه الصفحة جاهزة للمسارات الخاصة بالعامل (الألعاب، التطبيقات، الإحصائيات، الأرباح).
            </p>
        </div>
    );
}
