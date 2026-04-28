"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false
    );
    const pathname = usePathname();

    useEffect(() => {
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

    return (
        <>
            <AppBar
                position="fixed"
                elevation={scrolled ? 4 : 0}
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 0,
                    zIndex: 1200,
                    backgroundColor: "rgba(13, 46, 43, 0.98)",
                    backgroundImage: "none",
                    backdropFilter: "blur(20px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                    borderBottom: "1px solid",
                    borderColor: scrolled
                        ? "rgba(212, 175, 55, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    transition: "border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: scrolled
                        ? "0 4px 20px -5px rgba(2, 9, 8, 0.3)"
                        : "none",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            minHeight: { xs: 64, md: scrolled ? 72 : 88 },
                            transition: "min-height 0.3s ease",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link
                            href="/"
                            aria-label={siteSettings?.companyName || "Union National Tax - Home"}
                            className="flex items-center relative z-10"
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: { xs: 200, md: scrolled ? 220 : 240, lg: scrolled ? 280 : 360 },
                                    height: { xs: 50, md: scrolled ? 54 : 64, lg: scrolled ? 68 : 86 },
                                    transition: "width 0.3s ease, height 0.3s ease",
                                }}
                            >
                                <Image
                                    src={logoUrl}
                                    alt={siteSettings?.companyName || "Union National Tax"}
                                    fill
                                    className="object-contain brightness-0 invert"
                                    priority
                                />
                            </Box>
                        </Link>

                        <Box
                            component="nav"
                            aria-label="Main navigation"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: { md: 0.25, lg: 1 },
                            }}
                        >
                            <Button
                                component={Link}
                                href="/"
                                sx={{
                                    color: isLinkActive("/") ? "primary.main" : "white",
                                    fontSize: "0.9375rem",
                                    fontWeight: isLinkActive("/") ? 600 : 500,
                                    letterSpacing: "0.02em",
                                    px: { md: 1.5, lg: 2.5 },
                                    py: 1,
                                    borderRadius: 1,
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: prefersReducedMotion ? "none" : "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: "inherit",
                                        opacity: isLinkActive("/") ? 1 : 0,
                                        background: "rgba(212, 175, 55, 0.1)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)",
                                        transition: prefersReducedMotion ? "none" : "opacity 0.3s ease",
                                    },
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 4,
                                        left: 10,
                                        width: "calc(100% - 20px)",
                                        height: 2,
                                        background: "linear-gradient(90deg, #D4AF37, #AA8C2C)",
                                        transform: isLinkActive("/") ? "scaleX(1)" : "scaleX(0)",
                                        transformOrigin: "left",
                                        transition: prefersReducedMotion ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        borderRadius: 1,
                                    },
                                    "&:hover": {
                                        color: "primary.main",
                                        filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 0.4))",
                                        "&::before": {
                                            opacity: 1,
                                        },
                                        "&::after": {
                                            transform: "scaleX(1)",
                                        },
                                    },
                                    "&:focus-visible": {
                                        outline: "2px solid",
                                        outlineColor: "primary.main",
                                        outlineOffset: 2,
                                    },
                                }}
                            >
                                {t("home")}
                            </Button>

                            <ServicesDropdown services={services} />

                            {navLinks.filter((link) => link.translationKey !== "home").map((link) => {
                                const isActive = isLinkActive(link.href);
                                return (
                                    <Button
                                        key={link.translationKey}
                                        component={Link}
                                        href={link.href}
                                        sx={{
                                            color: isActive ? "primary.main" : "white",
                                            fontSize: "0.9375rem",
                                            fontWeight: isActive ? 600 : 500,
                                            letterSpacing: "0.02em",
                                            px: { md: 1.5, lg: 2.5 },
                                            py: 1,
                                            borderRadius: 1,
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: prefersReducedMotion ? "none" : "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "inherit",
                                                opacity: isActive ? 1 : 0,
                                                background: "rgba(212, 175, 55, 0.1)",
                                                border: "1px solid rgba(212, 175, 55, 0.2)",
                                                transition: prefersReducedMotion ? "none" : "opacity 0.3s ease",
                                            },
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                bottom: 4,
                                                left: 10,
                                                width: "calc(100% - 20px)",
                                                height: 2,
                                                background: "linear-gradient(90deg, #D4AF37, #AA8C2C)",
                                                transform: isActive ? "scaleX(1)" : "scaleX(0)",
                                                transformOrigin: "left",
                                                transition: prefersReducedMotion ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                borderRadius: 1,
                                            },
                                            "&:hover": {
                                                color: "primary.main",
                                                filter: "drop-shadow(0 0 12px rgba(212, 175, 55, 0.4))",
                                                "&::before": {
                                                    opacity: 1,
                                                },
                                                "&::after": {
                                                    transform: "scaleX(1)",
                                                },
                                            },
                                            "&:focus-visible": {
                                                outline: "2px solid",
                                                outlineColor: "primary.main",
                                                outlineOffset: 2,
                                            },
                                        }}
                                    >
                                        {t(link.translationKey)}
                                    </Button>
                                );
                            })}
                        </Box>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: { xs: "none", lg: "block" },
                                    height: 20,
                                    width: "1px",
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    ml: 1,
                                    mr: 0.5,
                                }}
                            />
                            <IconButton
                                onClick={() => setIsContactModalOpen(true)}
                                aria-label="View Contact Information"
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    color: "rgba(255, 255, 255, 0.7)",
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                <Phone size={20} />
                            </IconButton>
                            <IconButton
                                aria-label="Business Health Assessment"
                                onClick={() => setIsHealthAssessmentOpen(true)}
                                sx={{
                                    display: { xs: "none", lg: "flex" },
                                    color: "rgba(255, 255, 255, 0.7)",
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                <HeartPulse size={20} />
                            </IconButton>
                            <Button
                                component={Link}
                                href={ctaUrl}
                                variant="contained"
                                color="primary"
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 600,
                                    px: { md: 2, lg: 4 },
                                    py: 1.5,
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 14px -3px rgba(212, 175, 55, 0.4)",
                                    transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                        transition: "left 0.5s ease",
                                    },
                                    "&:hover": {
                                        backgroundColor: "primary.dark",
                                        boxShadow: "0 6px 20px -4px rgba(212, 175, 55, 0.6)",
                                        transform: "translateY(-2px)",
                                        "&::before": {
                                            left: "100%",
                                        },
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    },
                                    "&:focus-visible": {
                                        outline: "2px solid white",
                                        outlineOffset: 2,
                                    },
                                }}
                            >
                                {ctaText}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: "flex", md: "none" },
                                alignItems: "center",
                            }}
                        >
                            <IconButton
                                onClick={handleToggleSidebar}
                                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                                aria-expanded={sidebarOpen}
                                aria-controls="mobile-navigation"
                                sx={{
                                    color: "white",
                                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                                    border: "1px solid rgba(212, 175, 55, 0.3)",
                                    p: 1,
                                    "&:hover": {
                                        backgroundColor: "rgba(212, 175, 55, 0.2)",
                                    },
                                    "&:focus-visible": {
                                        outline: "2px solid white",
                                        outlineOffset: 2,
                                    },
                                }}
                            >
                                <MenuIcon size={24} aria-hidden="true" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Toolbar
                aria-hidden
                disableGutters
                sx={{
                    minHeight: { xs: 56, md: scrolled ? 72 : 88 },
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
