// src/app/scorp-advantage/layout.tsx
import type { Metadata } from "next";
import { inter, outfit } from "@/lib/fonts";
import "@/styles/globals.css";
import { headers } from "next/headers";
import { CspNonceProvider } from "@/components/security/CspNonceProvider";
import { TrackingPreferences, TrackingPreferencesGuard } from "@/components/privacy/TrackingPreferences";
import { OptionalTrackingBoundary } from "@/components/privacy/OptionalTrackingBoundary";

export const metadata: Metadata = {
    metadataBase: new URL("https://unionnationaltax.com"),
};

export default async function SCorpAdvantageLayout({ children }: { children: React.ReactNode }) {
    const nonce = (await headers()).get("x-nonce") || undefined;
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-body antialiased`} suppressHydrationWarning>
                <CspNonceProvider nonce={nonce}>
                    <OptionalTrackingBoundary>{children}</OptionalTrackingBoundary>
                    <footer className="border-t border-white/10 bg-[#071d1a] px-5 py-4 text-center"><TrackingPreferences /></footer>
                    <TrackingPreferencesGuard />
                </CspNonceProvider>
            </body>
        </html>
    );
}
