import { HealthCheckSurvey } from "@/components/health-check/HealthCheckSurvey";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import { getTranslations } from "next-intl/server";

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: "HealthCheck.metadata"});
    return {
        title: t("title"),
        description: t("description"),
        alternates: localizedAlternates(locale, "/health-check"),
    };
}

export default function HealthCheckPage() {
    return (
        <main id="main-content" className="min-h-screen bg-slate-50 relative overflow-hidden">
            <HeaderWrapper />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-40 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <HealthCheckSurvey />
            </div>

            <Footer />
        </main>
    );
}
