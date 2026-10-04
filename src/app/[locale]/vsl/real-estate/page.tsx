import { sanityFetch } from "@/sanity/lib/live";
import { VSL_PAGE_QUERY } from "@/sanity/lib/queries";
import RealEstateVSLClient from "./RealEstateVSLClient";
import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

// Static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Real Estate Investor Tax Program | Union National Tax",
        description: "Strategic tax planning for real estate investors. Optimize your rental property investments and maximize deductions.",
        alternates: localizedAlternates(locale, "/vsl/real-estate"),
    };
}

export default async function RealEstateVSLPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    const { data } = await sanityFetch({
        query: VSL_PAGE_QUERY,
        params: { slug: "vsl/real-estate", locale },
    });

    return <RealEstateVSLClient data={data} locale={locale} />;
}
