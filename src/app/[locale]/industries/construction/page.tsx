import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import ConstructionIndustryClient from "./ConstructionIndustryClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Construction CFO Partnership | Union National Tax",
        description: "Specialized financial leadership and tax strategy for growth-minded construction firms. Stop bleeding cash on job costing and labor.",
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
