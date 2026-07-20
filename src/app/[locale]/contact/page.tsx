import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";

export const revalidate = 60; // Revalidate every minute

import { ContactHero } from "@/components/contact/ContactHero";
import { AlternativeCTA } from "@/components/contact/AlternativeCTA";
import { MobileContactBar } from "@/components/contact/MobileContactBar";
import { FAQSection } from "@/components/home/FAQSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_SETTINGS_QUERY, FAQ_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";
import { Clock3, Mail, MapPin, Phone, PiggyBank, Users } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: "ContactPage.metadata" });
    const { data: settings } = await sanityFetch({ query: CONTACT_SETTINGS_QUERY, params: { locale } });
    const seo = settings?.seo;

    // Use Sanity SEO if available, otherwise fall back to translations
    const title = seo?.metaTitle || t("title");
    const description = seo?.metaDescription || t("description");

    const ogImage = seo?.openGraphImage
        ? urlFor(seo.openGraphImage).width(1200).height(630).url()
        : undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            title,
            description,
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const [{ data: settings }, { data: siteSettings }, { data: faqs }, { data: testimonials }] = await Promise.all([
        sanityFetch({ query: CONTACT_SETTINGS_QUERY, params: { locale } }),
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }),
        sanityFetch({ query: FAQ_QUERY, params: { locale } }),
        sanityFetch({ query: TESTIMONIALS_QUERY, params: { locale } }),
    ]);
    const t = await getTranslations({ locale, namespace: "ContactPage.TeamMemberCard" });
    const stats = {
        clients: settings?.heroStats?.clients ?? 5000,
        savings: settings?.heroStats?.savings ?? "$2.3B",
        responseTime: settings?.heroStats?.responseTime ?? "2 hours",
    };
    const contactEmail = settings?.contactEmail || t("fallbackEmail");
    const contactPhone = settings?.contactPhone || t("fallbackPhone");
    const address = settings?.officeAddress;

    return (
        <div className="min-h-dvh bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden pb-20 md:pb-0">
            <JsonLd siteSettings={siteSettings} contactSettings={settings} />
            <HeaderWrapper />

            <main id="main-content">
                <ContactHero
                    stats={stats}
                    founder={settings?.founder}
                    formTitle={settings?.formTitle}
                    formSubtitle={settings?.formSubtitle}
                    faqQuestions={(faqs || []).slice(0, 2).map((faq: { question?: string }) => faq.question).filter(Boolean) as string[]}
                    testimonial={(testimonials || []).find((item: { isFeatured?: boolean }) => item.isFeatured) || testimonials?.[0]}
                />

                <section aria-label="Results and response commitments" className="border-b border-slate-200 bg-white py-10 sm:py-12">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-3 sm:px-6">
                        {[
                            { icon: PiggyBank, value: stats.savings, label: "Tax savings represented" },
                            { icon: Users, value: `${stats.clients.toLocaleString(locale === "es" ? "es-ES" : "en-US")}+`, label: "Clients served" },
                            { icon: Clock3, value: stats.responseTime, label: "Average response" },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <Icon className="mx-auto h-5 w-5 text-gold-600" aria-hidden="true" />
                                <p className="mt-2 font-heading text-3xl font-bold text-brand-900">{value}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <AlternativeCTA
                    title={settings?.alternativeCTA?.title}
                    subtitle={settings?.alternativeCTA?.subtitle}
                    phone={settings?.alternativeCTA?.phone || contactPhone}
                    calendarUrl={settings?.ghlCalendarUrl}
                />

                <FAQSection initialLimit={3} />

                <section aria-labelledby="contact-details-title" className="border-t border-slate-200 bg-white py-14 sm:py-16">
                    <div className="mx-auto max-w-6xl px-5 sm:px-6">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Still prefer a direct conversation?</p>
                            <h2 id="contact-details-title" className="mt-3 font-heading text-3xl font-bold text-brand-900">Contact our office</h2>
                            <p className="mt-3 text-slate-600">Use these details for general questions, documents, or an existing client matter.</p>
                        </div>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            <a href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`} className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-gold-400 hover:bg-gold-50 focus-visible:outline-2 focus-visible:outline-gold-500"><Phone className="h-5 w-5 text-gold-600" /><span><span className="block text-xs font-bold uppercase tracking-wide text-slate-500">Phone</span><span className="mt-1 block font-semibold text-brand-900">{contactPhone}</span></span></a>
                            <a href={`mailto:${contactEmail}`} className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-gold-400 hover:bg-gold-50 focus-visible:outline-2 focus-visible:outline-gold-500"><Mail className="h-5 w-5 text-gold-600" /><span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-wide text-slate-500">Email</span><span className="mt-1 block truncate font-semibold text-brand-900">{contactEmail}</span></span></a>
                            <div className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5"><MapPin className="h-5 w-5 shrink-0 text-gold-600" /><span><span className="block text-xs font-bold uppercase tracking-wide text-slate-500">Office</span><span className="mt-1 block font-semibold text-brand-900">{address ? `${address.street}, ${address.city}, ${address.state} ${address.zip}` : t("defaultAddress")}</span></span></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <MobileContactBar phone={contactPhone} />
        </div>
    );
}
