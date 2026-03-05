"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

interface ExitIntentModalProps {
  children?: React.ReactNode;
}

export function ExitIntentModal({ children }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("exitIntentShown")) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when leaving through the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-gold-600" />
                </div>

                <h2 className="text-2xl font-black text-brand-900 mb-3">
                  Wait! Before You Go...
                </h2>
                
                <p className="text-slate-600 mb-6">
                  Get your free tax health score in just 2 minutes. Discover if your business is leaving money on the table.
                </p>

                <Link
                  href="/health-check"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all"
                >
                  Get My Free Tax Health Score <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={handleClose}
                  className="mt-4 text-slate-400 hover:text-slate-600 text-sm"
                >
                  No thanks, I'll pass
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
