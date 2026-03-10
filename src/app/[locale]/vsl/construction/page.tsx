import { sanityFetch } from "@/sanity/lib/live";
import { VSL_PAGE_QUERY } from "@/sanity/lib/queries";
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

    const { data } = await sanityFetch({
        query: VSL_PAGE_QUERY,
        params: { slug: "vsl/construction", locale },
    });

    return <ConstructionVSLClient data={data} locale={locale} />;
}
