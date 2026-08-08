"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu as MenuIcon, Phone } from "lucide-react";
import { ServicesDropdown } from "./ServicesDropdown";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Link, usePathname } from "@/i18n/navigation";
import type { ServiceSummary } from "./navigationData";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { getBookingHref } from "@/lib/booking";

type FloatingNavbarProps = {
    siteSettings?: {
        logo?: { asset?: { url?: string } };
        logoAlt?: { asset?: { url?: string } };
        companyName?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        phone?: string;
        phoneNumber?: string;
    };
    services?: ServiceSummary[];
};

// Desktop primary nav
const primaryNavLinks = [
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
];

const navbarStyles = {
    cta: "hidden md:inline-flex min-h-11 items-center px-5 py-2.5 rounded-full font-bold text-sm text-brand-950 bg-gold-500 hover:bg-gold-400 transition-colors duration-200 font-heading whitespace-nowrap",
    menuButton: "flex lg:hidden min-h-11 min-w-11 items-center justify-center p-2 rounded-md border border-gold-500/30 bg-gold-500/10 text-white hover:bg-gold-500/20 transition-all duration-200",
} as const;

export const VaultNavbar = ({ siteSettings, services }: FloatingNavbarProps) => {
    const t = useTranslations("Header");
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const isLinkActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const isServicesActive = pathname.startsWith("/services") || pathname.startsWith("/industries");

    const handleToggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
    const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);

    const logoUrl = siteSettings?.logo?.asset?.url || siteSettings?.logoAlt?.asset?.url || "/images/logo.png";
    const ctaText = "Book a Strategy Call";
    const ctaUrl = getBookingHref(siteSettings?.ctaButtonUrl);
    const phoneNumber = siteSettings?.phone || siteSettings?.phoneNumber || "(801) 890-1040";
    const phoneHref = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`;

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
                <div className="max-w-screen-xl mx-auto">
                    {/* Inner row: logo + nav + utilities */}
                    <div
                        className="flex items-center justify-between px-5 lg:px-6"
                        style={{ minHeight: "76px" }}
                    >
                        {/* ── Left: Logo ── */}
                        <Link
                            href="/"
                            aria-label={t("logoHomeAria", {
                                company: siteSettings?.companyName || t("defaultCompanyName"),
                            })}
                            className="flex items-center shrink-0 mr-6"
                        >
                            <div className="relative" style={{ width: "172px", height: "42px" }}>
                                <Image
                                    src={logoUrl}
                                    alt={siteSettings?.companyName || t("defaultCompanyName")}
                                    fill
                                    className="object-contain"
                                    sizes="172px"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* ── Center: Desktop Nav (lg+) ── */}
                        <nav
                            aria-label="Main navigation"
                            className="hidden lg:flex items-center gap-0.5"
                        >
                            {/* Services — strongest active treatment */}
                            <ServicesDropdown services={services} isActive={isServicesActive} />

                            {primaryNavLinks.map((link) => {
                                const isActive = isLinkActive(link.href);
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className={`
                                            relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                                            ${isActive ? "text-gold-400" : "text-white/75 hover:text-white"}
                                        `}
                                    >
                                        {isActive && (
                                            <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gold-500" />
                                        )}
                                        <span className="relative">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* ── Right: Utilities + CTA ── */}
                        <div className="flex items-center gap-3">
                            {/* Phone — visible on lg+, call icon on mobile */}
                            <a
                                href={phoneHref}
                                className="hidden xl:flex items-center gap-2 px-2 py-2 text-sm text-white/65 hover:text-white transition-colors duration-200 font-sans font-medium"
                                aria-label="Call us"
                            >
                                <Phone size={16} aria-hidden="true" className="text-gold-400" />
                                {phoneNumber}
                            </a>

                            {/* Mobile call button — replaces phone on small screens */}
                            <a
                                href={phoneHref}
                                aria-label="Call us"
                                className="flex lg:hidden items-center justify-center p-2 rounded-md bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 hover:text-gold-300 transition-all duration-200"
                            >
                                <Phone size={18} aria-hidden="true" />
                            </a>

                            {/* Language toggle */}
                            <div className="hidden xl:block"><LocaleSwitcher /></div>

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
            <div aria-hidden="true" style={{ height: "var(--header-height)", minHeight: "var(--header-height)" }} />

            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={handleCloseSidebar}
                siteSettings={siteSettings}
            />
        </>
    );
};
