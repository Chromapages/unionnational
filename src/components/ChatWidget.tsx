"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function ChatWidget() {
    const pathname = usePathname();

    // Do not render the widget on Sanity Studio pages
    if (pathname?.startsWith("/hq")) {
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
