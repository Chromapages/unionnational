"use client";

import { useEffect, useId, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { isNavigationPathActive, type SiteNavigationItem } from "./navigationData";
import { LocaleSwitcher } from "./LocaleSwitcher";

type DesktopOverflowMenuProps = {
  items: readonly SiteNavigationItem[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function DesktopOverflowMenu({ items, isOpen, onOpenChange }: DesktopOverflowMenuProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const shouldFocusFirstLinkRef = useRef(false);
  const panelId = `${instanceId}-desktop-overflow-panel`;
  const triggerId = `${instanceId}-desktop-overflow-trigger`;
  const hasActiveItem = items.some((item) => isNavigationPathActive(pathname, item.href));

  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && !containerRef.current?.contains(target)) onOpenChange(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen || !shouldFocusFirstLinkRef.current) return;

    shouldFocusFirstLinkRef.current = false;
    firstLinkRef.current?.focus();
  }, [isOpen]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      shouldFocusFirstLinkRef.current = true;
      onOpenChange(true);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      shouldFocusFirstLinkRef.current = false;
      onOpenChange(false);
    }
  };

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    shouldFocusFirstLinkRef.current = false;
    onOpenChange(false);
    triggerRef.current?.focus();
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !containerRef.current?.contains(nextTarget)) onOpenChange(false);
  };

  return (
    <div ref={containerRef} className="relative 2xl:hidden" onBlurCapture={handleBlur}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={t("moreOptions")}
        onClick={() => onOpenChange(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "group relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none",
          hasActiveItem || isOpen
            ? "bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/20"
            : "text-white/75 hover:bg-gold-500/10 hover:text-white",
        )}
      >
        <span>{t("more")}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180")}
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          onKeyDown={handlePanelKeyDown}
          className="absolute right-0 top-full z-40 mt-3 w-72 overflow-hidden rounded-2xl border border-gold-500/35 bg-brand-500 p-2 shadow-2xl shadow-black/70 ring-1 ring-white/5"
        >
          <ul className="space-y-1">
            {items.map((item, index) => {
              const isCurrent = isNavigationPathActive(pathname, item.href);
              return (
                <li key={item.id}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
                      isCurrent
                        ? "bg-gold-500/15 text-gold-300"
                        : "text-white/75 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {t(item.translationKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-2 border-t border-white/10 pt-2">
            <LocaleSwitcher
              className="w-full justify-between px-4 py-2.5"
              mobileDrawer
              onLocaleChange={() => onOpenChange(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
