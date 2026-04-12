import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import TaxPlanningClient from "./TaxPlanningClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return {
        title: "Tax Planning & Consulting | Union National Tax",
        description: "Year-round strategic tax planning designed to identify savings before you pay. Proactive, personalized advice for business owners and high-income earners.",
    };
}

export default async function TaxPlanningPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main>
                <TaxPlanningClient locale={locale} />
            </main>
            <Footer />
        </div>
    );
}
