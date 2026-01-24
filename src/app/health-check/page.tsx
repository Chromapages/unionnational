import { HealthCheckSurvey } from "@/components/health-check/HealthCheckSurvey";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
    title: "Business Financial Health Check | Union National Tax",
    description: "Get your Financial Health Score in 2 minutes. Discover if your business is thriving or needs attention with our free diagnostic tool.",
};

export default async function HealthCheckPage() {
    return (
        <main className="min-h-screen bg-slate-50 relative overflow-hidden">
            <HeaderWrapper />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-40 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <HealthCheckSurvey />
            </div>

            <Footer />
        </main>
    );
}
