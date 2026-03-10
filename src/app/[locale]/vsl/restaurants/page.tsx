import { sanityFetch } from "@/sanity/lib/live";
import { VSL_PAGE_QUERY } from "@/sanity/lib/queries";
import RestaurantsVSLClient from "./RestaurantVSLClient";

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export const revalidate = 60;

export const metadata = {
    title: "Restaurant Tax Recovery Program | Union National Tax",
    description: "Don't leave money on the table. Our specialized tax program helps restaurants maximize deductions and reduce tax debt.",
};

export default async function RestaurantsVSLPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    const { data } = await sanityFetch({
        query: VSL_PAGE_QUERY,
        params: { slug: "vsl/restaurants", locale },
    });

    return <RestaurantsVSLClient data={data} locale={locale} />;
}
