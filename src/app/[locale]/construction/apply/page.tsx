import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import ApplicationForm from "./ApplicationForm";
import { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";

export const metadata: Metadata = {
    title: "Apply: Construction Partner Program | Union National Tax",
    description: "Application for the Hybrid CFO + COO Partnership.",
};

export default async function ConstructionApplicationPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    return (
        <div className="min-h-screen bg-brand-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">

            {/* Simple Header for Funnel Focus */}
            <div className="w-full border-b border-brand-800 bg-brand-900/90 backdrop-blur-sm fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-heading font-bold text-white text-lg tracking-wide">
                        Union National Tax <span className="text-emerald-500">Construction</span>
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                            Step 2 of 3: Application
                        </span>
                        <Link
                            href="/vsl/construction"
                            className="p-2 rounded-full hover:bg-brand-800 text-brand-400 hover:text-white transition-colors"
                            aria-label="Close application and return to VSL"
                        >
                            <X className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-brand-800">
                    <div className="h-full bg-emerald-500 w-[66%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
            </div>

            <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-2xl relative z-10">

                    {/* Form Container */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">

                        {/* Header Section */}
                        <div className="bg-slate-900/80 border-b border-slate-800 p-8 sm:p-10 text-center">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
                                See If Your Business Qualifies
                            </h1>
                            <p className="text-brand-200 text-lg">
                                We accept 5 new construction partners per month.
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 sm:p-10">
                            <ApplicationForm />
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-8 flex justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple text or logos can go here if needed, keeping it clean for now */}
                    </div>
                </div>
            </main>

            {/* Simplified Footer */}
            <footer className="py-8 text-center text-brand-500 text-xs border-t border-brand-800 bg-brand-900 relative z-10">
                <p>&copy; {new Date().getFullYear()} Union National Tax. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
