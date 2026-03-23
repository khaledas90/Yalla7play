import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/config";
import { AdminSidebar } from "./_components/AdminSidebar";
import { AdminHeader } from "./_components/AdminHeader";
import { Role } from "@prisma/client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const loginUrl = "/login?callbackUrl=/admin";

  if (!session?.user) {
    redirect(loginUrl);
  }

  const userRoleRaw = String(session.user.role || "").toUpperCase();
  const isAdminUser = userRoleRaw === "ADMIN" || userRoleRaw === "SUPER_ADMIN";
  if (!isAdminUser) {
    redirect("/profile");
  }

  const userRole: Role = (userRoleRaw as Role) || Role.ADMIN;
  const user = {
    name: session.user.name || "Admin",
    email: session.user.email || "",
    avatar: (session.user as { avatar?: string | null }).avatar || null,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AdminSidebar userRole={userRole} />
      <div className="flex flex-1 flex-col overflow-hidden lg:mr-64">
        <AdminHeader user={user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
