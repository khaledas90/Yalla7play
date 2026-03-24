"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import AnimatedContent from "@/components/animated-content";

import logo from "@/assets/logo.png";

const BRAND = "#3B82F6";
const WHATSAPP_NUMBER = "962781858647";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// ضع روابطك الفعلية هون
const socialLinks = [
  { label: "Facebook", icon: "simple-icons:facebook", href: "https://www.facebook.com" },
  { label: "Instagram", icon: "simple-icons:instagram", href: "https://www.instagram.com" },
  { label: "WhatsApp", icon: "simple-icons:whatsapp", href: WHATSAPP_LINK },
  { label: "X", icon: "simple-icons:x", href: "https://x.com/sheelhammy" },
] as const;

const footerLinks = {
  contact: [
    {
      name: "besopubgmobile@gmail.com",
      href: "mailto:besopubgmobile@gmail.com",
      icon: "solar:letter-bold",
    },
    {
      name: (
        <span dir="ltr" className="inline-block">
          +20 10 35445759
        </span>
      ),
      href: "tel:+201035445759",
      icon: "solar:phone-calling-bold",
    },
    {
      name: "دعم متاح 24/7",
      href: "#",
      icon: "solar:global-bold",
    },
  ],
  company: [
    { name: "المدونة", href: "/blog" },
    { name: "من نحن", href: "/about-us" },
    { name: "الألعاب", href: "/games" },
    { name: "التطبيقات", href: "/applications" },
    { name: "اتصل بنا", href: "/contact-us" },
    { name: "انضم للعمل معنا", href: "/join-us" },
  ],
  policies: [
    { name: "شروط الاستخدام", href: "/terms" },
    { name: "سياسة الخصوصية", href: "/privacy-policy" },
    { name: "إخلاء مسؤولية", href: "/disclaimer" },

  ],
};



function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-slate-900 font-bold text-base md:text-lg mb-4 tracking-tight">
      {children}
    </h4>
  );
}

function FooterItem({
  href,
  icon,
  children,
  external,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-3 text-slate-600 hover:text-slate-900 transition break-words"
    >
      <Icon
        icon={icon}
        className="w-5 h-5 mt-0.5 text-slate-400 group-hover:text-[#0056D2] transition flex-shrink-0"
      />
      <span className="leading-relaxed text-sm md:text-base break-words min-w-0">{children}</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative bg-white/70 text-slate-900 border-t border-blue-100 overflow-hidden backdrop-blur"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#0056D2]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <AnimatedContent distance={18} duration={0.65} className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="يلا بلاي" width={44} height={44} />
              <span className="text-xl font-extrabold">
                Yalla<span style={{ color: BRAND }}>7Play</span>
              </span>
            </Link>

            <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed max-w-md break-words font-medium">
              يلا7 بلاي هي منصتك العصرية لاكتشاف وتحميل أفضل الألعاب والتطبيقات المختارة بعناية، مع توفير تجربة مستخدم سريعة وآمنة.
            </p>
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl border border-blue-100 bg-white flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition flex-shrink-0"
                >
                  <Icon
                    icon={s.icon}
                    className="w-5 h-5 text-slate-700"
                  />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/join-us" className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-sm font-black text-orange-600 transition hover:bg-orange-100 border border-orange-100">
                <Icon icon="solar:crown-minimalistic-bold" className="w-4 h-4" />
                برنامج الناشرين
              </Link>
            </div>
          </AnimatedContent>
          <AnimatedContent distance={18} duration={0.65} delay={0.06} className="sm:col-span-1 lg:col-span-3">
            <SectionTitle>تواصل معنا</SectionTitle>
            <div className="space-y-4">
              {footerLinks.contact.map((item) => (
                <FooterItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  external={item.href.startsWith("http")}
                >
                  {item.name}
                </FooterItem>
              ))}
            </div>
          </AnimatedContent>


          <AnimatedContent distance={18} duration={0.65} delay={0.12} className="sm:col-span-1 lg:col-span-2">
            <SectionTitle>روابط سريعة</SectionTitle>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 text-sm md:text-base transition block break-words"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedContent>

          <AnimatedContent distance={18} duration={0.65} delay={0.18} className="sm:col-span-2 lg:col-span-3">
            <SectionTitle>السياسات</SectionTitle>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 text-sm md:text-base transition block break-words"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedContent>
        </div>
      </div>
      <div className="border-t border-blue-100">
        <AnimatedContent distance={14} duration={0.6} delay={0.06}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-center">
            <p className="text-slate-500 text-xs sm:text-sm md:text-base text-center md:text-right break-words">
              © {new Date().getFullYear()} Yalla7Play - All rights reserved
            </p>


          </div>
        </AnimatedContent>
      </div>
    </footer>
  );
}