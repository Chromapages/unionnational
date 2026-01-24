"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
    Mail, 
    Phone, 
    Check,
    ChevronDown,
    Calculator,
    TrendingUp,
    FileText,
    Briefcase,
    Target,
    Building2
} from "lucide-react";
import { ServicesDropdown } from "./ServicesDropdown";

type NavLink = {
    name: string;
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
};

// Nav links without Services (handled separately via dropdown)
const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Health Check", href: "/health-check" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
];

// All services for mobile drawer accordion
const allServices = [
    { name: "Strategic Bookkeeping", href: "/services/bookkeeping", icon: Calculator },
    { name: "S-Corp Tax Advantage", href: "/services/s-corp", icon: TrendingUp },
    { name: "Tax Filing & Preparation", href: "/services/tax-filing", icon: FileText },
    { name: "Fractional CFO", href: "/services/cfo", icon: Briefcase },
    { name: "Tax Planning Consulting", href: "/services/tax-planning", icon: Target },
    { name: "New Business Formation", href: "/services/formation", icon: Building2 },
];

export const VaultNavbar = ({ siteSettings }: FloatingNavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);
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

    const handleOpenDrawer = useCallback(() => setDrawerOpen(true), []);
    const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

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
                                display: { xs: "none", md: "flex" },
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
                            <ServicesDropdown isScrolled={scrolled} />

                            {/* Other Nav Links */}
                            {navLinks.filter(link => link.name !== "Home").map((link) => {
                                const isActive = isLinkActive(link.href);
                                return (
                                    <Button
                                        key={link.name}
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
                                        {link.name}
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
                                aria-label="Subscribe to newsletter"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.7)",
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                <Mail size={20} />
                            </IconButton>
                            <Button
                                component={Link}
                                href={ctaUrl}
                                variant="contained"
                                color="primary"
                                sx={{
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

                        {/* Mobile Menu Button */}
                        <IconButton
                            edge="end"
                            aria-label={drawerOpen ? "Close menu" : "Open menu"}
                            aria-expanded={drawerOpen}
                            aria-controls="mobile-navigation"
                            onClick={drawerOpen ? handleCloseDrawer : handleOpenDrawer}
                            sx={{
                                display: { xs: "flex", md: "none" },
                                color: "white",
                                minWidth: 44,
                                minHeight: 44,
                                "&:focus-visible": {
                                    outline: "2px solid",
                                    outlineColor: "primary.main",
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            {drawerOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Spacer to offset fixed AppBar height */}
            <Toolbar
                aria-hidden
                disableGutters
                sx={{
                    minHeight: { xs: 64, md: scrolled ? 72 : 88 },
                    transition: "min-height 0.3s ease",
                }}
            />

            {/* Mobile Bottom Sheet Drawer */}
            <SwipeableDrawer
                id="mobile-navigation"
                anchor="bottom"
                open={drawerOpen}
                onClose={handleCloseDrawer}
                onOpen={handleOpenDrawer}
                disableSwipeToOpen
                swipeAreaWidth={0}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "secondary.main",
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        maxHeight: "85vh",
                        pb: 4,
                    },
                }}
            >
                {/* Drag Handle */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 40,
                            height: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            borderRadius: 2,
                        }}
                    />
                </Box>

                {/* Navigation List with Active States */}
                <Box sx={{ px: 2 }}>
                    {/* Home Link */}
                    <ListItemButton
                        component={Link}
                        href="/"
                        onClick={handleCloseDrawer}
                        sx={{
                            minHeight: 56,
                            borderRadius: 3,
                            mb: 1,
                            borderLeft: isLinkActive("/") ? "3px solid" : "3px solid transparent",
                            borderColor: isLinkActive("/") ? "primary.main" : "transparent",
                            backgroundColor: isLinkActive("/") ? "rgba(212, 175, 55, 0.15)" : "rgba(255, 255, 255, 0.05)",
                            "&:hover, &:focus": {
                                backgroundColor: "rgba(212, 175, 55, 0.15)",
                            },
                        }}
                    >
                        <ListItemText
                            primary="Home"
                            primaryTypographyProps={{
                                sx: {
                                    color: isLinkActive("/") ? "primary.main" : "white",
                                    fontWeight: isLinkActive("/") ? 600 : 500,
                                    fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
                                },
                            }}
                        />
                        {isLinkActive("/") && <Check size={18} className="text-gold-500" />}
                    </ListItemButton>

                    {/* Services Accordion */}
                    <ListItemButton
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        sx={{
                            minHeight: 56,
                            borderRadius: 3,
                            mb: 1,
                            borderLeft: isServicesActive ? "3px solid" : "3px solid transparent",
                            borderColor: isServicesActive ? "primary.main" : "transparent",
                            backgroundColor: isServicesActive ? "rgba(212, 175, 55, 0.15)" : "rgba(255, 255, 255, 0.05)",
                            "&:hover, &:focus": {
                                backgroundColor: "rgba(212, 175, 55, 0.15)",
                            },
                        }}
                    >
                        <ListItemText
                            primary="Services"
                            primaryTypographyProps={{
                                sx: {
                                    color: isServicesActive ? "primary.main" : "white",
                                    fontWeight: isServicesActive ? 600 : 500,
                                    fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
                                },
                            }}
                        />
                        <ChevronDown 
                            size={18} 
                            className={`text-white/70 transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`} 
                        />
                    </ListItemButton>

                    {/* Services Sub-items */}
                    {servicesExpanded && (
                        <Box sx={{ pl: 2, mb: 1 }}>
                            {allServices.map((service) => {
                                const ServiceIcon = service.icon;
                                const isServiceActive = pathname === service.href;
                                return (
                                    <ListItemButton
                                        key={service.name}
                                        component={Link}
                                        href={service.href}
                                        onClick={handleCloseDrawer}
                                        sx={{
                                            minHeight: 48,
                                            borderRadius: 2,
                                            mb: 0.5,
                                            backgroundColor: isServiceActive ? "rgba(212, 175, 55, 0.1)" : "transparent",
                                            "&:hover": {
                                                backgroundColor: "rgba(212, 175, 55, 0.1)",
                                            },
                                        }}
                                    >
                                        <ServiceIcon size={18} className="mr-3 text-gold-600" />
                                        <ListItemText
                                            primary={service.name}
                                            primaryTypographyProps={{
                                                sx: {
                                                    color: isServiceActive ? "primary.main" : "rgba(255, 255, 255, 0.8)",
                                                    fontSize: "0.9rem",
                                                    fontWeight: isServiceActive ? 600 : 400,
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                );
                            })}
                            <ListItemButton
                                component={Link}
                                href="/services"
                                onClick={handleCloseDrawer}
                                sx={{
                                    minHeight: 40,
                                    borderRadius: 2,
                                    "&:hover": {
                                        backgroundColor: "rgba(212, 175, 55, 0.1)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary="View All Services →"
                                    primaryTypographyProps={{
                                        sx: {
                                            color: "primary.main",
                                            fontSize: "0.85rem",
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </Box>
                    )}

                    {/* Other Nav Links */}
                    {navLinks.filter(link => link.name !== "Home").map((link) => {
                        const isActive = isLinkActive(link.href);
                        return (
                            <ListItemButton
                                key={link.name}
                                component={Link}
                                href={link.href}
                                onClick={handleCloseDrawer}
                                sx={{
                                    minHeight: 56,
                                    borderRadius: 3,
                                    mb: 1,
                                    borderLeft: isActive ? "3px solid" : "3px solid transparent",
                                    borderColor: isActive ? "primary.main" : "transparent",
                                    backgroundColor: isActive ? "rgba(212, 175, 55, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                    "&:hover, &:focus": {
                                        backgroundColor: "rgba(212, 175, 55, 0.15)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={link.name}
                                    primaryTypographyProps={{
                                        sx: {
                                            color: isActive ? "primary.main" : "white",
                                            fontWeight: isActive ? 600 : 500,
                                            fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
                                        },
                                    }}
                                />
                                {isActive && <Check size={18} className="text-gold-500" />}
                            </ListItemButton>
                        );
                    })}
                </Box>

                <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                {/* Contact Section */}
                <Box sx={{ px: 3, mb: 2 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            fontSize: "0.65rem",
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Box sx={{ mt: 1.5 }}>
                        <Box
                            component={Link}
                            href={phoneHref}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                color: "rgba(255, 255, 255, 0.8)",
                                textDecoration: "none",
                                py: 1,
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            <Phone size={16} />
                            <Typography sx={{ fontSize: "0.9rem" }}>{phoneNumber}</Typography>
                        </Box>
                        <Box
                            component={Link}
                            href="mailto:hello@unionnationaltax.com"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                color: "rgba(255, 255, 255, 0.8)",
                                textDecoration: "none",
                                py: 1,
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            <Mail size={16} />
                            <Typography sx={{ fontSize: "0.9rem" }}>hello@unionnationaltax.com</Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                {/* CTA Button */}
                <Box sx={{ px: 3 }}>
                    <Button
                        component={Link}
                        href={ctaUrl}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCloseDrawer}
                        sx={{
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: 600,
                            "&:focus-visible": {
                                outline: "2px solid white",
                                outlineOffset: 2,
                            },
                        }}
                    >
                        {ctaText}
                    </Button>
                </Box>
            </SwipeableDrawer>

        </>
    );
};
