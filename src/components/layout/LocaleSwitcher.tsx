"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useSynchronizedLocale } from "@/i18n/use-synchronized-locale";

type LocaleSwitcherProps = {
  className?: string;
  mobileDrawer?: boolean;
};

export function LocaleSwitcher({ className, mobileDrawer = false }: LocaleSwitcherProps) {
  const t = useTranslations("Header");
  const { locale, isPending, syncLocale } = useSynchronizedLocale();

  const nextLocale = locale === "es" ? "en" : "es";
  const targetLabel = nextLocale === "es" ? t("switchToSpanish") : t("switchToEnglish");

  return (
    <button
      type="button"
      onClick={() => syncLocale(nextLocale)}
      disabled={isPending}
      aria-label={targetLabel}
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
          <span className="text-sm font-medium text-white/80">
            {locale === "en" ? "English" : "Español"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            {nextLocale.toUpperCase()}
          </span>
        </>
      ) : (
        <span className="font-heading text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
          {locale.toUpperCase()}
        </span>
      )}
    </button>
  );
}
