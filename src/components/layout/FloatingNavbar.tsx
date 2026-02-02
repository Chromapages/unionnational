"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
    Menu as MenuIcon,
    X as CloseIcon,
    HeartPulse,
    Phone,
    Check,
    ChevronDown
} from "lucide-react";
import * as Icons from "lucide-react";
import { ServicesDropdown } from "./ServicesDropdown";
import { BusinessHealthAssessmentModal } from "@/components/ui/BusinessHealthAssessmentModal";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MobileSidebar } from "@/components/ui/MobileSidebar";
import type { ServiceSummary } from "./ServicesDropdown";

type NavLink = {
    translationKey: string;
    href: string;
    hasDropdown?: boolean;
};

type FloatingNavbarProps = {
    siteSettings?: {
        logoAlt?: { asset?: { url?: string } };
        companyName?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        phone?: string;
        phoneNumber?: string;
    };
    services?: ServiceSummary[];
};

// Nav links without Services (handled separately via dropdown)
// translationKey references Header.{key} in message files
const navLinks: NavLink[] = [
    { translationKey: "home", href: "/" },
    { translationKey: "shop", href: "/shop" },
    { translationKey: "healthCheck", href: "/health-check" },
    { translationKey: "about", href: "/about" },
    { translationKey: "team", href: "/team" },
];

const fallbackServices: ServiceSummary[] = [
    { title: "Strategic Bookkeeping", slug: { current: "bookkeeping" }, icon: "Calculator" },
    { title: "S-Corp Tax Advantage", slug: { current: "s-corp" }, icon: "TrendingUp" },
    { title: "Tax Filing & Preparation", slug: { current: "tax-filing" }, icon: "FileText" },
    { title: "Fractional CFO", slug: { current: "cfo" }, icon: "Briefcase" },
    { title: "Tax Planning Consulting", slug: { current: "tax-planning" }, icon: "Target" },
    { title: "New Business Formation", slug: { current: "formation" }, icon: "Building2" },
];

const getServiceHref = (service: ServiceSummary) => {
    if (service.slug?.current) {
        return `/services/${service.slug.current}`;
    }
    return "/services";
};

const getIcon = (iconName?: string) => {
    if (!iconName) {
        return Icons.Briefcase;
    }
    // @ts-expect-error - Lucide exports aren't typed for dynamic access
    return Icons[iconName] || Icons.Briefcase;
};

export const VaultNavbar = ({ siteSettings, services }: FloatingNavbarProps) => {
    const t = useTranslations('Header');
    const [scrolled, setScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHealthAssessmentOpen, setIsHealthAssessmentOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const pathname = usePathname();


    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper function to check active state
    const isLinkActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const isServicesActive = pathname.startsWith("/services");

    const handleToggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
    const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);

    const logoUrl = siteSettings?.logoAlt?.asset?.url || "/images/logo.png";
    const ctaText = siteSettings?.ctaButtonText || "Book a Call";
    const ctaUrl = siteSettings?.ctaButtonUrl || "/contact";
    const phoneNumber = siteSettings?.phone || siteSettings?.phoneNumber || "(801) 890-1040";
    const phoneHref = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`;

    return (
        <>
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold-500 focus:text-brand-900 focus:px-4 focus:py-2 focus:rounded-lg"
            >
                Skip to content
            </a>

            <AppBar
                position="fixed"
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 0,
                    zIndex: 1200,
                    // Executive theme: deep green anchor + higher opacity
                    // Keep a consistent tone; only adjust border/shadow on scroll
                    backgroundColor: "rgba(13, 46, 43, 0.98)",
                    backgroundImage: "none",
                    backdropFilter: "blur(20px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                    borderBottom: "1px solid",
                    borderColor: scrolled
                        ? "rgba(212, 175, 55, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
                        {/* Logo */}
                        <Link
                            href="/"
                            aria-label={siteSettings?.companyName || "Union National Tax - Home"}
                            className="flex items-center relative z-10"
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: { xs: 180, md: scrolled ? 220 : 260 },
                                    height: { xs: 44, md: scrolled ? 52 : 60 },
                                    transition: "all 0.3s ease",
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

                        {/* Desktop Navigation */}
                        <Box
                            component="nav"
                            aria-label="Main navigation"
                            sx={{
                                display: { xs: "none", lg: "flex" },
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            {/* Home Link */}
                            <Button
                                component={Link}
                                href="/"
                                sx={{
                                    color: isLinkActive("/") ? "primary.main" : "white",
                                    fontSize: "0.9375rem",
                                    fontWeight: isLinkActive("/") ? 600 : 500,
                                    letterSpacing: "0.02em",
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 1,
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: prefersReducedMotion ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    // Subtle ring on active/hover
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
                                    // Gold underline indicator
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
                                Home
                            </Button>

                            {/* Services Dropdown */}
                            <ServicesDropdown services={services} />

                            {/* Other Nav Links */}
                            {navLinks.filter(link => link.translationKey !== "home").map((link) => {
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
                                            px: 2.5,
                                            py: 1,
                                            borderRadius: 1,
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: prefersReducedMotion ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            // Subtle ring on active/hover
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
                                            // Gold underline indicator
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

                        {/* Desktop CTA */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ display: { xs: "none", lg: "block" } }}>
                                <LanguageSwitcher />
                            </Box>

                            {/* Phone Number */}
                            <Box
                                component={Link}
                                href={phoneHref}
                                sx={{
                                    display: { xs: "none", lg: "flex" },
                                    alignItems: "center",
                                    gap: 1,
                                    mr: 1,
                                    pr: 2,
                                    borderRight: "1px solid rgba(255, 255, 255, 0.15)",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    textDecoration: "none",
                                    transition: "color 0.2s ease",
                                    "&:hover": {
                                        color: "primary.main",
                                    },
                                }}
                            >
                                <Phone size={16} />
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        fontFamily: 'var(--font-inter), "Inter", sans-serif',
                                    }}
                                >
                                    {phoneNumber}
                                </Typography>
                            </Box>
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
                                    display: { xs: "none", lg: "flex" },
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1.5,
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 14px -3px rgba(212, 175, 55, 0.4)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    // Shimmer effect overlay
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

                        {/* Mobile Menu Toggle */}
                        <Box
                            sx={{
                                display: { xs: "flex", lg: "none" },
                                alignItems: "center",
                            }}
                        >
                            <IconButton
                                onClick={handleToggleSidebar}
                                aria-label="Toggle menu"
                                sx={{
                                    color: "white",
                                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                                    border: "1px solid rgba(212, 175, 55, 0.3)",
                                    p: 1,
                                    "&:hover": {
                                        backgroundColor: "rgba(212, 175, 55, 0.2)",
                                    },
                                }}
                            >
                                <MenuIcon size={24} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Spacer to offset fixed AppBar height */}
            <Toolbar
                aria-hidden
                disableGutters
                sx={{
                    minHeight: { xs: 56, md: scrolled ? 72 : 88 },
                    transition: "min-height 0.3s ease",
                }}
            />

            {/* Mobile Sidebar Navigation */}
            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={handleCloseSidebar}
                siteSettings={siteSettings}
            />

            <BusinessHealthAssessmentModal isOpen={isHealthAssessmentOpen} onClose={() => setIsHealthAssessmentOpen(false)} />

        </>
    );
};
