import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import ConstructionIndustryClient from "./ConstructionIndustryClient";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/industries/construction";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "Construction CFO Partnership | Union National Tax",
        description: "Specialized financial leadership and tax strategy for growth-minded construction firms. Stop bleeding cash on job costing and labor.",
        openGraph: {
            images: [`${baseUrl}/images/og-construction.png`],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
    };
}

export default async function ConstructionIndustryPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main id="main-content">
                <ConstructionIndustryClient locale={locale} />
            </main>
            <Footer />
        </div>
    );
}
