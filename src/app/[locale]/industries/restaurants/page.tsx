import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import RestaurantIndustryClient from "./RestaurantIndustryClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Restaurant CFO Partnership | Union National Tax",
        description: "Specialized financial leadership for high-volume restaurant operators. Protect your margins, optimize tip compliance, and scale with clarity.",
    };
}

export default async function RestaurantIndustryPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main>
                <RestaurantIndustryClient locale={locale} />
            </main>
            <Footer />
        </div>
    );
}
