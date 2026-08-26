"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, ClipboardCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const ExitIntentModal = (): React.JSX.Element | null => {
  const t = useTranslations("HomePage.ExitIntentModal");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobileBannerVisible, setIsMobileBannerVisible] = useState<boolean>(false);
  const [hasShown, setHasShown] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showModal = useCallback(
    (force = false): void => {
      if (!force) {
        if (hasShown || (typeof window !== "undefined" && sessionStorage.getItem("exitIntentShown"))) {
          return;
        }
      }

      if (document.activeElement instanceof HTMLElement) {
        previousActiveElement.current = document.activeElement;
      }

      setIsVisible(true);
      setHasShown(true);
      setIsMobileBannerVisible(false);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("exitIntentShown", "true");
      }
    },
    [hasShown]
  );

  const handleClose = useCallback((): void => {
    setIsVisible(false);
    setIsMobileBannerVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("exitIntentShown", "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.get("exit-intent") === "true" ||
      urlParams.get("exitIntent") === "true" ||
      window.location.hash === "#exit-intent"
    ) {
      showModal(true);
    }

    const handleCustomTrigger = (): void => {
      showModal(true);
    };

    window.addEventListener("open-exit-intent", handleCustomTrigger);

    (window as unknown as { __openExitIntentModal?: () => void }).__openExitIntentModal = (): void => {
      showModal(true);
    };

    if (sessionStorage.getItem("exitIntentShown")) {
      return () => {
        window.removeEventListener("open-exit-intent", handleCustomTrigger);
      };
    }

    const handleMouseLeave = (e: MouseEvent): void => {
      if (e.clientY <= 25 && !hasShown) {
        showModal();
      }
    };

    const handleMouseOut = (e: MouseEvent): void => {
      if (!e.relatedTarget && e.clientY <= 50 && !hasShown) {
        showModal();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseout", handleMouseOut);

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsMobileBannerVisible(true);
      }
    }, 45000);

    const handleScroll = (): void => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = scrollTop / (scrollHeight || 1);

      if (scrollPercentage >= 0.7 && !hasShown) {
        setIsMobileBannerVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("open-exit-intent", handleCustomTrigger);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseout", handleMouseOut);
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown, showModal]);

  // Comprehensive Background Isolation and Focus Trap Management
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';

    // Comprehensive inert application across all root sibling elements
    const inertElements: HTMLElement[] = [];
    const rootNodes = Array.from(document.body.children) as HTMLElement[];

    rootNodes.forEach((node) => {
      if (node.getAttribute("data-modal-portal") !== "true" && !node.hasAttribute("inert")) {
        node.setAttribute("inert", "");
        node.setAttribute("aria-hidden", "true");
        inertElements.push(node);
      }
    });

    // Move initial focus into modal
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      modalRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!elements || elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstEl = elements[0];
      const lastEl = elements[elements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstEl || document.activeElement === modalRef.current) {
          event.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      inertElements.forEach((node) => {
        node.removeAttribute("inert");
        node.removeAttribute("aria-hidden");
      });

      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    };
  }, [isVisible]);

  if (!isMounted) {
    return null;
  }

  const animationConfig = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 },
      }
    : {
        initial: { opacity: 0, scale: 0.95, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 16 },
        transition: { type: "spring" as const, damping: 26, stiffness: 320 },
      };

  const modalOverlay = (
    <AnimatePresence>
      {isVisible && (
        <div data-modal-portal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-brand-950/80 backdrop-blur-md isolate transform-gpu [transform:translateZ(0)]"
            onClick={handleClose}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              {...animationConfig}
              className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xl focus:outline-none"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-intent-modal-title"
              aria-describedby="exit-intent-modal-desc"
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label={t("closeModal")}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="text-center">
                <div
                  className="mx-auto mb-4 sm:mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-100 ring-1 ring-gold-500/20"
                  aria-hidden="true"
                >
                  <ClipboardCheck className="h-6 w-6 text-gold-700" />
                </div>

                <h2
                  id="exit-intent-modal-title"
                  className="mb-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-brand-900 font-heading"
                >
                  {t("title")}
                </h2>

                <p id="exit-intent-modal-desc" className="mb-6 text-slate-700 font-body leading-relaxed text-sm sm:text-base">
                  {t("subtitle")}
                </p>

                <Link
                  href={{ pathname: "/health-check" }}
                  onClick={handleClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 sm:py-4 font-bold text-brand-900 transition-all hover:bg-gold-400 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 shadow-md hover:shadow-lg"
                >
                  {t("cta")} <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>

                <p className="mt-3 text-xs text-slate-600 font-medium">
                  {t("meta")}
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-3.5 inline-block rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-brand-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                >
                  {t("dismiss")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const mobileBanner = (
    <AnimatePresence>
      {isMobileBannerVisible && (
        <aside
          aria-label={t("title")}
          className="fixed bottom-0 left-0 right-0 z-[1200] bg-brand-900 p-4 text-white md:hidden border-t border-gold-500/20 shadow-2xl"
        >
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500"
                aria-hidden="true"
              >
                <ClipboardCheck className="h-5 w-5 text-brand-900" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white">{t("mobileTitle")}</p>
                <p className="text-xs text-slate-200">{t("mobileSubtitle")}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={{ pathname: "/health-check" }}
                onClick={handleClose}
                className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-bold text-brand-900 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {t("cta")}
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-label={t("closeModal")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {createPortal(modalOverlay, document.body)}
      {createPortal(mobileBanner, document.body)}
    </>
  );
};
