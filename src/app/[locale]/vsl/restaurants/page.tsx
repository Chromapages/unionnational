import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import RestaurantVSLClient from "./RestaurantVSLClient";
import { sanityFetch } from "@/sanity/lib/live";
import { VSL_PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Restaurant Partner Program | Union National Tax",
    description: "Stop leaking profit on food cost & labor. The Kitchen Command Center System for restaurants.",
};

export default async function RestaurantVSLPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const response = await sanityFetch<any>({
        query: VSL_PAGE_QUERY,
        params: { slug: "vsl/restaurants", locale },
    });

    // sanityFetch from defineLive wraps data in { data: ... }
    const data = response?.data;

    console.log("[DEBUG] Restaurant VSL - Full Response:", JSON.stringify(response, null, 2));
    console.log("[DEBUG] Restaurant VSL - Data:", JSON.stringify(data, null, 2));

    if (!data) {
        console.log("[DEBUG] Restaurant VSL - No data found for slug 'vsl/restaurants'");
        // Optional: Handle missing data gracefully or fallback
        // notFound(); 
    }

    return (
        <div className="min-h-screen bg-brand-900 font-sans">
            <HeaderWrapper />
            <div className="pt-20"> {/* Add padding for fixed header */}
                <RestaurantVSLClient data={data} />
            </div>
            <Footer />
        </div>
    );
}
