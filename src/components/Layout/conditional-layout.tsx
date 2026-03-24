"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { SidebarProvider } from "@/components/ui/sidebar";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboardRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Header />
      {children}
      <Footer />
    </SidebarProvider>
  );
}
