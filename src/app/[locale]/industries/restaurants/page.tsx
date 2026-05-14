import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import RestaurantIndustryClient from "./RestaurantIndustryClient";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/industries/restaurants";
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: "Restaurant CFO Partnership | Union National Tax",
        description: "Specialized financial leadership for high-volume restaurant operators. Protect your margins, optimize tip compliance, and scale with clarity.",
        openGraph: {
            images: [`${baseUrl}/images/og-hospitality.png`],
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

export default async function RestaurantIndustryPage(props: { params: Promise<{ locale: string }> }) {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main id="main-content">
                <RestaurantIndustryClient />
            </main>
            <Footer />
        </div>
    );
}
