"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { HeaderSearch } from "./header-search";


const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "الألعاب", href: "/games" },
  { name: "التطبيقات", href: "/applications" },
  { name: "المدونة", href: "/blog" },
  { name: "من نحن", href: "/about-us" },
  { name: "اتصل بنا", href: "/contact-us" },
];

const BRAND = "#FF8A00";

const WHATSAPP_NUMBER = "962781858647";
const WHATSAPP_TEXT = encodeURIComponent(
  "مرحبًا، أود الحصول على استشارة لتحديد الخدمة الأكاديمية المناسبة."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;


export function HeaderClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // ✅ سلاسة التنقل
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // ✅ لما يتغير المسار نعتبر التنقل انتهى
  useEffect(() => {
    if (!isNavigating) return;

    // خلي شريط التحميل يوصل للآخر بنعومة
    setProgress(100);
    const t1 = window.setTimeout(() => setIsNavigating(false), 220);
    const t2 = window.setTimeout(() => setProgress(0), 420);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, isNavigating]);

  // ✅ Prefetch للصفحات عشان التنقل يصير أسرع
  useEffect(() => {
    // ملاحظة: router.prefetch موجودة في Next 13+ (App Router)
    navigation.forEach((item) => {
      try {
        router.prefetch?.(item.href);
      } catch { }
    });
  }, [router]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const scrollToTopSmooth = useCallback(() => {
    // requestAnimationFrame لنتأكد أنه بعد التحديث
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  const startFakeProgress = useCallback(() => {
    setIsNavigating(true);
    setProgress(12);

    // تقدّم تدريجي “وهمي” يعطي إحساس سلاسة
    const steps = [24, 38, 52, 66, 78, 86, 92];
    let i = 0;

    const tick = () => {
      if (!document || i >= steps.length) return;
      setProgress((p) => (p < steps[i] ? steps[i] : p));
      i += 1;
      if (i < steps.length) window.setTimeout(tick, 120);
    };

    window.setTimeout(tick, 120);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      if (isNavigating) return; // ✅ امنع ضغط متكرر
      setIsMobileMenuOpen(false);

      // نفس الصفحة؟ بس Scroll Top
      if (href === "/") {
        if (pathname === "/") {
          scrollToTopSmooth();
          return;
        }
      } else {
        if (pathname === href || pathname.startsWith(href)) {
          scrollToTopSmooth();
          return;
        }
      }

      startFakeProgress();

      startTransition(() => {
        router.push(href, { scroll: false });
      });

      // ✅ ScrollTop بعد push بنعومة وبشكل ثابت
      // (مرتين بحالات نادرة لو كانت الصفحة ثقيلة)
      requestAnimationFrame(scrollToTopSmooth);
      window.setTimeout(scrollToTopSmooth, 120);
    },
    [isNavigating, pathname, router, scrollToTopSmooth, startFakeProgress]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-100"
        : "bg-transparent backdrop-blur-sm"
        }`}
    >
      {/* ✅ Top Loading Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <div
          className="h-full transition-[width] duration-200 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, rgba(255,138,0,0.0), rgba(255,138,0,0.95), rgba(255,138,0,0.0))",

            opacity: isNavigating ? 1 : 0,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <nav className="flex items-center justify-between h-20">
          {/* LOGO */}
          <button
            type="button"
            onClick={() => handleNavClick("/")}
            className="flex cursor-pointer items-center gap-3 text-right"
          >
            <div className="relative w-26 h-26 flex items-center justify-center ">
              <Image src={logo} alt="يلا بلاي" width={100} height={100} priority />
            </div>


          </button>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center mx-8">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  disabled={isNavigating}
                  className={`relative cursor-pointer px-4 py-2 rounded-xl text-md font-medium transition ${active
                    ? "bg-[#FFF8EE]"
                    : "text-gray-700 hover:bg-gray-50"
                    } ${isNavigating ? "opacity-70 cursor-not-allowed" : ""}`}

                  style={{ color: active ? BRAND : undefined }}
                >
                  {item.name}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: BRAND }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4 px-3">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <Icon icon="solar:user-bold" className="w-4 h-4" />
              انشاء حساب
            </Link>
            {/* <Link 
              href="/join-us" 
              className="flex items-center gap-2 rounded-xl bg-[#FF8A00] px-5 py-2.5 text-sm font-black text-white transition-all hover:bg-[#e67e00] shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <Icon icon="solar:crown-minimalistic-bold" className="w-4 h-4" />
              انضم إلينا
            </Link> */}
            <HeaderSearch brandColor={BRAND} />
          </div>


          <div className="hidden lg:flex items-center">

          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <HeaderSearch brandColor={BRAND} />
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="cursor-pointer p-2.5"
              style={{ color: BRAND }}
              disabled={isNavigating}
            >
              {isMobileMenuOpen ? (
                <Icon icon="solar:close-circle-bold" className="w-7 h-7" />
              ) : (
                <Icon icon="solar:hamburger-menu-bold" className="w-7 h-7" />
              )}
            </button>
          </div>

        </nav>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 mt-4">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    disabled={isNavigating}
                    className={`text-right cursor-pointer px-4 py-3 rounded-xl text-sm font-medium transition ${active
                      ? "bg-[#FFF8EE]"
                      : "text-gray-700 hover:bg-gray-50"
                      } ${isNavigating ? "opacity-70 cursor-not-allowed" : ""}`}

                    style={{ color: active ? BRAND : undefined }}
                  >
                    {item.name}
                  </button>
                );
              })}

              {/* MOBILE WHATSAPP (ONLY INSIDE MENU) */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    flex items-center justify-center gap-2
                    px-3.5 py-2.5
                    rounded-xl
                    text-sm font-semibold
                    text-white
                    shadow-sm
                    transition-all duration-200
                    active:scale-[0.97]
                  "
                  style={{ backgroundColor: BRAND }}
                >
                  <Icon
                    icon="logos:whatsapp-icon"
                    className="w-4 h-4"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}