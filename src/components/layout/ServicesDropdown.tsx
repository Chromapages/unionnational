"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Hammer, Utensils } from "lucide-react";
import * as Icons from "lucide-react";

export type ServiceSummary = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  shortDescription?: string;
  category?: string;
  icon?: string;
  isPopular?: boolean;
  badge?: string;
};

const fallbackServices: ServiceSummary[] = [
  {
    title: "Strategic Bookkeeping",
    slug: { current: "bookkeeping" },
    icon: "Calculator",
    shortDescription: "Detailed records for cash flow & decisions",
    category: "Tax",
  },
  {
    title: "S-Corp Tax Advantage",
    slug: { current: "s-corp" },
    icon: "TrendingUp",
    shortDescription: "Save up to $15,000/year in taxes",
    category: "Tax",
    isPopular: true,
  },
  {
    title: "Tax Filing & Preparation",
    slug: { current: "tax-filing" },
    icon: "FileText",
    shortDescription: "Accurate, compliant, optimized filing",
    category: "Tax",
  },
  {
    title: "Fractional CFO",
    slug: { current: "cfo" },
    icon: "Briefcase",
    shortDescription: "High-level financial leadership",
    category: "Business",
  },
  {
    title: "Tax Planning Consulting",
    slug: { current: "tax-planning" },
    icon: "Target",
    shortDescription: "Personalized tax-saving strategies",
    category: "Business",
  },
  {
    title: "New Business Formation",
    slug: { current: "formation" },
    icon: "Building2",
    shortDescription: "Smart entity structure guidance",
    category: "Business",
  },
];

const isTaxCategory = (category?: string) => {
  if (!category) return true;
  return category.toLowerCase().includes("tax");
};

const getServiceHref = (service: ServiceSummary) => {
  if (service.slug?.current) {
    return `/services/${service.slug.current}`;
  }
  return "/services";
};

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
  const pathname = usePathname();
  const isServicesActive = pathname.startsWith("/services");
  const serviceData = services?.length ? services : fallbackServices;
  // Split services into two columns locally for display
  const halfLength = Math.ceil(serviceData.length / 2);
  const leftColumnServices = serviceData.slice(0, halfLength);
  const rightColumnServices = serviceData.slice(halfLength);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button - Enhanced hover effect */}
      <button
        className={cn(
          "group relative flex items-center gap-1.5 px-3 py-2 text-[0.9375rem] font-medium",
          "rounded transition-all duration-300 ease-out",
          isServicesActive ? "text-gold-500" : "text-white",
          "hover:text-gold-500"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Hover background with animated border */}
        <span
          className={cn(
            "absolute inset-0 rounded transition-all duration-300",
            isOpen ? "bg-gold-500/10 ring-1 ring-gold-500/30" : "bg-transparent",
            "group-hover:bg-gold-500/10 group-hover:ring-1 group-hover:ring-gold-500/30"
          )}
        />

        {/* Text with glow effect on hover */}
        <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
          Services
        </span>
        <ChevronDown
          size={16}
          className={`relative z-10 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
        />

        {/* Active indicator underline */}
        <span
          className={cn(
            "absolute bottom-1 left-3 right-3 h-0.5 rounded-full",
            "bg-gradient-to-r from-gold-500 to-gold-600",
            "transition-transform duration-300 origin-left",
            isServicesActive || isOpen ? "scale-x-100" : "scale-x-0",
            "group-hover:scale-x-100"
          )}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 pt-4",
            "transition-all duration-300 ease-out",
            "opacity-100 visible translate-y-0"
          )}
        >
          {/* Dropdown arrow/caret */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-slate-100" />

          <div className="relative w-[680px] bg-white rounded-xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-0 divide-x divide-slate-50 p-2">
              {/* Left Column */}
              <div className="p-4">
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  Tax Services
                </h3>
                <div className="space-y-0.5">
                  {leftColumnServices.map((service) => {
                    const ServiceIcon = getIcon(service.icon);
                    const serviceTitle = service.title || "Service";
                    const serviceKey = service._id || service.slug?.current || serviceTitle;
                    return (
                      <Link
                        key={serviceKey}
                        href={getServiceHref(service)}
                        className="group/item flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-slate-50"
                      >
                        <ServiceIcon
                          size={18}
                          className="text-slate-400 transition-colors duration-200 group-hover/item:text-brand-600"
                        />
                        <span className="font-medium text-[0.9375rem] text-slate-700 group-hover/item:text-brand-900 transition-colors duration-200">
                          {serviceTitle}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right Column */}
              <div className="p-4">
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2 opacity-0">
                  &nbsp;
                </h3>
                <div className="space-y-0.5">
                  {rightColumnServices.map((service) => {
                    const ServiceIcon = getIcon(service.icon);
                    const serviceTitle = service.title || "Service";
                    const serviceKey = service._id || service.slug?.current || serviceTitle;
                    return (
                      <Link
                        key={serviceKey}
                        href={getServiceHref(service)}
                        className="group/item flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-slate-50"
                      >
                        <ServiceIcon
                          size={18}
                          className="text-slate-400 transition-colors duration-200 group-hover/item:text-brand-600"
                        />
                        <span className="font-medium text-[0.9375rem] text-slate-700 group-hover/item:text-brand-900 transition-colors duration-200">
                          {serviceTitle}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VSL Industry Cards Footer */}
            <div className="grid grid-cols-2 gap-px bg-slate-100 border-t border-slate-100">
              <Link
                href="/vsl/construction"
                className="group/card relative bg-slate-50/50 p-6 transition-colors hover:bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover/card:text-brand-600 group-hover/card:border-brand-100 transition-colors">
                    <Hammer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Construction</div>
                    <div className="font-semibold text-brand-900 group-hover/card:text-brand-600 transition-colors">
                      Tax Strategy
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/vsl/restaurants"
                className="group/card relative bg-slate-50/50 p-6 transition-colors hover:bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover/card:text-brand-600 group-hover/card:border-brand-100 transition-colors">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Restaurants</div>
                    <div className="font-semibold text-brand-900 group-hover/card:text-brand-600 transition-colors">
                      Profit Recovery
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* View All Link */}
            <div className="bg-white py-3 text-center border-t border-slate-100">
              <Link
                href="/services"
                className="group/all inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight size={12} className="group-hover/all:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
