import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import ConstructionVSLClient from "./ConstructionVSLClient";

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export const revalidate = 60;

export const metadata = {
    title: "Construction Partner Program | Union National Tax",
    description: "Stop bleeding cash on job costing & labor. The Hybrid CFO + COO Model used by elite construction firms.",
};

export default async function ConstructionVSLPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    
    return <ConstructionVSLClient locale={locale} />;
}
