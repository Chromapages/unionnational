"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu as MenuIcon, HeartPulse, Phone } from "lucide-react";
import { ServicesDropdown } from "./ServicesDropdown";
import { BusinessHealthAssessmentModal } from "@/components/ui/BusinessHealthAssessmentModal";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import { Link, usePathname } from "@/i18n/navigation";
import type { ServiceSummary } from "./navigationData";
import { ContactModal } from "@/components/ui/ContactModal";

type NavLink = {
    translationKey: string;
    href: string;
};

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

const navLinks: NavLink[] = [
    { translationKey: "industries", href: "/industries" },
    { translationKey: "shop", href: "/shop" },
    { translationKey: "resources", href: "/resources" },
    { translationKey: "about", href: "/about" },
];

export const VaultNavbar = ({ siteSettings, services }: FloatingNavbarProps) => {
    const t = useTranslations("Header");
    const [scrolled, setScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHealthAssessmentOpen, setIsHealthAssessmentOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
        mediaQuery.addEventListener("change", handler);

        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isLinkActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const handleToggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
    const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);

    const logoUrl = siteSettings?.logo?.asset?.url || siteSettings?.logoAlt?.asset?.url || "/images/logo.png";
    const ctaText = siteSettings?.ctaButtonText || t("bookCall");
    const ctaUrl = siteSettings?.ctaButtonUrl || "/book";
    const phoneNumber = siteSettings?.phone || siteSettings?.phoneNumber || "(801) 890-1040";
    const phoneHref = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`;

    const transitionStyle = prefersReducedMotion ? "none" : "border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

    const goldGradient = "linear-gradient(90deg, #D4AF37, #AA8C2C)";

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-[1200] border-b backdrop-blur-xl backdrop-saturate-150"
                style={{
                    backgroundColor: "rgba(13, 46, 43, 0.98)",
                    backgroundImage: "none",
                    borderColor: scrolled ? "rgba(212, 175, 55, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    transition: transitionStyle,
                    boxShadow: scrolled ? "0 4px 20px -5px rgba(2, 9, 8, 0.3)" : "none",
                    borderRadius: 0,
                }}
            >
                <div className="max-w-screen-xl mx-auto">
                    <div
                        className="flex min-h-[64px] md:min-h-[72px] lg:min-h-[88px] transition-[min-height] duration-300 justify-between items-center"
                        style={{
                            minHeight: scrolled
                                ? "72px"
                                : undefined,
                        }}
                    >
                        <Link
                            href="/"
                            aria-label={siteSettings?.companyName || "Union National Tax - Home"}
                            className="flex items-center relative z-10"
                        >
                            <div
                                className="relative transition-all duration-300"
                                style={{
                                    width: "200px",
                                    height: "50px",
                                }}
                            >
                                <Image
                                    src={logoUrl}
                                    alt={siteSettings?.companyName || "Union National Tax"}
                                    fill
                                    className="object-contain brightness-0 invert"
                                    sizes="(max-width: 768px) 200px, 360px"
                                    priority
                                />
                            </div>
                        </Link>

                        <nav
                            aria-label="Main navigation"
                            className="hidden md:flex items-center"
                        >
                            <Link
                                href="/"
                                className={`
                                    relative overflow-hidden px-3 lg:px-4 py-1 rounded-md text-sm font-medium
                                    transition-all duration-300
                                    ${isLinkActive("/") ? "text-amber-400" : "text-white"}
                                `}
                                style={{
                                    fontSize: "0.9375rem",
                                    fontWeight: isLinkActive("/") ? 600 : 500,
                                    letterSpacing: "0.02em",
                                    transition: prefersReducedMotion ? "none" : "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            >
                                {isLinkActive("/") && (
                                    <span
                                        className="absolute inset-0 rounded-md border border-amber-500/20 bg-amber-500/10"
                                    />
                                )}
                                {isLinkActive("/") && (
                                    <span
                                        className="absolute bottom-1 left-2.5 right-2.5 h-0.5 rounded-full"
                                        style={{
                                            background: goldGradient,
                                            transform: "scaleX(1)",
                                            transformOrigin: "left",
                                            transition: prefersReducedMotion ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{t("home")}</span>
                            </Link>

                            <ServicesDropdown services={services} />

                            {navLinks.filter((link) => link.translationKey !== "home").map((link) => {
                                const isActive = isLinkActive(link.href);
                                return (
                                    <Link
                                        key={link.translationKey}
                                        href={link.href}
                                        className={`
                                            relative overflow-hidden px-3 lg:px-4 py-1 rounded-md text-sm font-medium
                                            transition-all duration-300
                                            ${isActive ? "text-amber-400" : "text-white"}
                                        `}
                                        style={{
                                            fontSize: "0.9375rem",
                                            fontWeight: isActive ? 600 : 500,
                                            letterSpacing: "0.02em",
                                            transition: prefersReducedMotion ? "none" : "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        {isActive && (
                                            <span
                                                className="absolute inset-0 rounded-md border border-amber-500/20 bg-amber-500/10"
                                            />
                                        )}
                                        {isActive && (
                                            <span
                                                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 rounded-full"
                                                style={{
                                                    background: goldGradient,
                                                    transform: "scaleX(1)",
                                                    transformOrigin: "left",
                                                    transition: prefersReducedMotion ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                }}
                                            />
                                        )}
                                        <span className="relative z-10">{t(link.translationKey)}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:block h-5 w-px bg-white/15 mx-1" />

                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                aria-label="View Contact Information"
                                className="hidden md:flex items-center text-white/70 hover:text-amber-400 transition-colors"
                            >
                                <Phone size={20} />
                            </button>
                            <button
                                aria-label="Business Health Assessment"
                                onClick={() => setIsHealthAssessmentOpen(true)}
                                className="hidden lg:flex items-center text-white/70 hover:text-amber-400 transition-colors"
                            >
                                <HeartPulse size={20} />
                            </button>
                            <Link
                                href={ctaUrl}
                                className="hidden md:flex items-center px-4 lg:px-6 py-1.5 rounded-md font-semibold text-sm relative overflow-hidden"
                                style={{
                                    backgroundColor: "#D4AF37",
                                    boxShadow: "0 4px 14px -3px rgba(212, 175, 55, 0.4)",
                                    transition: prefersReducedMotion ? "none" : "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            >
                                <span
                                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                        left: "-100%",
                                    }}
                                />
                                <span className="relative z-10">{ctaText}</span>
                            </Link>
                        </div>

                        <div className="flex md:hidden items-center">
                            <button
                                onClick={handleToggleSidebar}
                                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                                aria-expanded={sidebarOpen}
                                aria-controls="mobile-navigation"
                                className="p-1 rounded-md border border-amber-500/30 bg-amber-500/10 text-white hover:bg-amber-500/20 transition-colors"
                            >
                                <MenuIcon size={24} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className="hidden md:block"
                style={{
                    minHeight: "72px",
                    transition: "min-height 0.3s ease",
                }}
            />

            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={handleCloseSidebar}
                siteSettings={siteSettings}
            />

            <BusinessHealthAssessmentModal isOpen={isHealthAssessmentOpen} onClose={() => setIsHealthAssessmentOpen(false)} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} phoneNumber={phoneNumber} phoneHref={phoneHref} />
        </>
    );
};