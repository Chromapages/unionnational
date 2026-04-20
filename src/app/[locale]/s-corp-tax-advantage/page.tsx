import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import SCorpAdvantageClient from "./SCorpAdvantageClient";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "S-Corp Tax Advantage Program | Union National Tax",
        description: "See whether an S-Corp could help reduce self-employment tax and improve your business structure. Union National Tax helps business owners evaluate, set up, and support the right S-Corp strategy.",
    };
}

export default async function SCorpAdvantagePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main id="main-content">
                <SCorpAdvantageClient locale={locale} />
            </main>
            <Footer />
        </div>
    );
}
