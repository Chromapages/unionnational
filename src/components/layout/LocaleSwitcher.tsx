"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useSynchronizedLocale } from "@/i18n/use-synchronized-locale";

type LocaleSwitcherProps = {
  className?: string;
  mobileDrawer?: boolean;
};

const localeMeta = {
  en: {
    flag: "\u{1F1FA}\u{1F1F8}",
    label: "EN",
  },
  es: {
    flag: "\u{1F1EA}\u{1F1F8}",
    label: "ES",
  },
} as const;

export function LocaleSwitcher({ className, mobileDrawer = false }: LocaleSwitcherProps) {
  const t = useTranslations("Header");
  const { locale, isPending, syncLocale } = useSynchronizedLocale();

  const nextLocale = locale === "es" ? "en" : "es";
  const current = localeMeta[locale] ?? localeMeta.en;
  const targetLabel = nextLocale === "es" ? t("switchToSpanish") : t("switchToEnglish");

  return (
    <button
      type="button"
      onClick={() => syncLocale(nextLocale)}
      disabled={isPending}
      aria-label={targetLabel}
      className={cn(
        "group inline-flex items-center rounded-full border transition-all duration-300 disabled:cursor-wait disabled:opacity-70",
        mobileDrawer
          ? "w-full justify-between border-gold-400/20 bg-white/5 px-4 py-3 text-left text-white hover:bg-gold-500/10"
          : "border-white/15 bg-white/5 px-2.5 py-1.5 text-white hover:-translate-y-0.5 hover:border-gold-400/40 hover:bg-white/10",
        className
      )}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-white/10 text-[13px]",
            mobileDrawer ? "h-8 w-8" : "h-7 w-7"
          )}
        >
          {current.flag}
        </span>
        <span
          key={current.label}
          className={cn(
            "locale-label-swap font-heading text-xs font-bold uppercase tracking-[0.18em] text-white/90 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100",
            mobileDrawer ? "inline-flex" : "hidden sm:inline-flex"
          )}
        >
          {current.label}
        </span>
      </span>

      {mobileDrawer ? (
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-gold-400">
          {targetLabel}
        </span>
      ) : null}
    </button>
  );
}
