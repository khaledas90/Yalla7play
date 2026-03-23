"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Role } from "@prisma/client";
import {
  AppWindow,
  BarChart3,
  Book,
  FolderTree,
  LayoutDashboard,
  Megaphone,
  Menu,
  Home,
  Settings,
  Users,
  X,
  Gamepad2,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/content/games", label: "Games", icon: Gamepad2 },
  { href: "/admin/content/apps", label: "Apps", icon: AppWindow },
  { href: "/admin/content/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/content/blog", label: "Blog", icon: Book },
  { href: "/admin/content/ads", label: "Ads", icon: Megaphone },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/employees", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

interface AdminSidebarProps {
  userRole: Role;
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getVisibleNavItems = (): NavItem[] => {
    if (["ADMIN", "SUPER_ADMIN"].includes(String(userRole))) {
      return DASHBOARD_NAV_ITEMS;
    }

    return [];
  };

  const visibleNavItems = getVisibleNavItems();

  return (
    <>
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-64 transform border-l border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-slate-200 px-6">
            <h2 className="text-lg font-semibold text-slate-900">
              لوحة الإدارة
            </h2>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {visibleNavItems.length > 0 ? (
              visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-md font-medium transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">
                لا توجد صفحات متاحة
              </div>
            )}
            <div className="mt-4 border-t border-slate-200 pt-4">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-md font-medium transition-colors",
                  "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Home className="h-5 w-5" />
                العودة للموقع
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
