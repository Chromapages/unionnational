"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu as MenuIcon } from "lucide-react";
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
    menuButton: "flex xl:hidden min-h-11 min-w-11 items-center justify-center rounded-md border border-gold-500/30 bg-gold-500/10 p-2 text-white transition-colors duration-200 hover:bg-gold-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none",
} as const;

export const VaultNavbar = ({ siteSettings, services }: FloatingNavbarProps) => {
    const t = useTranslations("Header");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);
    const [openDesktopMenu, setOpenDesktopMenu] = useState<"services" | "more" | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);

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

    const handleToggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
    const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);
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
                className="fixed top-0 left-0 right-0 z-[1200]"
                style={{
                    backgroundColor: "rgb(13, 46, 43)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 1px 24px -4px rgba(2, 9, 8, 0.25)",
                }}
            >
                <div className="mx-auto max-w-screen-2xl">
                    {/* Inner row: logo + nav + utilities */}
                    <div
                        className="flex items-center justify-between px-5 lg:px-6"
                        style={{ minHeight: "76px" }}
                    >
                        {/* ── Left: Logo ── */}
                        <Link
                            href="/"
                            aria-label={t("logoHomeAria", {
                                company: companyName,
                            })}
                            className="mr-6 flex shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
                        >
                            <div className="relative flex items-center justify-center" style={{ width: "172px", height: "42px" }}>
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
                                        sizes="172px"
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
                                            ${isActive ? "text-gold-400" : "text-white/75 hover:text-white"}
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
                                            ${isActive ? "text-gold-400" : "text-white/75 hover:text-white"}
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

                            {/* Primary CTA — always visible, sticky in fixed header */}
                            <Link
                                href={ctaUrl}
                                className={navbarStyles.cta}
                                style={{ boxShadow: "0 2px 10px -2px rgba(212, 175, 55, 0.5)" }}
                            >
                                {ctaText}
                            </Link>

                            {/* Hamburger — only shown when sidebar is closed on mobile */}
                            <button
                                onClick={handleToggleSidebar}
                                aria-label={sidebarOpen ? t("closeMenu") : t("openMenu")}
                                aria-expanded={sidebarOpen}
                                aria-controls="mobile-navigation"
                                className={navbarStyles.menuButton}
                            >
                                <MenuIcon size={20} aria-hidden="true" />
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
                siteSettings={siteSettings}
            />
        </>
    );
};
