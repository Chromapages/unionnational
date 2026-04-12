"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Hammer, Utensils, Building2, ShieldAlert } from "lucide-react";
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
    title: "S-Corp Tax Advantage",
    slug: { current: "s-corp-tax-advantage" },
    icon: "TrendingUp",
    shortDescription: "Evaluate whether an S-Corp election could reduce your tax burden",
    category: "Advisory",
    isPopular: true,
  },
  {
    title: "Fractional CFO",
    slug: { current: "fractional-cfo" },
    icon: "Briefcase",
    shortDescription: "High-level financial leadership",
    category: "Advisory",
  },
  {
    title: "Tax Planning Consulting",
    slug: { current: "tax-planning" },
    icon: "Target",
    shortDescription: "Personalized tax-saving strategies",
    category: "Advisory",
  },
  {
    title: "Strategic Bookkeeping",
    slug: { current: "strategic-bookkeeping" },
    icon: "Calculator",
    shortDescription: "Detailed records for cash flow & decisions",
    category: "Support",
  },
  {
    title: "Tax Filing & Preparation",
    slug: { current: "tax-filing-preparation" },
    icon: "FileText",
    shortDescription: "Accurate, compliant, optimized filing",
    category: "Support",
  },
  {
    title: "New Business Formation",
    slug: { current: "new-business-formation" },
    icon: "Building2",
    shortDescription: "Smart entity structure guidance",
    category: "Support",
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
  const advisoryServices = serviceData.filter(s => s.category === "Advisory");
  const supportServices = serviceData.filter(s => s.category === "Support" || !s.category || s.category === "Business" || s.category === "Tax"); // Fallback for unmatched categories
  
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button - Enhanced hover effect */}
      <button
        className={cn(
          "group relative flex items-center gap-1.5 px-1.5 lg:px-3 py-2 text-[0.9375rem] font-medium",
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
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0D2E2B] rotate-45 border-l border-t border-white/10" />

          <div className="relative w-[680px] bg-[#0D2E2B] rounded-xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden backdrop-blur-xl">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-0 divide-x divide-white/5 p-2">
              {/* Left Column */}
              <div className="p-4">
                <h3 className="px-3 text-[10px] font-bold text-gold-500/80 uppercase tracking-widest mb-2 flex items-center gap-2">
                  Advisory Services
                </h3>
                <div className="space-y-0.5">
                  {advisoryServices.map((service) => {
                    const ServiceIcon = getIcon(service.icon);
                    const serviceTitle = service.title || "Service";
                    const serviceKey = service._id || service.slug?.current || serviceTitle;
                    return (
                      <Link
                        key={serviceKey}
                        href={getServiceHref(service)}
                        className="group/item flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-white/5"
                      >
                        <ServiceIcon
                          size={18}
                          className="text-slate-400 transition-colors duration-200 group-hover/item:text-gold-500"
                        />
                        <span className="font-medium text-[0.9375rem] text-slate-200 group-hover/item:text-white transition-colors duration-200">
                          {serviceTitle}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right Column */}
              <div className="p-4">
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  Support & Compliance
                </h3>
                <div className="space-y-0.5">
                  {supportServices.map((service) => {
                    const ServiceIcon = getIcon(service.icon);
                    const serviceTitle = service.title || "Service";
                    const serviceKey = service._id || service.slug?.current || serviceTitle;
                    return (
                      <Link
                        key={serviceKey}
                        href={getServiceHref(service)}
                        className="group/item flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-white/5"
                      >
                        <ServiceIcon
                          size={18}
                          className="text-slate-400 transition-colors duration-200 group-hover/item:text-gold-500"
                        />
                        <span className="font-medium text-[0.9375rem] text-slate-200 group-hover/item:text-white transition-colors duration-200">
                          {serviceTitle}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VSL Industry Cards Footer */}
            <div className="grid grid-cols-2 gap-px bg-white/5 border-t border-white/10">
              <Link
                href="/industries/construction"
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-gold-500/80 shadow-sm group-hover/card:text-gold-400 group-hover/card:border-gold-500/30 transition-colors">
                    <Hammer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Construction</div>
                    <div className="font-semibold text-slate-200 group-hover/card:text-white transition-colors">
                      Tax Strategy
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="/industries/restaurants"
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-gold-500/80 shadow-sm group-hover/card:text-gold-400 group-hover/card:border-gold-500/30 transition-colors">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Restaurants</div>
                    <div className="font-semibold text-slate-200 group-hover/card:text-white transition-colors">
                      Profit Recovery
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/vsl/real-estate"
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-gold-500/80 shadow-sm group-hover/card:text-gold-400 group-hover/card:border-gold-500/30 transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Real Estate</div>
                    <div className="font-semibold text-slate-200 group-hover/card:text-white transition-colors">
                      Investor Program
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/vsl/tax-resolution"
                className="group/card relative bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-gold-500/80 shadow-sm group-hover/card:text-gold-400 group-hover/card:border-gold-500/30 transition-colors">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tax Resolution</div>
                    <div className="font-semibold text-slate-200 group-hover/card:text-white transition-colors">
                      IRS Help
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* View All Link */}
            <div className="bg-[#0b2926] py-3 text-center border-t border-white/10">
              <Link
                href="/services"
                className="group/all inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-gold-500 transition-colors"
                id="view-all-services-link"
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
