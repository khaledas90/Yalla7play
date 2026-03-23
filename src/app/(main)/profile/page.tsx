import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=/profile");
    }

    return (
        <div className="mx-auto max-w-2xl p-6" dir="rtl">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h1 className="mb-4 text-2xl font-bold text-slate-900">الملف الشخصي</h1>
                <div className="space-y-3 text-sm text-slate-700">
                    <p>
                        <span className="font-semibold">الاسم:</span>{" "}
                        {session.user.name || "غير محدد"}
                    </p>
                    <p>
                        <span className="font-semibold">البريد الإلكتروني:</span>{" "}
                        {session.user.email || "غير محدد"}
                    </p>
                    <p>
                        <span className="font-semibold">الدور:</span>{" "}
                        {String(session.user.role || "USER")}
                    </p>
                </div>
            </div>
        </div>
    );
}
