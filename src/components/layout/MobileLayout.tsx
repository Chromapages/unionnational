"use client";

/**
 * Mobile-First Layout Integration Example
 * 
 * This file shows how to integrate all mobile-first components
 * into your existing layout. Copy the structure to your actual layout files.
 */

import { MobileTabBar } from "@/components/ui/MobileTabBar";
import { SafeAreaProvider } from "@/components/ui/SafeAreaProvider";
import { VaultNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";

interface MobileLayoutProps {
  children: React.ReactNode;
  siteSettings?: {
    logoAlt?: { asset?: { url?: string } };
    companyName?: string;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
    phone?: string;
    phoneNumber?: string;
  };
  services?: Array<{
    title?: string;
    slug?: { current?: string };
    icon?: string;
    _id?: string;
  }>;
}

export function MobileLayout({ 
  children, 
  siteSettings, 
  services 
}: MobileLayoutProps) {
  return (
    <SafeAreaProvider>
      <div className="min-h-screen flex flex-col">
        {/* Desktop Navigation (simplified for mobile) */}
        <VaultNavbar siteSettings={siteSettings} services={services} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Desktop Footer */}
        <div className="hidden md:block">
          <Footer />
        </div>

        {/* Mobile Bottom Tab Navigation */}
        <MobileTabBar />
      </div>
    </SafeAreaProvider>
  );
}

// Usage in your page layout (e.g., src/app/[locale]/layout.tsx):
/*
import { MobileLayout } from "@/components/layout/MobileLayout";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { getServices } from "@/sanity/lib/queries";

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const siteSettings = await getSiteSettings();
  const services = await getServices();

  return (
    <MobileLayout 
      siteSettings={siteSettings} 
      services={services}
    >
      {children}
    </MobileLayout>
  );
}
*/

// Alternative: Simple integration without layout wrapper
// Just add these components to your existing layout:
/*
"use client";

import { MobileTabBar } from "@/components/ui/MobileTabBar";
import { SafeAreaProvider } from "@/components/ui/SafeAreaProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      {children}
      <MobileTabBar />
    </SafeAreaProvider>
  );
}
*/
