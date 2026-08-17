"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    type LucideIcon,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { getBookingCtaText, getBookingHref } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import {
    isNavigationPathActive,
    mobileNavigationSections,
    type NavigationIconName,
} from "@/components/layout/navigationData";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    siteSettings?: {
        companyName?: string;
        ctaButtonTextLocalized?: string;
        ctaButtonUrl?: string;
    };
}

const navigationIcons: Record<NavigationIconName, LucideIcon> = {
    Home,
    FileText,
    Briefcase,
    BookOpen,
    Users,
    Phone,
    CircleHelp,
    ShoppingBag,
};

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
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const asideRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
    const ctaText = getBookingCtaText(siteSettings?.ctaButtonTextLocalized, t("bookCall"));
    const ctaUrl = getBookingHref(siteSettings?.ctaButtonUrl);
    useEffect(() => setPortalTarget(document.body), []);

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
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        const backgroundElements = Array.from(
            document.querySelectorAll<HTMLElement>("header, main, footer"),
        ).filter((element) => !element.contains(asideRef.current));
        const previousInertState = backgroundElements.map((element) => ({
            element,
            wasInert: element.hasAttribute("inert"),
        }));

        backgroundElements.forEach((element) => element.setAttribute("inert", ""));
        const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

        return () => {
            cancelAnimationFrame(focusFrame);
            previousInertState.forEach(({ element, wasInert }) => {
                if (!wasInert) element.removeAttribute("inert");
            });

            const previousFocus = previousFocusRef.current;
            requestAnimationFrame(() => {
                if (previousFocus?.isConnected) previousFocus.focus();
            });
        };
    }, [isOpen]);

    const isActive = useCallback(
        (href: string) => isNavigationPathActive(pathname, href),
        [pathname]
    );

    const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            onClose();
            return;
        }

        if (event.key !== "Tab") return;

        const focusableElements = Array.from(
            asideRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ) || [],
        ).filter((element) => !element.hasAttribute("disabled"));

        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    if (!portalTarget) return null;

    return createPortal(
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
                        ref={asideRef}
                        key="sidebar"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        id="mobile-navigation"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t("mobileNavigationAria")}
                        onKeyDown={handleDialogKeyDown}
                        className="fixed top-0 right-0 bottom-0 z-[70] w-[88vw] max-w-[380px] flex flex-col"
                    >
                        <div className="flex h-full w-full flex-col bg-brand-950 border-l border-gold-500/20 shadow-[-4px_0_40px_rgba(0,0,0,0.5)]">

                            {/* Header bar */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
                                <span className="text-base font-semibold text-gold-400 font-heading tracking-tight">
                                    {siteSettings?.companyName || t("menuTitle")}
                                </span>
                                <button
                                    ref={closeButtonRef}
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
                                    {mobileNavigationSections.map((section) => (
                                        <div key={section.id}>
                                            <ul className="space-y-0.5">
                                                {section.items.map((item) => {
                                                    const Icon = navigationIcons[item.icon];
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
                                    <LocaleSwitcher mobileDrawer onLocaleChange={onClose} />
                                </motion.div>
                            </nav>

                            {/* Footer: one clear primary action — sticky at bottom */}
                            <div className="shrink-0 border-t border-white/5 p-5 space-y-3">
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
        </AnimatePresence>,
        portalTarget,
    );
}
