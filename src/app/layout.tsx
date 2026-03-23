import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import { BackToTop } from "@/components/common/back-to-top";
import { ConditionalLayout } from "@/components/Layout/conditional-layout";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ConditionalAnimation from "@/components/ConditionalAnimation";
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    icons: {
      icon: "/logo.svg",
      apple: "/logo.svg",
      shortcut: "/logo.svg",
    },
  };
}



export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang={"ar"}
      dir="rtl"
      className={tajawal.variable}
      suppressHydrationWarning
    >
      <body className={`${tajawal.className} antialiased`}>
        <Providers>
          <ConditionalAnimation>
            <Analytics />
            <SpeedInsights />
            <SettingsProvider>
              <Toaster richColors position="top-right" />
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
              <BackToTop />
            </SettingsProvider>
          </ConditionalAnimation>
        </Providers>
      </body>
    </html>
  );
}
