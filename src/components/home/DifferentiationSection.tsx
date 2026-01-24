"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  X, Check, ShieldCheck, PhoneOff, UserCheck,
  Users, Headphones, ArrowRight, ChevronRight
} from "lucide-react";

export function DifferentiationSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <RevealOnScroll className="text-center mb-12 lg:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">
            Why We Are Different
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 tracking-tight text-brand-900 font-heading">
            We're Not a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
              Call Center.
            </span>
          </h2>
          <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed font-sans">
            See the difference between national tax relief firms and our boutique expertise.
          </p>
        </RevealOnScroll>

        {/* Comparison Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 
                          max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">

            {/* Left Column: Competitors */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 xl:p-10
                              h-full relative overflow-hidden 
                              transition-all duration-300 hover:shadow-lg hover:border-slate-300">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center gap-3 mb-6 lg:mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                    <Headphones className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-slate-500 font-heading">
                    National Tax Relief Firms
                  </h3>
                </div>

                <ul className="space-y-5 lg:space-y-6">
                  <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-700 font-semibold text-sm md:text-base">
                        Scripted Sales Calls
                      </strong>
                      <p className="text-sm md:text-base text-slate-500 mt-1 leading-relaxed">
                        You talk to a salesperson, not a tax expert.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                    <Users className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-700 font-semibold text-sm md:text-base">
                        Rotating Staff
                      </strong>
                      <p className="text-sm md:text-base text-slate-500 mt-1 leading-relaxed">
                        You never know who is working on your file.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                    <PhoneOff className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-700 font-semibold text-sm md:text-base">
                        Call Center Operations
                      </strong>
                      <p className="text-sm md:text-base text-slate-500 mt-1 leading-relaxed">
                        High volume, low attention to detail.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-700 font-semibold text-sm md:text-base">
                        Generic Advice
                      </strong>
                      <p className="text-sm md:text-base text-slate-500 mt-1 leading-relaxed">
                        One-size-fits-all solutions that miss savings.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            {/* Right Column: Union National Tax (emphasized) */}
            <RevealOnScroll delay={200} className="h-full">
              <div className="bg-brand-900 border border-gold-500/40 rounded-2xl p-6 lg:p-8 xl:p-10 
                              h-full relative overflow-hidden shadow-2xl 
                              ring-1 ring-gold-500/20 
                              lg:scale-[1.02] lg:-translate-y-2
                              transition-all duration-300 
                              hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:border-gold-500/60 group">
                {/* Gold glow effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 lg:mb-8">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gold-500 flex items-center justify-center text-brand-900 shadow-lg shadow-gold-500/20">
                      <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-white font-heading">
                        Union National Tax
                      </h3>
                      <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                        The Digital Vault Standard
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-5 lg:space-y-6">
                    <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                      <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-gold-500" />
                      </div>
                      <div>
                        <strong className="block text-white font-semibold text-sm md:text-base">
                          Personalized Consultations
                        </strong>
                        <p className="text-sm md:text-base text-slate-300 mt-1 leading-relaxed">
                          Deep dive strategy sessions tailored to your business.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                      <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="w-3 h-3 text-gold-500" />
                      </div>
                      <div>
                        <strong className="block text-white font-semibold text-sm md:text-base">
                          Same Advisor Every Time
                        </strong>
                        <p className="text-sm md:text-base text-slate-300 mt-1 leading-relaxed">
                          Build a relationship with someone who knows your history.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                      <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-gold-500" />
                      </div>
                      <div>
                        <strong className="block text-white font-semibold text-sm md:text-base">
                          Boutique Firm Approach
                        </strong>
                        <p className="text-sm md:text-base text-slate-300 mt-1 leading-relaxed">
                          Low volume, high touch, institutional-grade quality.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                      <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-3 h-3 text-gold-500" />
                      </div>
                      <div>
                        <strong className="block text-white font-semibold text-sm md:text-base">
                          EA-Credentialed Expertise
                        </strong>
                        <p className="text-sm md:text-base text-slate-300 mt-1 leading-relaxed">
                          Led by Jason Astwood, EA - licensed to represent you.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* VS Badge */}
          <RevealOnScroll
            delay={150}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl border-2 border-slate-200 
                            flex items-center justify-center ring-4 ring-white/10 md:ring-8 md:ring-white/5 
                            transition-transform duration-500 hover:scale-110">
              <span className="text-[10px] md:text-xs lg:text-sm font-bold text-slate-600 tracking-widest">VS</span>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll delay={300} className="mt-12 lg:mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-600 mb-6 text-base md:text-lg">
              Ready to experience the difference? Schedule a free consultation with our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/intake"
                aria-label="Schedule a free consultation"
                className="inline-flex items-center justify-center gap-2 
                           px-8 py-4 bg-gold-500 hover:bg-gold-600 
                           text-brand-900 font-semibold rounded-xl
                           shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40
                           transition-all duration-300 
                           text-base md:text-lg
                           cursor-pointer"
              >
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/about"
                aria-label="Learn about our process"
                className="inline-flex items-center gap-2 
                           text-brand-900 hover:text-gold-600 
                           font-medium transition-colors duration-200
                           text-base cursor-pointer"
              >
                Learn About Our Process
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
