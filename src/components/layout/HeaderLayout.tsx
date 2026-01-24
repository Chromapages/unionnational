"use client";

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
        <>
            <VaultNavbar siteSettings={siteSettings} />
        </>
    );
}
