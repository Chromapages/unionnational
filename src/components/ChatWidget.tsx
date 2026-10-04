"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ChatWidget() {
    const pathname = usePathname();
    const isBookingPage = /\/(?:en|es)\/book\/?$/.test(pathname || "");
    const isBlueprintPage = /\/(?:en|es)\/construction\/profit-blueprint\/?$/.test(pathname || "");

    useEffect(() => {
        if (isBlueprintPage) {
            document.querySelector("chat-widget")?.remove();
            return;
        }

        let observer: MutationObserver | undefined;
        let faqObserver: IntersectionObserver | undefined;
        let footerObserver: IntersectionObserver | undefined;
        let ctaObserver: IntersectionObserver | undefined;
        let purchaseObserver: MutationObserver | undefined;
        let footerIsVisible = false;
        let aboutCtaIsVisible = false;

        const collapsePrompt = () => {
            const widget = document.querySelector("chat-widget");
            const closeButton = widget?.shadowRoot?.querySelector<HTMLButtonElement>(".lc_text-widget_prompt--prompt-close");
            closeButton?.click();
        };

        const positionWidget = () => {
            if ((/\/(?:en|es)\/(?:about|team|shop(?:\/[^/]+)?)\/?$/.test(pathname || "") || document.getElementById("service-next-step")) && !ctaObserver) {
                const aboutCta = document.querySelector("#about-next-step, #team-next-step, #shop-next-step, #product-add-to-cart, #service-next-step");
                if (!aboutCta) return false;
                ctaObserver = new IntersectionObserver(([entry]) => {
                    aboutCtaIsVisible = entry.isIntersecting;
                    setFooterSafeVisibility(footerIsVisible);
                });
                ctaObserver.observe(aboutCta);
            }
            const widget = document.querySelector<HTMLElement>("chat-widget");
            const container = widget?.shadowRoot?.querySelector<HTMLElement>("#lc_text-widget");
            const bubble = widget?.shadowRoot?.querySelector<HTMLElement>("#lc_text-widget--btn");

            if (widget && isBookingPage) {
                setFooterSafeVisibility(footerIsVisible);
                return true;
            }
            if (!widget || !container) return false;

            widget.style.setProperty("position", "fixed", "important");
            widget.style.setProperty("right", "16px", "important");
            widget.style.setProperty("bottom", "24px", "important");
            widget.style.setProperty("z-index", "40", "important");
            widget.style.setProperty("max-width", "min(320px, calc(100vw - 32px))", "important");
            container.style.setProperty("right", "16px", "important");
            container.style.setProperty("bottom", "24px", "important");
            container.style.setProperty("max-width", "min(320px, calc(100vw - 32px))", "important");
            bubble?.style.setProperty("right", "16px", "important");
            bubble?.style.setProperty("bottom", "24px", "important");
            setFooterSafeVisibility(footerIsVisible);
            return true;
        };

        const setFooterSafeVisibility = (footerIsVisible: boolean) => {
            const widget = document.querySelector<HTMLElement>("chat-widget");
            if (!widget) return;

            widget.toggleAttribute("data-footer-visible", footerIsVisible);
            widget.toggleAttribute("data-about-cta-visible", aboutCtaIsVisible);
            const hidden = isBookingPage || footerIsVisible || aboutCtaIsVisible || !!document.querySelector("#product-sticky-bar");
            widget.style.setProperty("visibility", hidden ? "hidden" : "visible", "important");
            widget.style.setProperty("pointer-events", hidden ? "none" : "auto", "important");
        };

        const handleScroll = () => collapsePrompt();
        if (/\/(?:en|es)\/shop\/[^/]+\/?$/.test(pathname || "")) {
            purchaseObserver = new MutationObserver(() => setFooterSafeVisibility(footerIsVisible));
            purchaseObserver.observe(document.body, { childList: true, subtree: true });
        }
        window.addEventListener("scroll", handleScroll, { passive: true, once: true });

        const faq = document.querySelector("#services-faq");
        if (faq) {
            faqObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) collapsePrompt();
            }, { threshold: 0.1 });
            faqObserver.observe(faq);
        }

        const footer = document.querySelector("#site-footer");
        if (footer) {
            footerObserver = new IntersectionObserver(([entry]) => {
                footerIsVisible = entry.isIntersecting;
                setFooterSafeVisibility(footerIsVisible);
            }, { threshold: 0.05 });
            footerObserver.observe(footer);
        }

        if (!positionWidget()) {
            observer = new MutationObserver(() => {
                if (positionWidget()) observer?.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer?.disconnect();
            faqObserver?.disconnect();
            footerObserver?.disconnect();
            ctaObserver?.disconnect();
            purchaseObserver?.disconnect();
        };
    }, [pathname, isBlueprintPage, isBookingPage]);

    // The contact page has its own mobile action bar; loading the third-party
    // launcher there would cover one of its primary controls.
    if (isBlueprintPage || pathname?.startsWith("/hq") || /\/(?:en|es)\/contact\/?$/.test(pathname || "")) {
        return null;
    }

    return (
        <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id="6966a53597a4a8bf3f27548a"
            strategy="afterInteractive"
        />
    );
}
