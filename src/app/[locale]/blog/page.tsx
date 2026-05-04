import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { BlogList } from "@/components/blog/BlogList";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POSTS_QUERY, BLOG_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Tag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Union National Tax",
    description: "Expert financial insights, tax strategy, and business growth advice from the Union National Tax team.",
};

export default async function BlogIndexPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    const { data: posts } = await sanityFetch({ query: BLOG_POSTS_QUERY, params: { limit: 12 } });

    return (
        <div className="min-h-dvh bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="flex-1">
                {/* Hero Section */}
                <section className="bg-brand-900 px-6 py-20 md:py-32 relative overflow-hidden">
                    {/* Background Visuals */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 animate-pulse-slow" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <RevealOnScroll>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full mb-8">
                                    <Tag size={14} className="text-gold-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">
                                        The Capital Journal
                                    </span>
                                </div>
                                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 font-heading font-black leading-[0.9] drop-shadow-sm">
                                    Insights for <br />
                                    <span className="text-gold-500">Growth.</span>
                                </h1>
                                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
                                    Deep-dive analysis on tax optimization, wealth preservation, and business engineering for high-performance entrepreneurs.
                                </p>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                <BlogList initialPosts={posts} />

                {/* Newsletter / CTA */}
                <section className="py-24 bg-gold-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] opacity-10" />
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <RevealOnScroll>
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6 font-heading tracking-tight">
                                Never miss a <span className="underline decoration-brand-900/20 underline-offset-8">strategic advantage.</span>
                            </h2>
                            <p className="text-lg text-brand-900/80 mb-10 font-sans font-medium">
                                Join 5,000+ business owners receiving weekly tax-saving tactics directly from our founders.
                            </p>
                            <NewsletterForm />
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
