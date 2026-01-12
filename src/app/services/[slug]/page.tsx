import { client } from "@/sanity/lib/client";
import { SERVICE_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogContent } from "@/components/blog/BlogContent";
import { CTASection } from "@/components/home/CTASection";
import * as Icons from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, BarChart3, Clock, Users, Quote } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const revalidate = 60;

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (Icons as any)[name] || Icons.Briefcase;
    return <Icon className={className} />;
};

export async function generateStaticParams() {
    const services = await client.fetch(SERVICES_QUERY);
    return services.map((service: any) => ({
        slug: service.slug.current,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await client.fetch(SERVICE_QUERY, { slug });
    if (!service) return { title: "Service Not Found" };

    const ogUrl = new URL(`https://unionnationaltax.com/api/og`);
    ogUrl.searchParams.set("title", service.title);
    ogUrl.searchParams.set("subtitle", "Professional Tax Services");
    ogUrl.searchParams.set("type", "service");

    return {
        title: `${service.title} | Union National Tax`,
        description: service.shortDescription,
        openGraph: {
            title: service.title,
            description: service.shortDescription,
            type: "article",
            url: `https://unionnationaltax.com/services/${slug}`,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: service.title,
            description: service.shortDescription,
            images: [ogUrl.toString()],
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await client.fetch(SERVICE_QUERY, { slug });

    // Fetch all services for "Related Services" section
    const allServices = await client.fetch(SERVICES_QUERY);
    const relatedServices = allServices.filter((s: any) => s.slug.current !== slug).slice(0, 2);

    if (!service) {
        notFound();
    }

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.shortDescription,
        "provider": {
            "@type": "AccountingService",
            "name": "Union National Tax",
            "url": "https://unionnationaltax.com"
        },
        "areaServed": "USA",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Tax Services",
            "itemListElement": service.features?.map((feature: string, index: number) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": feature
                },
                "position": index + 1
            }))
        }
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            <main className="pt-32 pb-20">
                {/* Back Link */}
                <div className="max-w-7xl mx-auto px-6 mb-8">
                    <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-gold-500 transition-colors font-sans group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
                    </Link>
                </div>

                {/* Immersive Hero Section */}
                <section className="relative bg-brand-900 text-white rounded-[2.5rem] mx-4 lg:mx-6 overflow-hidden mb-24">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <RevealOnScroll>
                                {service.badge && (
                                    <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                        {service.badge}
                                    </div>
                                )}
                                <h1 className="text-4xl lg:text-6xl font-bold mb-8 font-heading leading-tight">
                                    {service.title}
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-xl font-sans mb-10">
                                    {service.shortDescription}
                                </p>

                                {/* Stats Strip */}
                                <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2bg-white/5 rounded-lg">
                                            <BarChart3 className="w-5 h-5 text-gold-500" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white font-sans">15k+</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wide">Avg. Savings</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-lg">
                                            <Clock className="w-5 h-5 text-gold-500" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white font-sans">100%</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wide">On-Time Filing</div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>

                            {/* Hero Graphic / Icon */}
                            <RevealOnScroll delay={200} className="flex justify-center lg:justify-end">
                                <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl rotate-3">
                                    <div className="absolute inset-0 bg-gold-500/20 blur-3xl -z-10 rounded-full"></div>
                                    <DynamicIcon name={service.icon} className="w-32 h-32 text-gold-400 drop-shadow-2xl" />
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <RevealOnScroll delay={100}>
                                {/* What You Get - Feature Grid */}
                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading">What You Get</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {service.features?.map((feature: string, i: number) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                                <CheckCircle2 className="w-6 h-6 text-gold-500 mb-4" />
                                                <h3 className="font-bold text-brand-900 mb-2 font-heading">{feature}</h3>
                                                <p className="text-sm text-slate-500 font-sans">
                                                    Comprehensive execution and support included.
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Full Description */}
                                <div className="prose prose-lg prose-slate max-w-none text-brand-900 font-sans mb-16">
                                    {service.fullDescription && <BlogContent value={service.fullDescription} />}
                                </div>

                                {/* Contextual Testimonial */}
                                <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden">
                                    <Quote className="w-8 h-8 text-gold-500/20 absolute top-8 left-8" />
                                    <blockquote className="relative z-10">
                                        <p className="text-xl font-medium text-brand-900 italic mb-6 leading-relaxed">
                                            "Since switching to the {service.title}, we've not only saved money but gained complete clarity on our financial future. It's a game changer."
                                        </p>
                                        <footer className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-white text-xs font-bold">JD</div>
                                            <div>
                                                <div className="font-bold text-brand-900 text-sm">John D.</div>
                                                <div className="text-xs text-slate-500">Business Owner</div>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </div>
                            </RevealOnScroll>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <RevealOnScroll className="sticky top-32 space-y-8">
                                {/* Impact Goal Card */}
                                {service.impactGoal && (
                                    <div className="bg-brand-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-900/30">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                                        <h3 className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2 font-sans">Impact Goal</h3>
                                        <p className="text-xl font-bold font-heading leading-snug relative z-10">
                                            "{service.impactGoal}"
                                        </p>
                                    </div>
                                )}

                                {/* CTA Card */}
                                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                                    <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading">Ready to optimize?</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-sans">
                                        Schedule a free strategy session with our team to see if this service fits your needs.
                                    </p>

                                    <a
                                        href="/contact"
                                        className="block w-full bg-gold-500 text-brand-900 text-center py-4 rounded-xl text-sm font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 mb-4 font-sans flex items-center justify-center gap-2"
                                    >
                                        Book Strategy Call <ArrowRight className="w-4 h-4" />
                                    </a>

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                        <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                                        100% Satisfaction Guarantee
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>

                {/* Related Services */}
                <section className="mt-32 border-t border-slate-200 pt-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-brand-900 mb-12 font-heading">Explore Other Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedServices.map((s: any) => (
                                <Link
                                    key={s._id}
                                    href={`/services/${s.slug.current}`}
                                    className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-gold-500/30 hover:shadow-xl transition-all flex items-start gap-6"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                                        <DynamicIcon name={s.icon} className="w-8 h-8 text-slate-400 group-hover:text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading group-hover:text-gold-600 transition-colors">{s.title}</h3>
                                        <p className="text-sm text-slate-500 font-sans line-clamp-2">{s.shortDescription}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="mt-20">
                    <CTASection />
                </div>
            </main>

            <Footer />
        </div>
    );
}
