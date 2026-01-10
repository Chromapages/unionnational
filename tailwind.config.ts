import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // The "Midnight Forest" - Foundation
                brand: {
                    50: '#E0E9E8',
                    100: '#B3C6C4',
                    200: '#80A3A0',
                    300: '#4D807C',
                    400: '#266661',
                    500: '#0D2E2B', // Main Brand Color
                    600: '#0A2522',
                    700: '#071C1A',
                    800: '#041211',
                    900: '#020908',
                },
                // The "Champagne Gold" - Action Color
                gold: {
                    50: '#FBF8EA',
                    100: '#F5ECCB',
                    200: '#EDDFA9',
                    300: '#E4D187',
                    400: '#DCC46C',
                    500: '#D4AF37', // Main Gold
                    600: '#AA8C2C',
                    700: '#806921',
                    800: '#554616',
                    900: '#2B230B',
                },
                // Slate for neutrals
                slate: {
                    50: '#F8F9FA',
                    100: '#F1F3F5',
                    200: '#E9ECEF',
                    300: '#DEE2E6',
                    400: '#CED4DA',
                    500: '#ADB5BD',
                    600: '#6C757D',
                    700: '#495057',
                    800: '#343A40',
                    900: '#212529',
                },
                // Semantic Mapping
                primary: '#0D2E2B',
                secondary: '#D4AF37',
                surface: '#F8F9FA',
                // Feedback Colors
                feedback: {
                    error: '#D32F2F',
                    success: '#2E7D32',
                    warning: '#ED6C02',
                },
            },
            fontFamily: {
                heading: ['var(--font-outfit)', 'sans-serif'],
                body: ['var(--font-inter)', 'sans-serif'],
                data: ['var(--font-inter)', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['var(--font-inter)', 'sans-serif'], // Keep sans as fallback
            },
            letterSpacing: {
                tighter: '-0.03em',
                tight: '-0.015em',
                normal: '0',
                wide: '0.025em',
                widest: '0.15em',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(13, 46, 43, 0.05)',
                'md': '0 4px 6px -1px rgba(13, 46, 43, 0.1), 0 2px 4px -1px rgba(13, 46, 43, 0.06)',
                'lg': '0 10px 15px -3px rgba(13, 46, 43, 0.1), 0 4px 6px -2px rgba(13, 46, 43, 0.05)',
                'soft-green': '0 4px 20px -2px rgba(13, 46, 43, 0.12)',
                'glow-gold': '0 0 20px rgba(212, 175, 55, 0.25)',
            },
            backgroundImage: {
                'forest-gradient': 'linear-gradient(135deg, #0D2E2B 0%, #041211 100%)',
                'gold-sheen': 'linear-gradient(45deg, #D4AF37 0%, #F5ECCB 50%, #D4AF37 100%)',
            }
        },
    },
    plugins: [],
};
export default config;
