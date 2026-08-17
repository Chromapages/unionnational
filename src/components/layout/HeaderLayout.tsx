"use client";

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { VaultNavbar } from "./FloatingNavbar";
import type { ServiceSummary } from "./navigationData";

type HeaderLayoutProps = {
    siteSettings?: {
        logo?: { asset?: { url?: string } };
        logoAlt?: { asset?: { url?: string } };
        companyName?: string;
        ctaButtonTextLocalized?: string;
        ctaButtonUrl?: string;
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
