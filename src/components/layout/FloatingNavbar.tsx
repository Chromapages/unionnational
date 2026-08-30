"use client";

import { useState, useCallback, useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, Menu as MenuIcon } from "lucide-react";
import { ServicesDropdown } from "./ServicesDropdown";
import { DesktopOverflowMenu } from "./DesktopOverflowMenu";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Link, usePathname } from "@/i18n/navigation";
import {
    desktopPrimaryNavigation,
    desktopSecondaryNavigation,
    isNavigationPathActive,
    isServicePath,
    type ServiceSummary,
} from "./navigationData";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { getBookingCtaText, getBookingHref } from "@/lib/booking";

type FloatingNavbarProps = {
    siteSettings?: {
        logo?: { asset?: { url?: string } };
        logoAlt?: { asset?: { url?: string } };
        companyName?: string;
        ctaButtonTextLocalized?: string;
        ctaButtonUrl?: string;
    };
    services?: ServiceSummary[];
};

const navbarStyles = {
    cta: "hidden md:inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-gold-500 px-5 py-2.5 font-heading text-sm font-bold text-brand-950 transition-colors duration-200 hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none",
} as const;

export const VaultNavbar = ({ siteSettings, services }: FloatingNavbarProps) => {
    const t = useTranslations("Header");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);
    const [openDesktopMenu, setOpenDesktopMenu] = useState<"services" | "more" | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
    const bookingNavigationInProgressRef = useRef(false);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const updateHeaderHeight = () => {
            document.documentElement.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`);
        };

        updateHeaderHeight();
        const observer = new ResizeObserver(updateHeaderHeight);
        observer.observe(header);

        return () => observer.disconnect();
    }, []);

    const isServicesActive = isServicePath(pathname);

    const handleOpenSidebar = useCallback(() => setSidebarOpen(true), []);
    const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);

    const handleBookingClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        if (bookingNavigationInProgressRef.current) {
            event.preventDefault();
            return;
        }

        bookingNavigationInProgressRef.current = true;
        window.setTimeout(() => {
            bookingNavigationInProgressRef.current = false;
        }, 750);
    }, []);
    const handleServicesOpenChange = useCallback(
        (isOpen: boolean) => setOpenDesktopMenu(isOpen ? "services" : null),
        [],
    );
    const handleMoreOpenChange = useCallback(
        (isOpen: boolean) => setOpenDesktopMenu(isOpen ? "more" : null),
        [],
    );

    const logoUrl = siteSettings?.logo?.asset?.url || siteSettings?.logoAlt?.asset?.url || "/images/logo.png";
    const companyName = siteSettings?.companyName || t("defaultCompanyName");
    const ctaText = getBookingCtaText(siteSettings?.ctaButtonTextLocalized, t("bookCall"));
    const ctaUrl = getBookingHref(siteSettings?.ctaButtonUrl);
    useEffect(() => setLogoFailed(false), [logoUrl]);

    useEffect(() => {
        const wideDesktop = window.matchMedia("(min-width: 1536px)");
        const closeResponsiveOverflow = () => {
            if (wideDesktop.matches) {
                setOpenDesktopMenu((current) => current === "more" ? null : current);
            }
        };

        closeResponsiveOverflow();
        wideDesktop.addEventListener("change", closeResponsiveOverflow);
        return () => wideDesktop.removeEventListener("change", closeResponsiveOverflow);
    }, []);

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-[1200] pt-[env(safe-area-inset-top)]"
                style={{
                    backgroundColor: "rgb(13, 46, 43)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 1px 24px -4px rgba(2, 9, 8, 0.25)",
                }}
            >
                <div className="mx-auto max-w-screen-2xl">
                    {/* Inner row: logo + nav + utilities */}
                    <div
                        className="flex min-h-16 items-center justify-between px-4 sm:px-5 lg:px-6"
                    >
                        {/* ── Left: Logo ── */}
                        <Link
                            href="/"
                            aria-label={t("logoHomeAria", {
                                company: companyName,
                            })}
                            className="mr-0 flex min-h-11 shrink-0 items-center rounded-sm touch-manipulation sm:mr-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
                        >
                            <div className="relative flex h-[42px] w-[144px] items-center justify-center min-[360px]:w-[172px]">
                                {logoFailed ? (
                                    <span className="px-2 text-center font-heading text-sm font-bold leading-tight text-white">
                                        {companyName}
                                    </span>
                                ) : (
                                    <Image
                                        src={logoUrl}
                                        alt={companyName}
                                        fill
                                        className="object-contain"
                                        sizes="(min-width: 360px) 172px, 144px"
                                        priority
                                        onError={() => setLogoFailed(true)}
                                    />
                                )}
                            </div>
                        </Link>

                        {/* ── Center: Desktop Nav (lg+) ── */}
                        <nav
                            aria-label={t("mainNavigationAria")}
                            className="hidden xl:flex items-center gap-0.5"
                        >
                            {/* Services — strongest active treatment */}
                            <ServicesDropdown
                                services={services}
                                isActive={isServicesActive}
                                isOpen={openDesktopMenu === "services"}
                                onOpenChange={handleServicesOpenChange}
                            />

                            {desktopPrimaryNavigation.map((link) => {
                                const isActive = isNavigationPathActive(pathname, link.href);
                                return (
                                    <Link
                                        key={link.translationKey}
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`
                                            relative whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none
                                            ${isActive ? "text-gold-400" : "text-slate-200 hover:text-white"}
                                        `}
                                    >
                                        {isActive && (
                                            <span aria-hidden="true" className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gold-500" />
                                        )}
                                        <span className="relative">{t(link.translationKey)}</span>
                                    </Link>
                                );
                            })}

                            <DesktopOverflowMenu
                                items={desktopSecondaryNavigation}
                                isOpen={openDesktopMenu === "more"}
                                onOpenChange={handleMoreOpenChange}
                            />

                            {desktopSecondaryNavigation.map((link) => {
                                const isActive = isNavigationPathActive(pathname, link.href);
                                return (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`
                                            relative hidden whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none 2xl:inline-flex
                                            ${isActive ? "text-gold-400" : "text-slate-200 hover:text-white"}
                                        `}
                                    >
                                        {isActive && (
                                            <span aria-hidden="true" className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gold-500" />
                                        )}
                                        <span className="relative">{t(link.translationKey)}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* ── Right: Utilities + CTA ── */}
                        <div className="flex items-center gap-3">
                            {/* Language toggle */}
                            <div className="hidden 2xl:block"><LocaleSwitcher /></div>

                            {/* Mobile conversion CTA — compact to preserve logo and menu touch targets. */}
                            <Link
                                href={ctaUrl}
                                onClick={handleBookingClick}
                                aria-label={t("bookCall")}
                                title={t("bookCall")}
                                className="inline-flex h-12 w-auto shrink-0 touch-manipulation items-center justify-center gap-1.5 rounded-md px-2 text-gold-300 transition-[background-color,color,transform] hover:bg-white/10 hover:text-gold-200 active:scale-[0.96] active:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none md:hidden"
                            >
                                <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <span className="text-xs font-bold">{t("bookShort")}</span>
                                <span className="sr-only">{t("bookCall")}</span>
                            </Link>

                            {/* Primary CTA — always visible, sticky in fixed header */}
                            <Link
                                href={ctaUrl}
                                onClick={handleBookingClick}
                                className={navbarStyles.cta}
                                style={{ boxShadow: "0 2px 10px -2px rgba(212, 175, 55, 0.5)" }}
                            >
                                {ctaText}
                            </Link>

                            {/* Hamburger — only shown when sidebar is closed on mobile */}
                            <button
                                ref={mobileMenuButtonRef}
                                type="button"
                                onClick={handleOpenSidebar}
                                className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-md text-slate-200 transition-[background-color,color,transform] hover:bg-white/5 hover:text-white active:scale-[0.96] active:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none xl:hidden"
                                aria-expanded={sidebarOpen}
                                aria-controls="mobile-navigation"
                                aria-label={t("openMenu")}
                            >
                                <MenuIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Shared layout offset for the fixed header. */}
            <div
                aria-hidden="true"
                style={{
                    height: "var(--header-height, 76px)",
                    minHeight: "var(--header-height, 76px)",
                }}
            />

            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={handleCloseSidebar}
                returnFocusRef={mobileMenuButtonRef}
                siteSettings={siteSettings}
            />
        </>
    );
};
