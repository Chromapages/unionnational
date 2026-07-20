"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function ChatWidget() {
    const pathname = usePathname();

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
