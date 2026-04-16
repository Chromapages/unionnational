"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calculator, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function FloatingTaxButton() {
  const t = useTranslations("HomePage.FloatingTaxButton");
  const [isOpen, setIsOpen] = useState(false);
  const benefits = [t("benefits.instant"), t("benefits.personalized"), t("benefits.confidential")];

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="group fixed bottom-6 left-6 z-[90] rounded-full bg-gold-500 p-4 text-brand-900 shadow-xl transition-all hover:bg-gold-600 hover:shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("buttonAria")}
      >
        <Calculator className="h-6 w-6" aria-hidden="true" />
        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-brand-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          {t("buttonLabel")}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-[100] w-full max-w-md bg-white shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100">
                      <Calculator className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-900">{t("title")}</h3>
                      <p className="text-sm text-slate-500">{t("subtitle")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label={t("close")}
                    className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <p className="mb-6 text-slate-600">
                    {t("description")}
                  </p>

                  <div className="space-y-4">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                          <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-900">{benefit}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 p-6">
                  <Link
                    href="/health-check"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-4 font-bold text-brand-900 transition-all hover:bg-gold-600"
                  >
                    {t("cta")} <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
