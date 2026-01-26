"use client";

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { VaultNavbar } from "./FloatingNavbar";

type HeaderLayoutProps = {
    siteSettings?: {
        logoAlt?: { asset?: { url?: string } };
        companyName?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        phone?: string;
        phoneNumber?: string;
    };
};

export function HeaderLayout({ siteSettings }: HeaderLayoutProps) {
    return (
        <ErrorBoundary name="Header Navigation">
            <VaultNavbar siteSettings={siteSettings} />
        </ErrorBoundary>
    );
}
