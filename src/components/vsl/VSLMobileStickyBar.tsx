import { Phone } from "lucide-react";
import Link from "next/link";

interface VSLMobileStickyBarProps {
  ctaText: string;
  ctaUrl: string;
}

export function VSLMobileStickyBar({ ctaText, ctaUrl }: VSLMobileStickyBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-brand-900/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <a
          href="tel:+1-800-555-0199"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
          aria-label="Call now"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link
          href={ctaUrl}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gold-500 px-4 text-sm font-bold text-brand-900"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
