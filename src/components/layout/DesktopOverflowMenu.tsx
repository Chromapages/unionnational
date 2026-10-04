"use client";

import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const shouldFocusFirstLinkRef = useRef(false);
  const panelId = "header-desktop-overflow-panel";
  const triggerId = "header-desktop-overflow-trigger";
  const hasActiveItem = items.some((item) => isNavigationPathActive(pathname, item.href));

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHoverCloseTimer = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => cancelHoverCloseTimer();
  }, []);

  useEffect(() => {
    cancelHoverCloseTimer();
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && !containerRef.current?.contains(target)) {
        cancelHoverCloseTimer();
        onOpenChange(false);
      }
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

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    cancelHoverCloseTimer();
    onOpenChange(true);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    cancelHoverCloseTimer();
    hoverTimeoutRef.current = setTimeout(() => {
      cancelHoverCloseTimer();
      onOpenChange(false);
    }, 200);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cancelHoverCloseTimer();
      shouldFocusFirstLinkRef.current = true;
      onOpenChange(true);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      cancelHoverCloseTimer();
      shouldFocusFirstLinkRef.current = false;
      onOpenChange(false);
    }
  };

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    cancelHoverCloseTimer();
    shouldFocusFirstLinkRef.current = false;
    onOpenChange(false);
    triggerRef.current?.focus();
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !containerRef.current?.contains(nextTarget)) {
      cancelHoverCloseTimer();
      onOpenChange(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="strategy-overflow-menu relative min-[1440px]:hidden"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlurCapture={handleBlur}
    >
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={t("moreOptions")}
        onClick={() => {
          cancelHoverCloseTimer();
          onOpenChange(!isOpen);
        }}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "group relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 motion-reduce:transition-none",
          hasActiveItem || isOpen
            ? "text-gold-400"
            : "text-slate-200 hover:text-white",
        )}
      >
        <span className="relative z-10">{t("more")}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("relative z-10 h-4 w-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180")}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gold-500 transition-transform duration-200",
            hasActiveItem || isOpen ? "scale-x-100" : "scale-x-0",
            "group-hover:scale-x-100",
          )}
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onKeyDown={handlePanelKeyDown}
          className="absolute right-0 top-full z-40 mt-3 w-72 overflow-hidden rounded-2xl border border-gold-500/35 bg-brand-500 p-2 shadow-2xl shadow-black/70 ring-1 ring-white/5 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
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
                        : "text-slate-200 hover:bg-white/5 hover:text-white",
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
