import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import RestaurantVSLClient from "./RestaurantVSLClient";

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Restaurant Partner Program | Union National Tax",
    description: "Stop leaking profit on food cost & labor. The Kitchen Command Center System for restaurants.",
};

export default function RestaurantVSLPage() {
    return (
        <div className="min-h-screen bg-brand-900 font-sans">
            <HeaderWrapper />
            <div className="pt-20"> {/* Add padding for fixed header */}
                <RestaurantVSLClient />
            </div>
            <Footer />
        </div>
    );
}
