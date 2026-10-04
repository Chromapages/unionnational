import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { IndustriesDesktopExperience } from "@/components/industries/IndustriesDesktopExperience";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "IndustriesMobile" });
    return {
        title: `${t("pageTitle")} | Union National Tax`,
        description: t("intro"),
        alternates: localizedAlternates(locale, "/industries"),
    };
}

export default async function IndustriesHubPage() {
    return (
        <div className="min-h-dvh bg-surface xl:bg-[#05352f] flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="flex-1">
                <IndustriesDesktopExperience />
            </main>

            <Footer bookingCta />
        </div>
    );
}
