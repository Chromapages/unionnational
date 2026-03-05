"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";

export function FloatingTaxButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 left-6 z-[90] bg-gold-500 hover:bg-gold-600 text-brand-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all group"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Get Tax Health Score"
      >
        <Calculator className="w-6 h-6" />
        <span className="absolute left-full ml-3 bg-brand-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Get Free Tax Score
        </span>
      </motion.button>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[95]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-[100] w-full max-w-md bg-white shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-900">Tax Health Check</h3>
                      <p className="text-sm text-slate-500">Free 2-minute assessment</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <p className="text-slate-600 mb-6">
                    Discover if your business is thriving or needs attention. Get personalized recommendations in just 2 minutes.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-900">Instant Results</h4>
                        <p className="text-sm text-slate-500">Get your score immediately</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-900">Personalized Report</h4>
                        <p className="text-sm text-slate-500">Tailored to your business type</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-900">Free & Confidential</h4>
                        <p className="text-sm text-slate-500">No obligation, your data is safe</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200">
                  <Link
                    href="/health-check"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all"
                  >
                    Start Assessment <ArrowRight className="w-5 h-5" />
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
