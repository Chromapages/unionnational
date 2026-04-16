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
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

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

const navItems = [
    { id: "home", translationKey: "home", href: "/", icon: Home },
    { id: "services", translationKey: "services", href: "/services", icon: FileText },
    { id: "industries", translationKey: "industries", href: "/industries", icon: Briefcase },
    { id: "shop", translationKey: "shop", href: "/shop", icon: ShoppingBag },
    { id: "about", translationKey: "about", href: "/about", icon: Users },
    { id: "faq", translationKey: "faq", href: "/faq", icon: CircleHelp },
    { id: "contact", translationKey: "contact", href: "/contact", icon: Phone },
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
            damping: 25,
            stiffness: 200,
            staggerChildren: 0.03,
            delayChildren: 0.05,
        },
    },
    exit: {
        x: "100%",
        transition: {
            type: "spring" as const,
            damping: 30,
            stiffness: 250,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            damping: 20,
            stiffness: 300,
        },
    },
    exit: {
        opacity: 0,
        x: 10,
        transition: { duration: 0.15 },
    },
};

export function MobileSidebar({ isOpen, onClose, siteSettings }: MobileSidebarProps) {
    const t = useTranslations("Header");
    const pathname = usePathname();
    const previousPathnameRef = useRef(pathname);
    const ctaText = siteSettings?.ctaButtonText || t("bookCall");
    const ctaUrl = siteSettings?.ctaButtonUrl || "/book";
    const phoneNumber = siteSettings?.phone || "(801) 890-1040";
    const phoneHref = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`;

    useEffect(() => {
        if (isOpen && previousPathnameRef.current !== pathname) {
            previousPathnameRef.current = pathname;
            const timer = window.setTimeout(() => {
                onClose();
            }, 50);
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
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
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
                        transition={{ duration: 0.25 }}
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
                        className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[360px] xl:hidden"
                    >
                        <div className="flex h-full w-full flex-col border-l border-gold-400/30 bg-brand-950/95 shadow-[-4px_0_30px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex items-center justify-between border-b border-gold-400/20 px-5 py-4"
                            >
                                <span className="text-lg font-semibold text-gold-400">
                                    {siteSettings?.companyName || "Menu"}
                                </span>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl p-2 text-white/70 transition-all hover:bg-gold-500/10 hover:text-white active:scale-95"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </motion.div>

                            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                                <ul className="space-y-1">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.href);
                                        return (
                                            <motion.li
                                                key={item.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "no-tap-highlight flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]",
                                                        active
                                                            ? "bg-gradient-to-r from-gold-500/20 to-gold-500/5 text-gold-400"
                                                            : "text-slate-300 hover:bg-gold-500/10 hover:text-white"
                                                    )}
                                                    aria-current={active ? "page" : undefined}
                                                >
                                                    <Icon
                                                        aria-hidden="true"
                                                        className={cn("h-5 w-5", active ? "text-gold-400" : "text-slate-400")}
                                                    />
                                                    <span className="flex-1 font-medium">
                                                        {t(item.translationKey)}
                                                    </span>
                                                    {active && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                                                    )}
                                                    <ChevronRight aria-hidden="true" className="h-4 w-4 text-slate-500" />
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </ul>

                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="my-6 border-t border-gold-400/20"
                                />
                            </nav>

                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4 border-t border-gold-400/20 p-5"
                            >
                                <a
                                    href={phoneHref}
                                    className="flex items-center gap-3 text-slate-300 transition-colors hover:text-gold-400"
                                >
                                    <Phone className="h-4 w-4" aria-hidden="true" />
                                    <span className="text-sm">{phoneNumber}</span>
                                </a>

                                <Link
                                    href={ctaUrl}
                                    className="no-tap-highlight flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-3.5 font-semibold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:scale-[1.02] hover:shadow-gold-500/30 active:scale-[0.98]"
                                >
                                    <Calendar className="h-5 w-5" aria-hidden="true" />
                                    {ctaText}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

function cn(...classes: Array<string | false>) {
    return classes.filter(Boolean).join(" ");
}
