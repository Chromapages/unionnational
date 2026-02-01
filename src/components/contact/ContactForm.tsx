"use client";

import { ArrowRight, Check, ChevronDown } from "lucide-react";
import Link from "next/link";

export function ContactForm() {
    return (
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
                        <input type="text" id="first_name" inputMode="text" autoComplete="given-name" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans min-h-[48px]" placeholder="Jane" />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="last_name" className="text-sm font-medium text-slate-700 font-sans">Last Name</label>
                        <input type="text" id="last_name" inputMode="text" autoComplete="family-name" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans min-h-[48px]" placeholder="Doe" />
                    </div>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700 font-sans">Work Email</label>
                        <input type="email" id="email" inputMode="email" autoComplete="email" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans min-h-[48px]" placeholder="jane@company.com" />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-sm font-medium text-slate-700 font-sans">Phone (Optional)</label>
                        <input type="tel" id="phone" inputMode="tel" autoComplete="tel" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 md:py-2.5 text-base md:text-sm text-brand-900 placeholder:text-brand-900/60 outline-none focus:border-gold-500 focus:shadow-[0_0_0_2px_rgba(212,175,55,0.1)] transition-all font-sans min-h-[48px]" placeholder="+1 (555) 000-0000" />
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
                        I agree to the processing of my personal data as described in the <Link href="/legal/privacy-policy" className="text-brand-900 underline decoration-slate-300 underline-offset-2 hover:decoration-brand-900">Privacy Policy</Link>.
                    </label>
                </div>

                <button type="button" className="w-full bg-brand-900 text-white font-bold py-3 rounded-lg hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 group font-sans">
                    Request Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

            </div>
        </form>
    );
}
