"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const NewsletterForm = () => {
  const t = useTranslations("Footer");
  const mailtoHref = "mailto:hello@unionnationaltax.com";

  return (
    <form
      className="flex flex-col gap-2"
      aria-describedby="footer-newsletter-status"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="footer-email" className="text-sm font-medium text-zinc-300">
        {t("newsletterTitle")}
      </label>
      <div className="flex">
        <input
          id="footer-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="name@example.com…"
          className={cn(
            "flex-1 rounded-l-lg border border-brand-700 bg-brand-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500",
            "transition-colors focus:border-gold-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          )}
          disabled
          aria-disabled="true"
        />
        <a
          href={mailtoHref}
          aria-label={t("newsletterEmailUs")}
          className={cn(
            "flex items-center justify-center rounded-r-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-900",
            "cursor-pointer transition-colors hover:bg-gold-400"
          )}
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p id="footer-newsletter-status" aria-live="polite" className="text-xs text-zinc-400">
        {t("newsletterUnavailable")}
      </p>
    </form>
  );
};
