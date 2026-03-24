"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

interface HeaderSearchProps {
    brandColor: string;
}

export function HeaderSearch({ brandColor }: HeaderSearchProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelect = (href: string) => {
        setOpen(false);
        router.push(href);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center p-2 rounded-xl border border-gray-200 bg-white/80 hover:bg-gray-50 transition-all duration-200 outline-none ring-blue-400/30 focus:ring group"
                style={{ color: brandColor }}
                title="بحث (Ctrl+K)"
            >
                <Icon icon="solar:magnifer-linear" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="ابحث عن ألعاب، تطبيقات، أو مقالات..." className="text-right" />
                <CommandList className="text-right">
                    <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
                    <CommandGroup heading="اقتراحات سريعة">
                        <CommandItem onSelect={() => handleSelect("/games")} className="flex-row-reverse gap-2 cursor-pointer">
                            <Icon icon="solar:gamepad-linear" className="w-4 h-4" />
                            <span>الألعاب</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("/applications")} className="flex-row-reverse gap-2 cursor-pointer">
                            <Icon icon="solar:widget-linear" className="w-4 h-4" />
                            <span>التطبيقات</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("/blog")} className="flex-row-reverse gap-2 cursor-pointer">
                            <Icon icon="solar:notes-linear" className="w-4 h-4" />
                            <span>المدونة</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="روابط مفيدة">
                        <CommandItem onSelect={() => handleSelect("/about-us")} className="flex-row-reverse gap-2 cursor-pointer">
                            <Icon icon="solar:info-circle-linear" className="w-4 h-4" />
                            <span>من نحن</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("/contact-us")} className="flex-row-reverse gap-2 cursor-pointer">
                            <Icon icon="solar:phone-calling-linear" className="w-4 h-4" />
                            <span>اتصل بنا</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
