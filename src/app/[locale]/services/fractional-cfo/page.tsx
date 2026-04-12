import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import FractionalCFOClient from "./FractionalCFOClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return {
        title: "Fractional CFO Services | Union National Tax",
        description: "High-level financial strategy and leadership for growth-minded businesses. Gain the clarity and control of a full-time CFO at a fraction of the cost.",
    };
}

export default async function FractionalCFOPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />
            <main>
                <FractionalCFOClient locale={locale} />
            </main>
            <Footer />
        </div>
    );
}
