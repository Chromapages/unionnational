import { SERVICE_QUERY, SERVICES_QUERY, PRICING_TIERS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
import { urlFor } from "@/sanity/lib/image";
import { Service } from "@/types/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
    const services = await client.fetch<Service[]>(SERVICES_QUERY, { locale: 'en' });
    const locales = ["en", "es"];

    return services.flatMap((service) =>
        locales.map((locale) => ({
            locale,
            slug: service.slug.current,
        }))
    );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await props.params;
    const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug, locale } });
    
    const typedService = service as Service | null;
    if (!typedService) return { title: "Service Not Found" };

    const { seo } = typedService;
    const metaTitle = seo?.metaTitle || `${typedService.title} | Union National Tax`;
    const metaDescription = seo?.metaDescription || typedService.shortDescription;

    // Custom OG Image logic
    let ogImageUrl = "";
    if (seo?.openGraphImage?.asset) {
        ogImageUrl = urlFor(seo.openGraphImage).width(1200).height(630).url();
    } else {
        const ogUrl = new URL(`https://unionnationaltax.com/api/og`);
        ogUrl.searchParams.set("title", typedService.title);
        ogUrl.searchParams.set("subtitle", "Professional Tax Services");
        ogUrl.searchParams.set("type", "service");
        ogImageUrl = ogUrl.toString();
    }

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: seo?.keywords || [],
        openGraph: {
            title: seo?.metaTitle || typedService.title,
            description: metaDescription,
            type: "article",
            url: `https://unionnationaltax.com/services/${slug}`,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: typedService.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: seo?.metaTitle || typedService.title,
            description: metaDescription,
            images: [ogImageUrl],
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

    const typedService = service as Service | null;
    const typedAllServices = allServices as Service[];

    if (!typedService) {
        notFound();
    }

    const relatedServices = typedAllServices.filter((s) => s.slug.current !== slug).slice(0, 2);

    // Redirect to high-performance root routes if they exist
    const rootRoutes = [
        "fractional-cfo",
        "tax-planning",
        "strategic-bookkeeping",
        "new-business-formation",
        "s-corp-tax-advantage"
    ];

    if (rootRoutes.includes(slug)) {
        redirect(`/${slug}`);
    }

    if (slug === "tax-filing-and-preparation-services") {
        redirect("/tax-preparation-and-filing");
    }

    // Schema.org Structured Data
    const jsonLd: Record<string, unknown>[] = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": typedService.title,
            "description": typedService.shortDescription,
            "provider": {
                "@type": "AccountingService",
                "name": "Union National Tax",
                "url": "https://unionnationaltax.com"
            },
            "areaServed": "USA",
            "serviceType": "Tax Planning & Strategy",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Tax Services",
                "itemListElement": typedService.features?.map((feature: string, index: number) => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": feature
                    },
                    "position": index + 1
                })) || []
            }
        }
    ];

    if (typedService.schema_faq && typedService.schema_faq.length > 0) {
        jsonLd.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": typedService.schema_faq.map((item: { question: string, answer: string }) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        });
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeaderWrapper />

            <main id="main-content">
                <ServiceDetailClient service={service} relatedServices={relatedServices} tiers={pricingTiers} />
            </main>

            <Footer />
        </div>
    );
}
