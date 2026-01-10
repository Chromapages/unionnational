"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MapPin, Mail, Phone, ArrowRight, Check, ChevronDown, Plus, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CTASection } from "@/components/home/CTASection";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <Header />

            <main className="pt-32 pb-20">
                {/* Header */}
                <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                            Contact Us
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                            Start the <br />
                            <span className="text-gold-500">conversation.</span>
                        </h1>
                        <p className="text-lg text-brand-900 leading-relaxed max-w-xl mx-auto font-sans">
                            Whether you are facing a complex audit or looking to restructure for growth, our strategists are ready to listen.
                        </p>
                    </RevealOnScroll>
                </section>

                {/* Content Grid */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Contact Info (Left) */}
                        <RevealOnScroll delay={100} className="lg:col-span-4">
                            <div className="lg:sticky lg:top-32 space-y-10">

                                {/* Info Block */}
                                <div>
                                    <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wide mb-6 font-heading">Headquarters</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-gold-600">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-brand-900 font-medium text-sm font-sans">Union National Tax</p>
                                                <p className="text-brand-900 text-sm mt-1 leading-relaxed font-sans">
                                                    Based in Orem, Utah<br />
                                                    <span className="italic">Serving Virtually Nationwide</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-gold-600">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-brand-900 font-medium text-sm font-sans">General Inquiries</p>
                                                <a href="mailto:hello@unionnational.com" className="text-brand-900 text-sm mt-1 hover:text-gold-600 transition-colors font-sans">hello@unionnational.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-200"></div>

                                {/* Hours */}
                                <div>
                                    <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wide mb-4 font-heading">Support Hours</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                                        <div>
                                            <p className="text-brand-900 font-medium">Mon - Fri</p>
                                            <p className="text-brand-900 mt-1">9:00 AM – 5:00 PM</p>
                                        </div>
                                        <div>
                                            <p className="text-brand-900 font-medium">Weekends</p>
                                            <p className="text-brand-900 mt-1">Closed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-200"></div>

                                {/* Social */}
                                <div>
                                    <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wide mb-4 font-heading">Connect with Us</h3>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.facebook.com/UnionNationalTax"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
                                            aria-label="Follow us on Facebook"
                                        >
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/unionnationaltax/?hl=en"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
                                            aria-label="Follow us on Instagram"
                                        >
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://www.youtube.com/@JasonAstwood"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
                                            aria-label="Subscribe on YouTube"
                                        >
                                            <Youtube className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/jason-astwood-ea-lutcf-fscp-8337a476/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
                                            aria-label="Follow us on LinkedIn"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </RevealOnScroll>

                        {/* Form (Right) */}
                        <RevealOnScroll delay={200} className="lg:col-span-8">
                            <form className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm relative overflow-hidden">

                                {/* Top Decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                                <div className="relative z-10 space-y-8">

                                    {/* Inquiry Type Selector */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3 font-sans">I am inquiring as a</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className="cursor-pointer group">
                                                <input type="radio" name="client_type" className="peer hidden" defaultChecked />
                                                <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-3 transition-all hover:border-slate-300 peer-checked:border-gold-500 peer-checked:bg-gold-50 peer-checked:text-brand-900 font-sans">
                                                    <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center transition-colors peer-checked:border-gold-500 peer-checked:bg-gold-500"></div>
                                                    <span className="text-sm font-medium">Business / Corp</span>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input type="radio" name="client_type" className="peer hidden" />
                                                <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-3 transition-all hover:border-slate-300 peer-checked:border-gold-500 peer-checked:bg-gold-50 peer-checked:text-brand-900 font-sans">
                                                    <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center transition-colors peer-checked:border-gold-500 peer-checked:bg-gold-500"></div>
                                                    <span className="text-sm font-medium">Individual</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Name Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label htmlFor="first_name" className="text-sm font-medium text-slate-700 font-sans">First Name</label>
                                            <input type="text" id="first_name" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans" placeholder="Jane" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="last_name" className="text-sm font-medium text-slate-700 font-sans">Last Name</label>
                                            <input type="text" id="last_name" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans" placeholder="Doe" />
                                        </div>
                                    </div>

                                    {/* Contact Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-sm font-medium text-slate-700 font-sans">Work Email</label>
                                            <input type="email" id="email" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans" placeholder="jane@company.com" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="phone" className="text-sm font-medium text-slate-700 font-sans">Phone (Optional)</label>
                                            <input type="tel" id="phone" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>

                                    {/* Service Selection */}
                                    <div className="space-y-1.5 relative">
                                        <label htmlFor="service" className="text-sm font-medium text-slate-700 font-sans">Topic of Interest</label>
                                        <div className="relative">
                                            <select id="service" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-900 outline-none appearance-none cursor-pointer focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans" defaultValue="">
                                                <option value="" disabled>Select a topic...</option>
                                                <option value="tax-strategy">Corporate Tax Strategy</option>
                                                <option value="audit-defense">Audit Defense</option>
                                                <option value="ma-advisory">M&A Advisory</option>
                                                <option value="wealth-management">Wealth Preservation</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-900/60 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-700 font-sans">How can we help?</label>
                                        <textarea id="message" rows={4} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/60 outline-none resize-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans" placeholder="Tell us a bit about your current financial situation..."></textarea>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex items-center mt-0.5">
                                            <input type="checkbox" id="privacy" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-white checked:border-brand-900 checked:bg-brand-900 transition-all font-sans" />
                                            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                        <label htmlFor="privacy" className="text-xs text-brand-900 leading-relaxed cursor-pointer select-none font-sans">
                                            I agree to the processing of my personal data as described in the <Link href="#" className="text-brand-900 underline decoration-slate-300 underline-offset-2 hover:decoration-brand-900">Privacy Policy</Link>.
                                        </label>
                                    </div>

                                    <button type="button" className="w-full bg-brand-900 text-white font-bold py-3 rounded-lg hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 group font-sans">
                                        Send Message
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                </div>
                            </form>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Minimal FAQ */}
                <section className="max-w-3xl mx-auto px-6 mb-24">
                    <RevealOnScroll>
                        <h2 className="text-2xl font-bold text-brand-900 tracking-tight mb-8 text-center font-heading">Common Questions</h2>
                        <div className="space-y-4">
                            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer text-brand-900 font-bold text-sm hover:bg-gold-50/50 transition-colors list-none font-sans">
                                    What is your typical onboarding timeline?
                                    <Plus className="w-4 h-4 text-gold-400 group-open:rotate-45 transition-transform" />
                                </summary>
                                <div className="px-5 pb-5 text-sm text-brand-900 leading-relaxed font-sans">
                                    For new corporate clients, our initial discovery and audit phase typically takes 2-3 weeks. This allows us to fully reconstruct your financial picture before implementing new strategies.
                                </div>
                            </details>
                            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer text-brand-900 font-bold text-sm hover:bg-gold-50/50 transition-colors list-none font-sans">
                                    Do you handle international tax compliance?
                                    <Plus className="w-4 h-4 text-gold-400 group-open:rotate-45 transition-transform" />
                                </summary>
                                <div className="px-5 pb-5 text-sm text-brand-900 leading-relaxed font-sans">
                                    Yes. Our legal team specializes in cross-border entities, FBAR filings, and international treaties to ensure full compliance for global operations.
                                </div>
                            </details>
                            <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer text-brand-900 font-bold text-sm hover:bg-gold-50/50 transition-colors list-none font-sans">
                                    What industries do you specialize in?
                                    <Plus className="w-4 h-4 text-gold-400 group-open:rotate-45 transition-transform" />
                                </summary>
                                <div className="px-5 pb-5 text-sm text-brand-900 leading-relaxed font-sans">
                                    We have deep expertise in Technology, Real Estate, Healthcare, and Professional Services. We typically work with entities generating between $2M and $50M in annual revenue.
                                </div>
                            </details>
                        </div>
                    </RevealOnScroll>
                </section>

                {/* CTA Section */}
                <CTASection />

            </main>

            <Footer />
        </div>
    );
}
