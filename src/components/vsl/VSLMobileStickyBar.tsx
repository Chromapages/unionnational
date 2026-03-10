import React from "react";
import { Phone } from "lucide-react";
import Link from "next/image";

interface VSLMobileStickyBarProps {
  ctaText: string;
  ctaUrl: string;
}

export function VSLMobileStickyBar({ ctaText, ctaUrl }: VSLMobileStickyBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] border-t border-white/10 bg-[#050A14]/90 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden translate-z-0">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <a
          href="tel:+1-800-555-0199"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white active:scale-95 transition-transform"
          aria-label="Call now"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={ctaUrl}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-emerald-500 px-4 text-[13px] font-black text-black shadow-[0_0_20px_rgba(34,197,94,0.2)] active:scale-95 transition-transform uppercase tracking-wider"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
