import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import EcommerceIndustryClient from "./EcommerceIndustryClient";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/industries/e-commerce";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "E-commerce Growth CFO | Union National Tax",
        description: "Specialized tax strategy and financial leadership for high-growth e-commerce brands. Manage sales tax nexus and inventory valuation with certainty.",
        openGraph: {
            images: [`${baseUrl}/images/og-ecommerce.png`],
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

export default async function EcommerceIndustryPage(props: { params: Promise<{ locale: string }> }) {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main id="main-content">
                <EcommerceIndustryClient />
            </main>
            <Footer />
        </div>
    );
}
