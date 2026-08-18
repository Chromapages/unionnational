"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { getServiceHref, mergeServiceNavigationData, type ServiceSummary } from "./navigationData";

const getIcon = (iconName?: string): LucideIcon => {
  if (!iconName) return Icons.Briefcase;
  return (Icons as unknown as Record<string, LucideIcon>)[iconName] || Icons.Briefcase;
};

type ServicesDropdownProps = {
  services?: ServiceSummary[];
  isActive?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export const ServicesDropdown = ({
  services,
  isActive: forcedIsActive,
  isOpen: controlledIsOpen,
  onOpenChange,
}: ServicesDropdownProps) => {
  const t = useTranslations("Header");
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const openedByHoverRef = useRef(false);
  const shouldFocusFirstLinkRef = useRef(false);
  const pathname = usePathname();
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const updateOpen = (nextIsOpen: boolean) => {
    if (controlledIsOpen === undefined) setInternalIsOpen(nextIsOpen);
    onOpenChange?.(nextIsOpen);
  };
  const instanceId = useId();
  const menuId = `${instanceId}-services-panel`;
  const buttonId = `${instanceId}-services-button`;
  const isServicesActive = forcedIsActive ?? pathname.startsWith("/services");
  const serviceData = mergeServiceNavigationData(services);

  const visibleServices = serviceData.filter(
    (service) => !getServiceHref(service).startsWith("/industries/"),
  );

  const groupDefinitions = [
    {
      id: "tax",
      title: t("servicesGroupTax"),
      description: t("servicesGroupTaxDescription"),
      hrefs: ["/s-corp-tax-advantage", "/tax-planning"],
    },
    {
      id: "numbers",
      title: t("servicesGroupNumbers"),
      description: t("servicesGroupNumbersDescription"),
      hrefs: ["/fractional-cfo", "/strategic-bookkeeping"],
    },
    {
      id: "compliance",
      title: t("servicesGroupCompliance"),
      description: t("servicesGroupComplianceDescription"),
      hrefs: ["/new-business-formation", "/payroll-services", "/tax-preparation-and-filing"],
    },
  ];

  const recognizedHrefs = new Set(groupDefinitions.flatMap((group) => group.hrefs));
  const serviceByHref = new Map(visibleServices.map((service) => [getServiceHref(service), service]));
  const serviceGroups = groupDefinitions
    .map((group) => ({
      ...group,
      services: group.hrefs
        .map((href) => serviceByHref.get(href))
        .filter((service): service is ServiceSummary => Boolean(service)),
    }))
    .filter((group) => group.services.length > 0);
  const otherServices = visibleServices.filter(
    (service) => !recognizedHrefs.has(getServiceHref(service)),
  );

  if (otherServices.length > 0) {
    serviceGroups.push({
      id: "other",
      title: t("servicesGroupOther"),
      description: t("servicesGroupOtherDescription"),
      hrefs: otherServices.map(getServiceHref),
      services: otherServices,
    });
  }

  const firstService = serviceGroups.flatMap((group) => group.services)[0];
  const firstServiceKey = firstService?._id || firstService?.slug?.current || firstService?.title;

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
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && !containerRef.current?.contains(target)) {
        cancelHoverCloseTimer();
        updateOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !shouldFocusFirstLinkRef.current) return;

    shouldFocusFirstLinkRef.current = false;
    firstLinkRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    cancelHoverCloseTimer();
    openedByHoverRef.current = false;
    updateOpen(false);
  }, [pathname]);

  const handleClose = () => {
    cancelHoverCloseTimer();
    openedByHoverRef.current = false;
    shouldFocusFirstLinkRef.current = false;
    updateOpen(false);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    cancelHoverCloseTimer();
    openedByHoverRef.current = true;
    updateOpen(true);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    cancelHoverCloseTimer();
    hoverTimeoutRef.current = setTimeout(() => {
      handleClose();
    }, 200);
  };

  const handleTriggerClick = () => {
    cancelHoverCloseTimer();
    // A mouse entering the trigger opens the panel before its click fires. Keep
    // that first click open; subsequent clicks still toggle as users expect.
    if (openedByHoverRef.current) {
      openedByHoverRef.current = false;
      updateOpen(true);
      return;
    }

    updateOpen(!isOpen);
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cancelHoverCloseTimer();
      shouldFocusFirstLinkRef.current = true;
      updateOpen(true);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      handleClose();
    }
  };

  const handleContainerBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !containerRef.current?.contains(nextTarget)) handleClose();
  };

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleClose();
      buttonRef.current?.focus();
    }
  };

  const getServiceLabel = (href: string, fallbackTitle?: string) => {
    switch (href) {
      case "/tax-planning": return t("serviceLabels.taxPlanning");
      case "/s-corp-tax-advantage": return t("serviceLabels.sCorp");
      case "/strategic-bookkeeping": return t("serviceLabels.bookkeeping");
      case "/fractional-cfo": return t("serviceLabels.fractionalCfo");
      case "/new-business-formation": return t("serviceLabels.formation");
      case "/payroll-services": return t("serviceLabels.payroll");
      case "/tax-preparation-and-filing": return t("serviceLabels.taxPreparation");
      default: return fallbackTitle || t("servicesDropdownFallbackServiceTitle");
    }
  };

  const renderServiceLink = (service: ServiceSummary, groupId: string) => {
    const ServiceIcon = getIcon(service.icon);
    const href = getServiceHref(service);
    const serviceTitle = getServiceLabel(href, service.title);
    const serviceKey = service._id || service.slug?.current || serviceTitle;
    const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
    const isRecommended = href === "/s-corp-tax-advantage";
    const isSupporting = groupId === "compliance";

    return (
      <li key={serviceKey}>
        <Link
          ref={serviceKey === firstServiceKey ? firstLinkRef : undefined}
          href={href}
          onClick={handleClose}
          aria-current={isCurrent ? "page" : undefined}
          className={cn(
            "group/item flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
            isCurrent
              ? "border-gold-500/50 bg-gold-500/15 text-gold-300"
              : isRecommended
                ? "border-gold-500/35 bg-gold-500/10 text-white hover:border-gold-400/60 hover:bg-gold-500/15"
                : isSupporting
                  ? "border-transparent text-white/80 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  : "border-transparent text-white hover:border-white/10 hover:bg-white/5",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500">
            <ServiceIcon size={18} aria-hidden="true" strokeWidth={1.5} />
          </span>
          <span className="min-w-0 text-sm font-semibold leading-snug transition-colors group-hover/item:text-gold-300">
            <span className="block">{serviceTitle}</span>
            {isRecommended ? (
              <span className="mt-0.5 block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-gold-400">
                {t("servicesDropdownPrimaryLabel")}
              </span>
            ) : null}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlurCapture={handleContainerBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        className={cn(
          "group relative flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
          isServicesActive
            ? "bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30"
            : isOpen
              ? "bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/20"
              : "text-white/75 hover:bg-gold-500/10 hover:text-white hover:ring-1 hover:ring-gold-500/20",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <span className="relative z-10">{t("services")}</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={cn("relative z-10 transition-transform duration-200", isOpen && "rotate-180")}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold-500 transition-transform duration-200",
            isServicesActive || isOpen ? "scale-x-100" : "scale-x-0",
            "group-hover:scale-x-100",
          )}
        />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="region"
          aria-labelledby={buttonId}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onKeyDown={handlePanelKeyDown}
          className="fixed left-1/2 z-30 w-[min(62rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto overscroll-contain pt-3 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
          style={{
            top: "var(--header-height, 76px)",
            maxHeight: "calc(100dvh - var(--header-height, 76px) - 1rem)",
          }}
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-gold-500/40 bg-brand-500 shadow-2xl shadow-black/70 ring-1 ring-white/5">
            <div className="px-6 py-6 lg:px-8">
              <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-white">
                    {t("servicesDropdownHeading")}
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-zinc-300">
                    {t("servicesDropdownSubheading")}
                  </p>
                </div>
                <Link
                  href="/services"
                  onClick={handleClose}
                  aria-current={pathname === "/services" ? "page" : undefined}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-gold-500/40 px-5 text-sm font-semibold text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:self-auto"
                >
                  {t("servicesDropdownViewAll")}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr_0.82fr]">
                {serviceGroups.map((group) => (
                  <section
                    key={group.id}
                    aria-labelledby={`${menuId}-${group.id}`}
                    className={cn(
                      group.id === "compliance" &&
                        "rounded-xl border border-white/10 bg-white/[0.025] p-4 md:-my-1",
                    )}
                  >
                    <h3
                      id={`${menuId}-${group.id}`}
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.14em]",
                        group.id === "compliance" ? "text-zinc-300" : "text-gold-400",
                      )}
                    >
                      {group.title}
                    </h3>
                    <p className="mt-2 min-h-10 text-sm leading-5 text-zinc-300">{group.description}</p>
                    <ul className="mt-3 space-y-1">
                      {group.services.map((service) => renderServiceLink(service, group.id))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
