"use client";

import { useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Home,
    ShoppingBag,
    Users,
    FileText,
    Phone,
    ChevronRight,
    Calendar,
    Briefcase,
    CircleHelp,
    BookOpen,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { getBookingHref } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    siteSettings?: {
        companyName?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        phone?: string;
    };
}

// Grouped nav items: [label, items]
const navSections = [
    {
        id: "main",
        label: null,
        items: [
            { id: "home", translationKey: "home", href: "/", icon: Home },
            { id: "services", translationKey: "services", href: "/services", icon: FileText },
            { id: "industries", translationKey: "industries", href: "/industries", icon: Briefcase },
            { id: "about", translationKey: "about", href: "/about", icon: Users },
        ],
    },
    {
        id: "support",
        label: null,
        items: [
            { id: "faq", translationKey: "faq", href: "/faq", icon: CircleHelp },
            { id: "contact", translationKey: "contact", href: "/contact", icon: Phone },
        ],
    },
    {
        id: "more",
        label: null,
        items: [
            { id: "resources", translationKey: "resources", href: "/resources", icon: BookOpen },
            { id: "shop", translationKey: "shop", href: "/shop", icon: ShoppingBag },
        ],
    },
];

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
        x: 0,
        transition: {
            type: "spring" as const,
            damping: 28,
            stiffness: 220,
            staggerChildren: 0.04,
            delayChildren: 0.06,
        },
    },
    exit: {
        x: "100%",
        transition: {
            type: "spring" as const,
            damping: 30,
            stiffness: 260,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            damping: 22,
            stiffness: 300,
        },
    },
    exit: {
        opacity: 0,
        x: 8,
        transition: { duration: 0.12 },
    },
};

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export function MobileSidebar({ isOpen, onClose, siteSettings }: MobileSidebarProps) {
    const t = useTranslations("Header");
    const pathname = usePathname();
    const previousPathnameRef = useRef(pathname);
    const ctaText = siteSettings?.ctaButtonText || t("bookCall");
    const ctaUrl = getBookingHref(siteSettings?.ctaButtonUrl);
    const phoneNumber = siteSettings?.phone || "(801) 890-1040";
    const phoneHref = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`;

    useEffect(() => {
        if (isOpen && previousPathnameRef.current !== pathname) {
            previousPathnameRef.current = pathname;
            const timer = window.setTimeout(() => onClose(), 50);
            return () => window.clearTimeout(timer);
        }
        previousPathnameRef.current = pathname;
    }, [isOpen, onClose, pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    const isActive = useCallback(
        (href: string) => {
            if (href === "/") return pathname === "/";
            return pathname.startsWith(href);
        },
        [pathname]
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    <motion.aside
                        key="sidebar"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        id="mobile-navigation"
                        className="fixed top-0 right-0 bottom-0 z-[70] w-[88vw] max-w-[380px] flex flex-col"
                    >
                        <div className="flex h-full w-full flex-col bg-brand-950 border-l border-gold-500/20 shadow-[-4px_0_40px_rgba(0,0,0,0.5)]">

                            {/* Header bar */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
                                <span className="text-base font-semibold text-gold-400 font-heading tracking-tight">
                                    {siteSettings?.companyName || t("menuTitle")}
                                </span>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg p-2 text-white/50 hover:text-white hover:bg-white/5 transition-all active:scale-95"
                                    aria-label={t("closeMenu")}
                                >
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Nav — scrollable */}
                            <nav
                                className="flex-1 overflow-y-auto px-4 py-5"
                                aria-label={t("mobileNavigationAria")}
                            >
                                <motion.div
                                    variants={sectionVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-6"
                                >
                                    {navSections.map((section) => (
                                        <div key={section.id}>
                                            <ul className="space-y-0.5">
                                                {section.items.map((item) => {
                                                    const Icon = item.icon;
                                                    const active = isActive(item.href);
                                                    return (
                                                        <motion.li key={item.id} variants={itemVariants}>
                                                            <Link
                                                                href={item.href}
                                                                onClick={onClose}
                                                                className={cn(
                                                                    "no-tap-highlight flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all duration-150 active:scale-[0.98]",
                                                                    active
                                                                        ? "bg-gold-500/15 text-gold-400"
                                                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                                                )}
                                                                aria-current={active ? "page" : undefined}
                                                            >
                                                                <Icon
                                                                    aria-hidden="true"
                                                                    className={cn("h-4 w-4 shrink-0", active ? "text-gold-400" : "text-white/30")}
                                                                />
                                                                <span className="flex-1 text-sm font-medium">
                                                                    {t(item.translationKey)}
                                                                </span>
                                                                {active && (
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                                                                )}
                                                                {!active && (
                                                                    <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-white/20 shrink-0" />
                                                                )}
                                                            </Link>
                                                        </motion.li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Language at bottom of nav */}
                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="mt-6 pt-5 border-t border-white/5"
                                >
                                    <LocaleSwitcher mobileDrawer />
                                </motion.div>
                            </nav>

                            {/* Footer: phone + CTA — sticky at bottom */}
                            <div className="shrink-0 border-t border-white/5 p-5 space-y-3">
                                <a
                                    href={phoneHref}
                                    className="flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
                                >
                                    <Phone className="h-4 w-4 text-gold-400/70" aria-hidden="true" />
                                    {phoneNumber}
                                </a>

                                <Link
                                    href={ctaUrl}
                                    onClick={onClose}
                                    className="no-tap-highlight flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 font-bold text-sm text-brand-900 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 active:scale-[0.98] font-heading tracking-tight"
                                >
                                    <Calendar className="h-4 w-4" aria-hidden="true" />
                                    {ctaText}
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
