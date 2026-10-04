"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useSynchronizedLocale } from "@/i18n/use-synchronized-locale";

type LocaleSwitcherProps = {
  className?: string;
  dock?: boolean;
  mobileDrawer?: boolean;
  onLocaleChange?: () => void;
};

export function LocaleSwitcher({ className, dock = false, mobileDrawer = false, onLocaleChange }: LocaleSwitcherProps) {
  const t = useTranslations("Header");
  const { locale, isPending, syncLocale } = useSynchronizedLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const nextLocale = locale === "es" ? "en" : "es";
  const targetLabel = nextLocale === "es" ? t("switchToSpanish") : t("switchToEnglish");

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: MouseEvent | TouchEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("touchstart", closeOutside);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("touchstart", closeOutside);
    };
  }, [isOpen]);

  if (dock && !mobileDrawer) {
    return (
      <div
        ref={dockRef}
        className="relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-label={`${t("language")}: ${locale.toUpperCase()}`}
          aria-expanded={isOpen}
          aria-controls="header-language-options"
          disabled={isPending}
          onClick={() => setIsOpen((open) => !open)}
          className={cn("strategy-locale-button flex min-h-14 w-28 items-center justify-center gap-2 rounded-xl border border-brand-300 text-sm text-white transition-colors hover:bg-white/10 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300", className)}
        >
          <Globe2 className="h-5 w-5" aria-hidden="true" />
          <span>{locale.toUpperCase()}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
        </button>
        {isOpen ? (
          <div id="header-language-options" className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-xl border border-gold-600/60 bg-brand-500 p-1.5 shadow-xl">
            {(["en", "es"] as const).map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                aria-pressed={locale === option}
                onClick={() => {
                  setIsOpen(false);
                  if (option !== locale) {
                    onLocaleChange?.();
                    syncLocale(option);
                  }
                }}
                className={cn("flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300", locale === option && "bg-gold-500/15 text-gold-200")}
              >
                {option === "en" ? "English" : "Español"}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onLocaleChange?.();
        syncLocale(nextLocale);
      }}
      disabled={isPending}
      aria-label={`${locale.toUpperCase()} — ${targetLabel}`}
      className={cn(
        "group inline-flex items-center border transition-all duration-200 disabled:cursor-wait disabled:opacity-60",
        mobileDrawer
          ? "w-full justify-between border-gold-400/20 bg-white/5 px-4 py-3 text-left text-white hover:bg-gold-500/10 rounded-xl"
          : "border-white/15 bg-white/5 rounded-md px-3 py-1.5 text-white hover:border-gold-400/40 hover:bg-white/10",
        className
      )}
    >
      {mobileDrawer ? (
        <>
          <span className="text-sm font-medium text-slate-100">
            {locale === "en" ? "English" : "Español"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            {nextLocale.toUpperCase()}
          </span>
        </>
      ) : (
        <span className="font-body text-xs font-bold uppercase tracking-widest text-slate-200 group-hover:text-white transition-colors">
          {locale.toUpperCase()}
        </span>
      )}
    </button>
  );
}
