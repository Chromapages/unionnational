import { FAQSection } from "@/components/home/FAQSection";
import { FAQPageSchema } from "@/components/seo/FAQPageSchema";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata = {
    title: "Frequently Asked Questions | Union National Tax",
    description: "Find answers to common questions about our tax services, pricing, and strategies for contractors and business owners.",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen w-full bg-surface flex flex-col">
            <FAQPageSchema />
            <HeaderWrapper />

            <div className="flex-1 pt-32 pb-24">
                {/* Simple Hero */}
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                    <RevealOnScroll>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-heading tracking-tight">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Questions</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Clear answers to help you navigate your tax strategy and financial growth.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Reusing the FAQ Component */}
                <FAQSection />

                {/* Contact CTA */}
                <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
                    <RevealOnScroll delay={200} className="bg-brand-900 rounded-2xl p-12 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-500/30 via-transparent to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
                                Can't find what you're looking for?
                            </h3>
                            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                Our team is ready to help. Book a free consultation to discuss your specific situation.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Contact Support
                            </a>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            <Footer />
        </main>
    );
}
