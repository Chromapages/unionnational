"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Menu as MenuIcon, X as CloseIcon, Mail } from "lucide-react";

type NavLink = {
    name: string;
    href: string;
};

type FloatingNavbarProps = {
    siteSettings?: {
        logoAlt?: { asset?: { url?: string } };
        companyName?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
    };
};

const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Health Check", href: "/health-check" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
];

export const VaultNavbar = ({ siteSettings }: FloatingNavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleOpenDrawer = useCallback(() => setDrawerOpen(true), []);
    const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

    const logoUrl = siteSettings?.logoAlt?.asset?.url || "/images/logo.png";
    const ctaText = siteSettings?.ctaButtonText || "Book a Call";
    const ctaUrl = siteSettings?.ctaButtonUrl || "/contact";

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
                    backgroundColor: scrolled
                        ? "rgba(13, 46, 43, 0.98)"
                        : "secondary.main",
                    backdropFilter: scrolled ? "blur(8px)" : "none",
                    borderBottom: "1px solid",
                    borderColor: scrolled ? "rgba(212, 175, 55, 0.2)" : "rgba(255, 255, 255, 0.05)",
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
                                gap: 3,
                            }}
                        >
                            {navLinks.map((link) => (
                                <Button
                                    key={link.name}
                                    component={Link}
                                    href={link.href}
                                    sx={{
                                        color: "white",
                                        fontSize: "0.9375rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.02em",
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 6,
                                            left: "50%",
                                            transform: "translateX(-50%) scaleX(0)",
                                            width: "calc(100% - 16px)",
                                            height: 2,
                                            backgroundColor: "primary.main",
                                            transition: "transform 0.3s ease",
                                            borderRadius: 1,
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(212, 175, 55, 0.1)",
                                            color: "primary.main",
                                            "&::after": {
                                                transform: "translateX(-50%) scaleX(1)",
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
                            ))}
                        </Box>

                        {/* Desktop CTA */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
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
                                    "&:hover": {
                                        backgroundColor: "primary.dark",
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

                {/* Navigation Grid - 2 columns */}
                <Box
                    sx={{
                        px: 2,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 1,
                    }}
                >
                    {navLinks.map((link) => (
                        <ListItemButton
                            key={link.name}
                            component={Link}
                            href={link.href}
                            onClick={handleCloseDrawer}
                            sx={{
                                minHeight: 56,
                                justifyContent: "center",
                                borderRadius: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                "&:hover, &:focus": {
                                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                                },
                                "&:focus-visible": {
                                    outline: "2px solid",
                                    outlineColor: "primary.main",
                                    outlineOffset: -2,
                                },
                            }}
                        >
                            <ListItemText
                                primary={link.name}
                                primaryTypographyProps={{
                                    sx: {
                                        color: "white",
                                        fontWeight: 500,
                                        textAlign: "center",
                                        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
                                    },
                                }}
                            />
                        </ListItemButton>
                    ))}
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

                {/* CTA Buttons */}
                <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
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
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Mail size={18} />}
                        onClick={handleCloseDrawer}
                        sx={{
                            py: 1.5,
                            color: "rgba(255, 255, 255, 0.8)",
                            borderColor: "rgba(255, 255, 255, 0.2)",
                            "&:hover": {
                                borderColor: "primary.main",
                                color: "primary.main",
                                backgroundColor: "rgba(212, 175, 55, 0.1)",
                            },
                            "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 2,
                            },
                        }}
                    >
                        Subscribe to Newsletter
                    </Button>
                </Box>
            </SwipeableDrawer>

            {/* Spacer to account for fixed navbar */}
            <Box sx={{ height: { xs: 64, md: scrolled ? 72 : 88 } }} />
        </>
    );
};
