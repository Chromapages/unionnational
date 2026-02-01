import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactHero } from "@/components/contact/ContactHero";
import { TeamMemberCard } from "@/components/contact/TeamMemberCard";
import { MultiStepContactForm } from "@/components/contact/MultiStepContactForm";
import { ClientLogoStrip } from "@/components/contact/ClientLogoStrip";
import { AlternativeCTA } from "@/components/contact/AlternativeCTA";
import { FAQSection } from "@/components/home/FAQSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY, CONTACT_SETTINGS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const locale = params.locale;
    const { data: settings } = await sanityFetch({ query: CONTACT_SETTINGS_QUERY });
    const seo = settings?.seo;

    if (!seo) {
        return {};
    }

    const ogImage = seo.openGraphImage
        ? urlFor(seo.openGraphImage).width(1200).height(630).url()
        : undefined;

    return {
        title: seo.metaTitle,
        description: seo.metaDescription,
        openGraph: {
            title: seo.metaTitle,
            description: seo.metaDescription,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            title: seo.metaTitle,
            description: seo.metaDescription,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const { data: settings } = await sanityFetch({ query: CONTACT_SETTINGS_QUERY });
    const { data: aboutPage } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

    return (
        <div className="min-h-dvh bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <JsonLd siteSettings={siteSettings} contactSettings={settings} />
            <HeaderWrapper />

            <main>
                <ContactHero
                    title={settings?.heroTitle}
                    subtitle={settings?.heroSubtitle}
                    stats={settings?.heroStats}
                />

                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        {/* Left Column: Founder Spotlight */}
                        <div className="lg:col-span-5">
                            <RevealOnScroll delay={100}>
                                <TeamMemberCard
                                    name={settings?.founder?.name || "Jason Astwood"}
                                    title={settings?.founder?.title || "Director"}
                                    image={settings?.founder?.imageUrl}
                                    quote={settings?.founder?.quote || "I personally review every inquiry to ensure you're matched with the right strategist for your specific situation."}
                                    credentials={settings?.founder?.credentials || ["EA Licensed", "IRS Representation", "15+ Years Exp"]}
                                    email={settings?.contactEmail || "hello@unionnationaltax.com"}
                                    phone={settings?.contactPhone || "(555) 123-4567"}
                                    address={settings?.officeAddress}
                                    mapEmbedUrl={settings?.mapEmbedUrl}
                                />
                            </RevealOnScroll>
                        </div>

                        {/* Right Column: Multi-Step Form */}
                        <div className="lg:col-span-7">
                            <RevealOnScroll delay={200}>
                                <MultiStepContactForm
                                    title={settings?.formTitle}
                                    subtitle={settings?.formSubtitle}
                                />
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                <RevealOnScroll delay={300}>
                    <ClientLogoStrip logos={aboutPage?.clientLogos} />
                </RevealOnScroll>

                <FAQSection />

                <AlternativeCTA
                    title={settings?.alternativeCTA?.title}
                    subtitle={settings?.alternativeCTA?.subtitle}
                    calendarUrl={settings?.ghlCalendarUrl}
                    phone={settings?.alternativeCTA?.phone || settings?.contactPhone}
                />
            </main>

            <Footer />
        </div>
    );
}
