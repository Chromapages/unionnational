"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import {
  X, Check, ShieldCheck, PhoneOff, UserCheck,
  Users, Headphones, ArrowRight, ChevronRight
} from "lucide-react";
import { useTranslations } from "next-intl";

export function DifferentiationSection() {
  const t = useTranslations("HomePage.DifferentiationSection");

  const competitorItems = [
    { icon: X, key: "scriptedCalls" },
    { icon: Users, key: "rotatingStaff" },
    { icon: PhoneOff, key: "callCenter" },
    { icon: X, key: "genericAdvice" },
  ];

  const ourItems = [
    { icon: Check, key: "personalized" },
    { icon: UserCheck, key: "sameAdvisor" },
    { icon: Check, key: "boutique" },
    { icon: ShieldCheck, key: "expertise" },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <RevealOnScroll className="mb-12 lg:mb-16 max-w-3xl">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1]">
            {t("title")} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600 mt-6 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed font-sans">
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        {/* Comparison Grid - Mobile: Swipeable Carousel | Desktop: Grid */}
        <div className="relative">
          <div
            className={cn(
              "flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 space-x-4",
              "md:grid md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-12",
              "md:space-x-0 md:pb-0 md:mx-0 md:px-0",
              "no-scrollbar items-stretch",
              "max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
            )}
          >

            {/* Left Column: Competitors */}
            <RevealOnScroll delay={100} className="h-full shrink-0 snap-center w-[320px] sm:w-[380px] md:w-auto">
              <div
                className={cn(
                  "bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 xl:p-10",
                  "h-full relative overflow-hidden",
                  "transition-all duration-300 hover:shadow-lg hover:border-slate-300"
                )}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center gap-3 mb-6 lg:mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                    <Headphones className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-slate-500 font-heading">
                    {t("competitorTitle")}
                  </h3>
                </div>

                <ul className="space-y-5 lg:space-y-6">
                  {competitorItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                      <item.icon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-700 font-semibold text-sm md:text-base">
                          {t(`competitorItems.${item.key}.title`)}
                        </strong>
                        <p className="text-sm md:text-base text-slate-500 mt-1 leading-relaxed">
                          {t(`competitorItems.${item.key}.description`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            {/* Right Column: Union National Tax (emphasized) */}
            <RevealOnScroll delay={200} className="h-full shrink-0 snap-center w-[320px] sm:w-[380px] md:w-auto">
              <div
                className={cn(
                  "bg-brand-900 border border-gold-500/40 rounded-2xl p-6 lg:p-8 xl:p-10",
                  "h-full relative overflow-hidden shadow-2xl",
                  "ring-1 ring-gold-500/20",
                  "lg:scale-[1.02] lg:-translate-y-2",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:border-gold-500/60 group"
                )}
              >
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
                        {t("ourTitle")}
                      </h3>
                      <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                        {t("ourBadge")}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-5 lg:space-y-6">
                    {ourItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-4 transition-transform duration-200 lg:hover:translate-x-1">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <item.icon className="w-3 h-3 text-gold-500" />
                        </div>
                        <div>
                          <strong className="block text-white font-semibold text-sm md:text-base">
                            {t(`ourItems.${item.key}.title`)}
                          </strong>
                          <p className="text-sm md:text-base text-slate-300 mt-1 leading-relaxed">
                            {t(`ourItems.${item.key}.description`)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          </div>


        </div>

        {/* Bottom CTA */}
        <RevealOnScroll delay={300} className="mt-12 lg:mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-600 mb-6 text-base md:text-lg">
              {t("ctaText")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                aria-label={t("ctaPrimary")}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-8 py-4 bg-gold-500 hover:bg-gold-600",
                  "text-brand-900 font-semibold rounded-xl",
                  "shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40",
                  "transition-all duration-300",
                  "text-base md:text-lg",
                  "cursor-pointer"
                )}
              >
                {t("ctaPrimary")}
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/about"
                aria-label={t("ctaSecondary")}
                className={cn(
                  "inline-flex items-center gap-2",
                  "text-brand-900 hover:text-gold-600",
                  "font-medium transition-colors duration-200",
                  "text-base cursor-pointer"
                )}
              >
                {t("ctaSecondary")}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
