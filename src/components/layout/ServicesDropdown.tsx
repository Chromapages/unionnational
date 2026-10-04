"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChartNoAxesCombined, ChevronDown, ChevronRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { getServiceHref, mergeServiceNavigationData, type ServiceSummary } from "./navigationData";

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
  const menuId = "header-services-panel";
  const buttonId = "header-services-button";
  const isServicesActive = forcedIsActive ?? pathname.startsWith("/services");
  const serviceData = mergeServiceNavigationData(services);

  const visibleServices = serviceData.filter(
    (service) => !getServiceHref(service).startsWith("/industries/"),
  );

  const groupDefinitions = [
    {
      id: "advisory",
      title: t("servicesGroupAdvisory"),
      hrefs: ["/s-corp-tax-advantage", "/tax-planning", "/strategic-bookkeeping", "/fractional-cfo"],
    },
    {
      id: "implementation",
      title: t("servicesGroupImplementation"),
      hrefs: ["/tax-preparation-and-filing", "/new-business-formation", "/payroll-services"],
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

  const renderServiceLink = (service: ServiceSummary) => {
    const href = getServiceHref(service);
    const serviceTitle = getServiceLabel(href, service.title);
    const serviceKey = service._id || service.slug?.current || serviceTitle;
    const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <li key={serviceKey}>
        <Link
          ref={serviceKey === firstServiceKey ? firstLinkRef : undefined}
          href={href}
          onClick={handleClose}
          aria-current={isCurrent ? "page" : undefined}
          className={cn(
            "group/item flex min-h-10 items-center justify-between gap-4 rounded-md px-2 py-1 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
            isCurrent
              ? "bg-gold-500/15 text-gold-300"
              : "text-white hover:bg-white/5 hover:text-gold-200",
          )}
        >
          <span>{serviceTitle}</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-gold-300 transition-transform group-hover/item:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
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
          "strategy-services-trigger group relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
          isServicesActive || isOpen
            ? "bg-white/10 text-white"
            : "text-white hover:bg-white/5",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300",
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        <span className="relative z-10">{t("services")}</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={cn("relative z-10 transition-transform duration-200", isOpen && "rotate-180")}
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
          className="fixed left-[calc(50%+6rem)] z-30 w-[min(59rem,calc(100vw-3rem))] -translate-x-1/2 overflow-y-auto overscroll-contain pt-2 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
          style={{
            top: "calc(var(--header-height, 76px) - 0.5rem)",
            maxHeight: "calc(100dvh - var(--header-height, 76px) - 1rem)",
          }}
        >
          <div className="overflow-hidden rounded-2xl border border-gold-600/60 bg-brand-500 shadow-2xl shadow-black/60">
            <div className="grid grid-cols-[1fr_1fr_0.9fr] px-7 py-6">
                {serviceGroups.slice(0, 2).map((group, index) => (
                  <section
                    key={group.id}
                    aria-labelledby={`${menuId}-${group.id}`}
                    className={cn("border-r border-white/20", index === 0 ? "pr-7" : "px-7")}
                  >
                    <h3
                      id={`${menuId}-${group.id}`}
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300"
                    >
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-0.5">
                      {group.services.map(renderServiceLink)}
                    </ul>
                  </section>
                ))}
                <div className="flex flex-col justify-center gap-3 pl-7">
                  <Link
                    href="/services#services"
                    onClick={handleClose}
                    className="group flex min-h-12 items-center justify-between gap-3 rounded-lg border border-gold-300 px-4 text-sm font-medium text-gold-200 transition-colors hover:bg-gold-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
                  >
                    <ChartNoAxesCombined className="h-4 w-4" aria-hidden="true" />
                    <span className="mr-auto">{t("servicesDropdownCompare")}</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services"
                    onClick={handleClose}
                    aria-current={pathname === "/services" ? "page" : undefined}
                    className="group flex min-h-12 items-center justify-between gap-3 rounded-lg bg-gold-300 px-4 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
                  >
                    {t("servicesDropdownViewAll")}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              {serviceGroups.slice(2).map((group) => (
                <section key={group.id} aria-labelledby={`${menuId}-${group.id}`} className="border-t border-white/15 px-7 py-4">
                  <h3 id={`${menuId}-${group.id}`} className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{group.title}</h3>
                  <ul className="mt-2 grid grid-cols-2 gap-x-8">{group.services.map(renderServiceLink)}</ul>
                </section>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
