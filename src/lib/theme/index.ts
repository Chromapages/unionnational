'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// Brand Color Palette - "Digital Vault" Design System
const palette = {
    primary: {
        main: '#D4AF37',      // Champagne Gold
        dark: '#AA8C2C',      // Darker Gold (hover)
        light: '#E8D48A',     // Light Gold (highlights)
        contrastText: '#020908', // Deepest Green for contrast
    },
    secondary: {
        main: '#0D2E2B',      // Midnight Forest
        dark: '#020908',      // Deepest Green
        light: '#1A4A45',     // Lighter Forest (hover states)
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#F8F9FA',   // App Surface
        paper: '#FFFFFF',     // Cards, Modals
    },
    text: {
        primary: '#0D2E2B',   // Midnight Forest
        secondary: '#475569', // Slate-600 for muted
    },
    error: { main: '#D32F2F' },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
};

// Typography - Outfit (headings) + Inter (body)
const typography = {
    fontFamily: 'var(--font-inter), "Inter", sans-serif',
    h1: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.03em',
    },
    h2: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.015em',
    },
    h3: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 500,
    },
    h4: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 500,
    },
    h5: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 500,
    },
    h6: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 500,
    },
    button: {
        fontFamily: 'var(--font-outfit), "Outfit", sans-serif',
        fontWeight: 600,
        textTransform: 'none' as const,
    },
    overline: {
        fontFamily: 'var(--font-inter), "Inter", sans-serif',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
    },
};

// Custom shadows with brand colors
const shadows = [
    'none',
    '0 1px 3px rgba(13, 46, 43, 0.04)',
    '0 4px 6px -1px rgba(13, 46, 43, 0.05)',
    '0 10px 15px -3px rgba(13, 46, 43, 0.08)',
    '0 10px 15px -3px rgba(13, 46, 43, 0.1)',
    '0 20px 25px -5px rgba(13, 46, 43, 0.1)',
    '0 25px 50px -12px rgba(13, 46, 43, 0.15)',
    ...Array(18).fill('none'),
] as ThemeOptions['shadows'];

// Create theme with all customizations
export const theme = createTheme({
    palette,
    typography,
    shadows,
    shape: {
        borderRadius: 8,
    },
    spacing: 8, // Base unit: 8px
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    padding: '10px 24px',
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: '0 4px 14px -2px rgba(212, 175, 55, 0.25)',
                    '&:hover': {
                        boxShadow: '0 6px 20px -2px rgba(212, 175, 55, 0.35)',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    margin: '4px 8px',
                    '&:hover': {
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    },
                },
            },
        },
    },
});

export default theme;
