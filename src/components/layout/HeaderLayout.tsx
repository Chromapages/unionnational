"use client";

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { VaultNavbar } from "./FloatingNavbar";
import type { ServiceSummary } from "./ServicesDropdown";

type HeaderLayoutProps = {
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

export function HeaderLayout({ siteSettings, services }: HeaderLayoutProps) {
    return (
        <ErrorBoundary name="Header Navigation">
            <VaultNavbar siteSettings={siteSettings} services={services} />
        </ErrorBoundary>
    );
}
