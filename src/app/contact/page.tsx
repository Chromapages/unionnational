import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MapPin, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Union National Tax",
    description: "Get in touch with our tax strategy experts for a consultation.",
};

export default async function ContactPage() {
    const { data: settings } = await sanityFetch({ query: CONTACT_SETTINGS_QUERY });

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main className="pt-32 pb-20">
                {/* Hero */}
                <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                            Contact Us
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                            {settings?.heroTitle || "Start the conversation."}
                        </h1>
                        <p className="text-lg text-brand-900 leading-relaxed max-w-xl mx-auto font-sans">
                            {settings?.heroSubtitle || "Whether you are facing a complex audit or looking to restructure for growth, our strategists are ready to listen."}
                        </p>
                    </RevealOnScroll>
                </section>

                {/* Content Grid */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Contact Info (Left) */}
                        <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 h-fit">

                            <RevealOnScroll delay={100}>
                                <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wide mb-8 font-heading">Headquarters</h3>

                                <div className="space-y-8">
                                    {/* Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-gold-600">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-900 mb-1 font-heading">Office</h4>
                                            <div className="text-brand-900/70 leading-relaxed font-sans whitespace-pre-line">
                                                {settings?.officeAddress || "123 Financial District Blvd\nNew York, NY 10005"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-gold-600">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-900 mb-1 font-heading">Email Us</h4>
                                            <a href={`mailto:${settings?.contactEmail || "hello@unionnationaltax.com"}`} className="text-brand-900/70 hover:text-gold-600 transition-colors font-sans block">
                                                {settings?.contactEmail || "hello@unionnationaltax.com"}
                                            </a>
                                            <span className="text-xs text-brand-900/40 mt-1 block font-sans">Typical response time: 2 hours</span>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-gold-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-900 mb-1 font-heading">Hours</h4>
                                            <div className="text-brand-900/70 font-sans whitespace-pre-line">
                                                {settings?.officeHours || "Mon-Fri: 9am - 6pm EST\nSat-Sun: Closed"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={200}>
                                <div className="pt-8 border-t border-slate-200">
                                    <h4 className="text-xs font-bold text-brand-900 uppercase tracking-widest mb-4 font-sans">Follow Us</h4>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all">
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>

                        {/* Contact Form (Right) */}
                        <div className="lg:col-span-7">
                            <RevealOnScroll delay={300}>
                                <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-100 shadow-xl">
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-brand-900 mb-2 font-heading">{settings?.formTitle || "Send us a message"}</h3>
                                        <p className="text-brand-900/60 font-sans">{settings?.formSubtitle || "Fill out the form below and we'll route your inquiry to the right expert."}</p>
                                    </div>
                                    <ContactForm />
                                </div>
                            </RevealOnScroll>
                        </div>

                    </div>
                </section>

                <FAQSection />

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
