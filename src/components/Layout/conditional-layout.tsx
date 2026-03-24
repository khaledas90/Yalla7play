"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideAds } from "./side-ads";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboardRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Header />
      <div className="relative">
        <SideAds />
        <div className="relative z-0">
          {children}
        </div>
      </div>
      <Footer />
    </SidebarProvider>
  );
}
