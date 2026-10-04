import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import EcommerceIndustryClient from "./EcommerceIndustryClient";
import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    return {
        title: "E-commerce Growth CFO | Union National Tax",
        description: "Specialized tax strategy and financial leadership for high-growth e-commerce brands. Manage sales tax nexus and inventory valuation with certainty.",
        openGraph: {
            images: [`${baseUrl}/images/og-ecommerce.png`],
        },
        alternates: localizedAlternates(locale, "/industries/e-commerce"),
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
