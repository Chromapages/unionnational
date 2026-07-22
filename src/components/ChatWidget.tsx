"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ChatWidget() {
    const pathname = usePathname();

    useEffect(() => {
        let observer: MutationObserver | undefined;
        let faqObserver: IntersectionObserver | undefined;
        let footerObserver: IntersectionObserver | undefined;
        let footerIsVisible = false;

        const collapsePrompt = () => {
            const widget = document.querySelector("chat-widget");
            const closeButton = widget?.shadowRoot?.querySelector<HTMLButtonElement>(".lc_text-widget_prompt--prompt-close");
            closeButton?.click();
        };

        const positionWidget = () => {
            const widget = document.querySelector<HTMLElement>("chat-widget");
            const container = widget?.shadowRoot?.querySelector<HTMLElement>("#lc_text-widget");
            const bubble = widget?.shadowRoot?.querySelector<HTMLElement>("#lc_text-widget--btn");

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
            widget.style.setProperty("visibility", footerIsVisible ? "hidden" : "visible", "important");
            widget.style.setProperty("pointer-events", footerIsVisible ? "none" : "auto", "important");
        };

        const handleScroll = () => collapsePrompt();
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
        };
    }, [pathname]);

    // The contact page has its own mobile action bar; loading the third-party
    // launcher there would cover one of its primary controls.
    if (pathname?.startsWith("/hq") || /\/(?:en|es)\/contact\/?$/.test(pathname || "")) {
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
