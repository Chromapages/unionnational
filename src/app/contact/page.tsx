import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactHero } from "@/components/contact/ContactHero";
import { TeamMemberCard } from "@/components/contact/TeamMemberCard";
import { MultiStepContactForm } from "@/components/contact/MultiStepContactForm";
import { ClientLogoStrip } from "@/components/contact/ClientLogoStrip";
import { AlternativeCTA } from "@/components/contact/AlternativeCTA";
import { FAQSection } from "@/components/home/FAQSection";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_SETTINGS_QUERY, ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Union National Tax",
    description: "Get in touch with our tax strategy experts for a consultation.",
};

export default async function ContactPage() {
    const { data: settings } = await sanityFetch({ query: CONTACT_SETTINGS_QUERY });
    const { data: aboutPage } = await sanityFetch({ query: ABOUT_PAGE_QUERY });

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
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
                                />
                            </RevealOnScroll>
                        </div>

                        {/* Right Column: Multi-Step Form */}
                        <div className="lg:col-span-7">
                            <RevealOnScroll delay={200}>
                                <MultiStepContactForm />
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
