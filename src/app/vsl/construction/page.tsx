import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import ConstructionVSLClient from "./ConstructionVSLClient";

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Construction Partner Program | Union National Tax",
    description: "Stop bleeding cash on job costing & labor. The Hybrid CFO + COO Model used by elite construction firms.",
};

export default function ConstructionVSLPage() {
    return (
        <div className="min-h-screen bg-brand-900 font-sans">
            <HeaderWrapper />
            <div className="pt-20"> {/* Add padding for fixed header */}
                <ConstructionVSLClient />
            </div>
            <Footer />
        </div>
    );
}
