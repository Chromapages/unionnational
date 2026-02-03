"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Home,
    ShoppingBag,
    HeartPulse,
    Users,
    FileText,
    Phone,
    ChevronRight,
    Calendar,
    Globe,
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
    { id: "shop", translationKey: "shop", href: "/shop", icon: ShoppingBag },
    { id: "healthCheck", translationKey: "healthCheck", href: "/health-check", icon: HeartPulse },
    { id: "about", translationKey: "about", href: "/about", icon: Users },
    { id: "team", translationKey: "team", href: "/team", icon: Users },
    { id: "blog", translationKey: "blog", href: "/blog", icon: FileText },
    { id: "contact", translationKey: "contact", href: "/contact", icon: Phone },
];

// Animation variants - simplified for reliability
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
    const ctaText = siteSettings?.ctaButtonText || "Book a Call";
    const ctaUrl = siteSettings?.ctaButtonUrl || "/contact";
    const phoneNumber = siteSettings?.phone || "(801) 890-1040";
    const phoneHref = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`;

    // Close on route change with a small delay to prevent flickering
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [pathname]); // Only depend on pathname, not isOpen or onClose

    // Lock body scroll when open
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

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
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
                    {/* Overlay */}
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

                    {/* Sidebar */}
                    <motion.aside
                        key="sidebar"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[360px] xl:hidden"
                    >
                        <div className="h-full w-full bg-brand-950/95 backdrop-blur-xl border-l border-gold-400/30 shadow-[-4px_0_30px_rgba(0,0,0,0.4)] flex flex-col">
                            {/* Header */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex items-center justify-between px-5 py-4 border-b border-gold-400/20"
                            >
                                <span className="text-gold-400 font-semibold text-lg">
                                    {siteSettings?.companyName || "Menu"}
                                </span>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-gold-500/10 transition-all active:scale-95"
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </motion.div>

                            {/* Navigation Links */}
                            <nav
                                className="flex-1 overflow-y-auto py-4 px-3"
                                aria-label="Mobile navigation"
                            >
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
                                                    className={`
                                                        flex items-center gap-4 px-4 py-3.5 rounded-2xl
                                                        transition-all duration-200 no-tap-highlight
                                                        ${active
                                                            ? "bg-gradient-to-r from-gold-500/20 to-gold-500/5 text-gold-400"
                                                            : "text-slate-300 hover:text-white hover:bg-gold-500/10"
                                                        }
                                                        active:scale-[0.98]
                                                    `}
                                                    aria-current={active ? "page" : undefined}
                                                >
                                                    <Icon
                                                        className={`w-5 h-5 ${active ? "text-gold-400" : "text-slate-400"}`}
                                                    />
                                                    <span className="flex-1 font-medium">
                                                        {t(item.translationKey)}
                                                    </span>
                                                    {active && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                                    )}
                                                    <ChevronRight className="w-4 h-4 text-slate-500" />
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </ul>

                                {/* Divider */}
                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="my-6 border-t border-gold-400/20"
                                />

                                {/* Language Toggle */}
                                {/* <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="px-3"
                                >
                                    <div className="flex items-center gap-3 text-slate-400 mb-3">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm font-medium uppercase tracking-wider">
                                            {t("language")}
                                        </span>
                                    </div>
                                    <LanguageSwitcher />
                                </motion.div> */}
                            </nav>

                            {/* Footer - CTA & Contact */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="p-5 border-t border-gold-400/20 space-y-4"
                            >
                                {/* Phone */}
                                <a
                                    href={phoneHref}
                                    className="flex items-center gap-3 text-slate-300 hover:text-gold-400 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">{phoneNumber}</span>
                                </a>

                                {/* CTA Button */}
                                <Link
                                    href={ctaUrl}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-to-r from-gold-500 to-gold-600 text-brand-950 font-semibold rounded-xl shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all no-tap-highlight"
                                >
                                    <Calendar className="w-5 h-5" />
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
