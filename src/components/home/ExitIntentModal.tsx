"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calculator } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ExitIntentModalProps {
  children?: React.ReactNode;
}

export function ExitIntentModal({ children }: ExitIntentModalProps) {
  const t = useTranslations("HomePage.ExitIntentModal");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileBannerVisible, setIsMobileBannerVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const showModal = useCallback(() => {
    if (hasShown || sessionStorage.getItem("exitIntentShown")) {
      return;
    }
    setIsVisible(true);
    setHasShown(true);
    setIsMobileBannerVisible(false);
    sessionStorage.setItem("exitIntentShown", "true");
  }, [hasShown]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Check if already shown this session
    if (sessionStorage.getItem("exitIntentShown")) {
      return;
    }

    const pointerQuery = window.matchMedia("(pointer: fine)");

    if (pointerQuery.matches) {
      // Desktop: trigger on mouse leave (leaving through top)
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShown) {
          showModal();
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    } else {
      // Mobile/touch: use time-based trigger (45 seconds)
      const timer = setTimeout(() => {
        if (!hasShown) {
          setIsMobileBannerVisible(true);
        }
      }, 45000);

      // Also trigger on scroll depth (70% of page)
      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = scrollTop / scrollHeight;

        if (scrollPercentage >= 0.7 && !hasShown) {
          setIsMobileBannerVisible(true);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hasShown, showModal]);

  const handleClose = () => {
    setIsVisible(false);
    setIsMobileBannerVisible(false);
  };

  const handleMobileBannerClick = () => {
    showModal();
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

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
                aria-label={t("close")}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-gold-600" aria-hidden="true" />
                </div>

                <h2 className="text-2xl font-black text-brand-900 mb-3">
                  {t("title")}
                </h2>
                
                <p className="text-slate-600 mb-6">
                  {t("subtitle")}
                </p>

                <Link
                  href="/health-check"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all"
                >
                  {t("cta")} <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>

                <button
                  onClick={handleClose}
                  className="mt-4 text-slate-400 hover:text-slate-600 text-sm"
                >
                  {t("dismiss")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile slide-up banner for touch devices */}
      <AnimatePresence>
        {isMobileBannerVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-brand-900 text-white p-4 z-[100] md:hidden"
          >
            <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-brand-900" aria-hidden="true" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{t("title")}</p>
                  <p className="text-slate-300 text-xs">{t("subtitle")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/health-check"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-brand-900 font-bold rounded-lg text-sm transition-colors"
                >
                  {t("cta")}
                </Link>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={t("close")}
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
