import { SERVICE_QUERY, SERVICES_QUERY, PRICING_TIERS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
    const services = await client.fetch(SERVICES_QUERY, { locale: 'en' });
    const locales = ["en", "es"];

    return (services as any[]).flatMap((service: any) =>
        locales.map((locale) => ({
            locale,
            slug: service.slug.current,
        }))
    );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await props.params;
    const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug, locale } });
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

export default async function ServicePage(props: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await props.params;

    // Fetch data in parallel
    const [
        { data: service },
        { data: allServices },
        { data: pricingTiers }
    ] = await Promise.all([
        sanityFetch({ query: SERVICE_QUERY, params: { slug, locale } }),
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }),
        sanityFetch({ query: PRICING_TIERS_QUERY, params: { locale } })
    ]);

    const relatedServices = (allServices as any[]).filter((s: any) => s.slug.current !== slug).slice(0, 2);

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
            <HeaderWrapper />

            <main>
                <ServiceDetailClient service={service} relatedServices={relatedServices} tiers={pricingTiers} />
            </main>

            <Footer />
        </div>
    );
}
