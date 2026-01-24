"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  TrendingUp,
  FileText,
  Briefcase,
  Target,
  Building2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  DollarSign,
} from "lucide-react";

const taxServices = [
  {
    name: "Strategic Bookkeeping",
    href: "/services/bookkeeping",
    icon: Calculator,
    description: "Detailed records for cash flow & decisions",
  },
  {
    name: "S-Corp Tax Advantage",
    href: "/services/s-corp",
    icon: TrendingUp,
    description: "Save up to $15,000/year in taxes",
    featured: true,
  },
  {
    name: "Tax Filing & Preparation",
    href: "/services/tax-filing",
    icon: FileText,
    description: "Accurate, compliant, optimized filing",
  },
];

const businessServices = [
  {
    name: "Fractional CFO",
    href: "/services/cfo",
    icon: Briefcase,
    description: "High-level financial leadership",
  },
  {
    name: "Tax Planning Consulting",
    href: "/services/tax-planning",
    icon: Target,
    description: "Personalized tax-saving strategies",
  },
  {
    name: "New Business Formation",
    href: "/services/formation",
    icon: Building2,
    description: "Smart entity structure guidance",
  },
];

type ServicesDropdownProps = {
  isScrolled: boolean;
};

export const ServicesDropdown = ({ isScrolled }: ServicesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isServicesActive = pathname.startsWith("/services");

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button - Enhanced hover effect */}
      <button
        className={`
          group relative flex items-center gap-1.5 px-3 py-2 text-[0.9375rem] font-medium 
          rounded transition-all duration-300 ease-out
          ${isServicesActive ? "text-gold-500" : "text-white"}
          hover:text-gold-500
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Hover background with animated border */}
        <span className={`
          absolute inset-0 rounded transition-all duration-300
          ${isOpen ? "bg-gold-500/10 ring-1 ring-gold-500/30" : "bg-transparent"}
          group-hover:bg-gold-500/10 group-hover:ring-1 group-hover:ring-gold-500/30
        `} />
        
        {/* Text with glow effect on hover */}
        <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
          Services
        </span>
        <ChevronDown
          size={16}
          className={`relative z-10 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
        />
        
        {/* Active indicator underline */}
        <span className={`
          absolute bottom-1 left-3 right-3 h-0.5 rounded-full
          bg-gradient-to-r from-gold-500 to-gold-600
          transition-transform duration-300 origin-left
          ${isServicesActive || isOpen ? "scale-x-100" : "scale-x-0"}
          group-hover:scale-x-100
        `} />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 pt-4
          transition-all duration-300 ease-out
          ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3 pointer-events-none"}
        `}
      >
        {/* Dropdown arrow/caret */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-slate-200" />
        
        <div className="relative w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Two Column Grid */}
          <div className="grid grid-cols-2 gap-0 divide-x divide-slate-100">
            {/* Tax Services Column */}
            <div className="p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gold-500" />
                Tax Services
              </h3>
              <div className="space-y-1">
                {taxServices.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="group/item relative flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-gold-50/50"
                  >
                    {/* Icon container with animated border */}
                    <div className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 bg-brand-50 group-hover/item:bg-gold-500/15 group-hover/item:shadow-lg group-hover/item:shadow-gold-500/10">
                      <service.icon 
                        size={20} 
                        className="text-brand-500 transition-colors duration-200 group-hover/item:text-gold-600" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-brand-900 group-hover/item:text-gold-600 transition-colors duration-200">
                          {service.name}
                        </span>
                        {service.featured && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-gold-500 to-gold-400 text-brand-900 rounded-full uppercase shadow-sm">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5 group-hover/item:text-slate-600 transition-colors">
                        {service.description}
                      </p>
                    </div>
                    {/* Arrow indicator on hover */}
                    <ArrowRight 
                      size={16} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-500 opacity-0 -translate-x-2 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" 
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Business Services Column */}
            <div className="p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gold-500" />
                Business Services
              </h3>
              <div className="space-y-1">
                {businessServices.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="group/item relative flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-gold-50/50"
                  >
                    <div className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 bg-brand-50 group-hover/item:bg-gold-500/15 group-hover/item:shadow-lg group-hover/item:shadow-gold-500/10">
                      <service.icon 
                        size={20} 
                        className="text-brand-500 transition-colors duration-200 group-hover/item:text-gold-600" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-brand-900 group-hover/item:text-gold-600 transition-colors duration-200">
                        {service.name}
                      </span>
                      <p className="text-sm text-slate-500 mt-0.5 group-hover/item:text-slate-600 transition-colors">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight 
                      size={16} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-500 opacity-0 -translate-x-2 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" 
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Featured CTA Banner */}
          <div className="relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 bg-[length:200%_100%] animate-gradient-x" />
            
            {/* Sparkle decorations */}
            <div className="absolute top-2 left-8 w-1 h-1 bg-gold-400 rounded-full animate-pulse" />
            <div className="absolute bottom-3 left-24 w-1.5 h-1.5 bg-gold-500/60 rounded-full animate-pulse delay-300" />
            <div className="absolute top-3 right-32 w-1 h-1 bg-gold-400/80 rounded-full animate-pulse delay-150" />
            
            <Link
              href="/services/s-corp"
              className="relative group/cta flex items-center justify-between p-5"
            >
              <div className="flex items-center gap-4">
                {/* Animated icon container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gold-500/30 rounded-xl blur-md group-hover/cta:bg-gold-500/50 transition-all" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover/cta:scale-110 group-hover/cta:rotate-3 transition-all duration-300">
                    <DollarSign className="w-6 h-6 text-brand-900" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                  <span className="text-white font-bold text-lg">
                    S-Corp Tax Advantage
                  </span>
                  <span className="text-white/70 text-sm ml-3">
                    Save up to $15,000/year
                  </span>
                </div>
              </div>
              
              {/* Premium CTA Button */}
              <div className="flex items-center gap-3">
                <span className="relative overflow-hidden px-5 py-2.5 bg-gold-500 text-brand-900 font-bold rounded-lg shadow-lg shadow-gold-500/30 group-hover/cta:shadow-gold-500/50 transition-all duration-300 group-hover/cta:scale-105">
                  {/* Button shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Calculate Savings
                    <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* View All Link with hover animation */}
          <div className="bg-slate-50 px-6 py-3 text-center border-t border-slate-100">
            <Link
              href="/services"
              className="group/all inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-gold-600 transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
