import type { Metadata } from "next";
import { inter, outfit } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "UNT Analytics", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** Isolated from the public layout: no marketing, analytics, chat, or Studio providers. */
export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en"><body className={`${inter.variable} ${outfit.variable} bg-slate-50 font-body text-brand-900`}>
        <a href="#analytics-content" className="sr-only focus:not-sr-only focus:inline-flex focus:min-h-11 focus:items-center focus:px-4">Skip to analytics content</a>
        {children}
    </body></html>;
}
