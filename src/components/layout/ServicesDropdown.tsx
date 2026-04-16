"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Hammer, Utensils, Building2, ShieldAlert } from "lucide-react";
import * as Icons from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { fallbackServices, getServiceHref, type ServiceSummary } from "./navigationData";

const getIcon = (iconName?: string) => {
  if (!iconName) {
    return Icons.Briefcase;
  }

  // @ts-expect-error - Lucide exports aren't typed for dynamic access
  return Icons[iconName] || Icons.Briefcase;
};

type ServicesDropdownProps = {
  services?: ServiceSummary[];
};

export const ServicesDropdown = ({ services }: ServicesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const menuId = useId();
  const buttonId = useId();
  const isServicesActive = pathname.startsWith("/services");
  const serviceData = services?.length ? services : fallbackServices;
  const advisoryServices = serviceData.filter((service) => service.category === "Advisory");
  const supportServices = serviceData.filter(
    (service) =>
      service.category === "Support" ||
      !service.category ||
      service.category === "Business" ||
      service.category === "Tax"
  );
  const firstServiceKey =
    advisoryServices[0]?._id ||
    advisoryServices[0]?.slug?.current ||
    advisoryServices[0]?.title ||
    supportServices[0]?._id ||
    supportServices[0]?.slug?.current ||
    supportServices[0]?.title;

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
    const serviceTitle = service.title || "Service";
    const serviceKey = service._id || service.slug?.current || serviceTitle;

    return (
      <Link
        key={serviceKey}
        ref={serviceKey === firstServiceKey ? firstLinkRef : undefined}
        href={getServiceHref(service)}
        onClick={handleClose}
        className="group/item flex items-center gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
      >
        <ServiceIcon
          size={18}
          aria-hidden="true"
          className="text-slate-400 transition-colors duration-200 group-hover/item:text-gold-500"
        />
        <span className="font-medium text-[0.9375rem] text-slate-200 transition-colors duration-200 group-hover/item:text-white">
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
      onFocusCapture={handleOpen}
      onBlurCapture={handleContainerBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        className={cn(
          "group relative flex items-center gap-1.5 rounded px-1.5 py-2 text-[0.9375rem] font-medium transition-all duration-300 ease-out lg:px-3",
          isServicesActive ? "text-gold-500" : "text-white",
          "hover:text-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
        )}
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
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
          Services
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

      {isOpen && (
        <div
          id={menuId}
          aria-labelledby={buttonId}
          onKeyDown={handleMenuKeyDown}
          className="absolute top-full left-1/2 visible -translate-x-1/2 translate-y-0 pt-4 opacity-100 transition-all duration-300 ease-out"
        >
          <div className="absolute top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-[#0D2E2B]" />

          <div className="relative w-[680px] overflow-hidden rounded-xl border border-white/10 bg-[#0D2E2B] shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-0 divide-x divide-white/5 p-2">
              <div className="p-4">
                <h3 className="mb-2 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gold-500/80">
                  Advisory Services
                </h3>
                <div className="space-y-0.5">
                  {advisoryServices.map(renderServiceLink)}
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-2 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Support & Compliance
                </h3>
                <div className="space-y-0.5">
                  {supportServices.map(renderServiceLink)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/5">
              <Link
                href="/industries/construction"
                onClick={handleClose}
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-gold-500/80 shadow-sm transition-colors group-hover/card:border-gold-500/30 group-hover/card:text-gold-400">
                    <Hammer className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Construction</div>
                    <div className="font-semibold text-slate-200 transition-colors group-hover/card:text-white">
                      Tax Strategy
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="/industries/restaurants"
                onClick={handleClose}
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-gold-500/80 shadow-sm transition-colors group-hover/card:border-gold-500/30 group-hover/card:text-gold-400">
                    <Utensils className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Restaurants</div>
                    <div className="font-semibold text-slate-200 transition-colors group-hover/card:text-white">
                      Profit Recovery
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/vsl/real-estate"
                onClick={handleClose}
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-gold-500/80 shadow-sm transition-colors group-hover/card:border-gold-500/30 group-hover/card:text-gold-400">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Real Estate</div>
                    <div className="font-semibold text-slate-200 transition-colors group-hover/card:text-white">
                      Investor Program
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/vsl/tax-resolution"
                onClick={handleClose}
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-gold-500/80 shadow-sm transition-colors group-hover/card:border-gold-500/30 group-hover/card:text-gold-400">
                    <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tax Resolution</div>
                    <div className="font-semibold text-slate-200 transition-colors group-hover/card:text-white">
                      IRS Help
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="border-t border-white/10 bg-[#0b2926] py-3 text-center">
              <Link
                href="/services"
                onClick={handleClose}
                className="group/all inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500"
                id="view-all-services-link"
              >
                <span>View All Services</span>
                <ArrowRight size={12} aria-hidden="true" className="transition-transform group-hover/all:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
