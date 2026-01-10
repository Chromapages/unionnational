import { client } from "@/sanity/lib/client";
import { SERVICE_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogContent } from "@/components/blog/BlogContent"; // Reusing for consistent typography
import { CTASection } from "@/components/home/CTASection";
import * as Icons from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const service = await client.fetch(SERVICE_QUERY, { slug: params.slug });
    if (!service) return { title: "Service Not Found" };

    return {
        title: `${service.title} | Union National Tax`,
        description: service.shortDescription,
    };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
    const service = await client.fetch(SERVICE_QUERY, { slug: params.slug });

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
                <article className="max-w-4xl mx-auto px-6">
                    {/* Back Link */}
                    <Link href="/services" className="inline-flex items-center gap-2 text-sm text-brand-900/60 hover:text-gold-600 mb-8 transition-colors font-sans">
                        <ArrowLeft className="w-4 h-4" /> Back to Services
                    </Link>

                    {/* Header */}
                    <header className="mb-16">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm
                             ${service.isPopular ? 'bg-brand-900 text-white' : 'bg-gold-50 text-gold-600'}
                        `}>
                            <DynamicIcon name={service.icon} className="w-8 h-8" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-brand-900 tracking-tight mb-6 font-heading">
                            {service.title}
                        </h1>

                        {service.impactGoal && (
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 mb-8">
                                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-sans">Impact Goal</span>
                                <span className="text-sm font-medium text-brand-900 font-sans">{service.impactGoal}</span>
                            </div>
                        )}
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="prose prose-lg prose-slate max-w-none text-brand-900 font-sans mb-12">
                                <p className="lead text-xl">{service.shortDescription}</p>
                                {service.fullDescription && <BlogContent value={service.fullDescription} />}
                            </div>
                        </div>

                        {/* Sidebar / Features */}
                        <div className="lg:col-span-4">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 sticky top-32">
                                <h3 className="text-lg font-bold text-brand-900 mb-6 font-heading">Key Features</h3>
                                <ul className="space-y-4 mb-8">
                                    {service.features?.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                                            <span className="text-sm text-brand-900/80 font-sans">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="/contact"
                                    className="block w-full text-center bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg hover:shadow-gold-500/20 font-sans"
                                >
                                    Book Strategy Call
                                </a>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="mt-20">
                    <CTASection />
                </div>
            </main>

            <Footer />
        </div>
    );
}
