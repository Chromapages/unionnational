import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import RealEstateIndustryClient from "./RealEstateIndustryClient";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/industries/real-estate";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "Real Estate Wealth Architect | Union National Tax",
        description: "Sophisticated tax strategy and financial leadership for real estate investors and developers. Unlock equity via cost segregation and 1031 exchanges.",
        openGraph: {
            images: [`${baseUrl}/images/og-real-estate.png`],
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

export default async function RealEstateIndustryPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main id="main-content">
                <RealEstateIndustryClient locale={locale} />
            </main>
            <Footer />
        </div>
    );
}
