import { sanityFetch } from "@/sanity/lib/live";
import { VSL_PAGE_QUERY } from "@/sanity/lib/queries";
import TaxResolutionClient from "./TaxResolutionClient";
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
        title: "Tax Resolution Program | Union National Tax",
        description: "Get help with IRS tax problems. We negotiate settlements, reduce penalties, and resolve tax debt.",
        alternates: localizedAlternates(locale, "/vsl/tax-resolution"),
    };
}

export default async function TaxResolutionPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    const { data } = await sanityFetch({
        query: VSL_PAGE_QUERY,
        params: { slug: "vsl/tax-resolution", locale },
    });

    return <TaxResolutionClient data={data} locale={locale} />;
}
