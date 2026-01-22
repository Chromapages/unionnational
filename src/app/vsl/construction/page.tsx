import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import ConstructionVSLClient from "./ConstructionVSLClient";
import { sanityFetch } from "@/sanity/lib/live";
import { VSL_PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Construction Partner Program | Union National Tax",
    description: "Stop bleeding cash on job costing & labor. The Hybrid CFO + COO Model used by elite construction firms.",
};

export default async function ConstructionVSLPage() {
    const response = await sanityFetch<any>({
        query: VSL_PAGE_QUERY,
        params: { slug: "vsl/construction" },
    });

    // sanityFetch from defineLive wraps data in { data: ... }
    const data = response?.data;

    if (!data) {
        // Optional: Handle missing data gracefully or fallback
        // notFound(); 
    }

    return (
        <div className="min-h-screen bg-brand-900 font-sans">
            <HeaderWrapper />
            <div className="pt-20"> {/* Add padding for fixed header */}
                <ConstructionVSLClient data={data} />
            </div>
            <Footer />
        </div>
    );
}
