"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronDown, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { fallbackServices, getServiceHref, type ServiceSummary } from "./navigationData";

const getIcon = (iconName?: string): LucideIcon => {
  if (!iconName) {
    return Icons.Briefcase;
  }

  const Icon = (Icons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon || Icons.Briefcase;
};

type ServicesDropdownProps = {
  services?: ServiceSummary[];
};

export const ServicesDropdown = ({ services }: ServicesDropdownProps) => {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const menuId = useId();
  const buttonId = useId();
  const isServicesActive = pathname.startsWith("/services");
  const serviceData = services?.length ? services : fallbackServices;
  
  const featuredService = serviceData.find((service) => service.isPopular) || serviceData[0];

  const firstServiceKey =
    featuredService?._id ||
    featuredService?.slug?.current ||
    featuredService?.title ||
    serviceData[0]?._id;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && !containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  const handleContainerBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && containerRef.current?.contains(nextTarget)) {
      return;
    }

    setIsOpen(false);
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const renderServiceLink = (service: ServiceSummary) => {
    const ServiceIcon = getIcon(service.icon);
    const serviceTitle = service.title || t("servicesDropdownFallbackServiceTitle");
    const serviceKey = service._id || service.slug?.current || serviceTitle;

    return (
      <Link
        key={serviceKey}
        ref={serviceKey === firstServiceKey ? firstLinkRef : undefined}
        href={getServiceHref(service)}
        onClick={handleClose}
        className="group/item flex items-center gap-3 py-2 px-2 rounded-xl transition-all duration-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
      >
        <div className="flex shrink-0 items-center justify-center h-9 w-9 rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500 transition-all group-hover/item:bg-gold-500/20 group-hover/item:scale-105">
          <ServiceIcon size={18} aria-hidden="true" strokeWidth={1.5} />
        </div>
        <span className="font-medium text-white text-[0.9375rem] transition-colors group-hover/item:text-gold-400">
          {serviceTitle}
        </span>
      </Link>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onBlurCapture={handleContainerBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        className={cn(
          "group relative flex items-center gap-1.5 rounded px-1.5 py-2 text-[0.9375rem] font-medium transition-all duration-300 ease-out lg:px-3",
          isServicesActive || isOpen ? "text-gold-500" : "text-white",
          "hover:text-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
        )}
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={menuId}
      >
        <span
          className={cn(
            "absolute inset-0 rounded transition-all duration-300",
            isOpen ? "bg-gold-500/10 ring-1 ring-gold-500/30" : "bg-transparent",
            "group-hover:bg-gold-500/10 group-hover:ring-1 group-hover:ring-gold-500/30"
          )}
        />

        <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
          {t("services")}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={cn("relative z-10 transition-transform duration-300 ease-out", isOpen && "rotate-180")}
        />

        <span
          className={cn(
            "absolute bottom-1 left-3 right-3 h-0.5 origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-600 transition-transform duration-300",
            isServicesActive || isOpen ? "scale-x-100" : "scale-x-0",
            "group-hover:scale-x-100"
          )}
        />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="dialog"
          aria-labelledby={buttonId}
          aria-label={t("servicesDropdownAriaLabel")}
          onKeyDown={handleMenuKeyDown}
          className="absolute left-1/2 top-full z-30 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 pt-4"
        >
          {/* Arrow */}
          <div className="absolute left-1/2 top-[10px] h-4 w-4 -translate-x-1/2 rotate-45 bg-brand-500 border-t border-l border-gold-500/20 shadow-[-2px_-2px_2px_rgba(0,0,0,0.1)]" />

          <div className="overflow-hidden rounded-[2rem] border border-gold-500/50 bg-brand-500 shadow-2xl shadow-black/80 ring-1 ring-white/5">
            <div className="px-8 py-8">
              <div className="border-b border-white/10 pb-6 mb-6">
                <h3 className="font-heading text-[1.75rem] font-bold tracking-tight text-white uppercase opacity-80 leading-none">
                  BROWSE OUR SERVICES
                </h3>
                <p className="mt-3 text-[1rem] text-zinc-400 font-medium">
                  Quick access to core solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                {serviceData.slice(0, 12).map((service) => renderServiceLink(service))}
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/services"
                  onClick={handleClose}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-gold-500 px-8 text-[0.8125rem] font-bold uppercase tracking-widest text-brand-900 transition-all hover:bg-gold-400 hover:scale-105"
                >
                  VIEW ALL SERVICES
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
