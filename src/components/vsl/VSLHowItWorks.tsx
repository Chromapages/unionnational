import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface VSLHowItWorksProps {
  steps?: { title: string; description: string; icon: string }[];
}

export function VSLHowItWorks({ steps }: VSLHowItWorksProps) {
  const defaultSteps = [
    {
      title: "Free Consultation & Analysis",
      description: "We review your full IRS account transcripts, calculate your true liability, and identify every legal resolution option available.",
      icon: "Search"
    },
    {
      title: "Negotiate Directly with IRS",
      description: "Our enrolled agents handle all communication. We file the right programs (OIC, CNC, IA) to minimize what you legally owe.",
      icon: "Shield"
    },
    {
      title: "Resolution & Clean Slate",
      description: "You receive written confirmation from the IRS. Collections stop. You start fresh — with a clear path forward.",
      icon: "CheckCircle2"
    },
  ];

  const items = steps && steps.length > 0 ? steps : defaultSteps;

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.CheckCircle2;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <section className="py-24 md:py-32 bg-[#051A18] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <div className="font-mono text-[11px] font-bold text-gold-500 tracking-[0.2em] uppercase mb-4 animate-fade-in">
            The Process
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-6 tracking-tight animate-fade-in-up">
            Three Steps to IRS Freedom
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          </div>

          {items.map((step, index) => (
            <div
              key={index}
              className="relative z-10 group animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] group">
                {/* Background Large Number */}
                <div className="absolute top-6 right-8 font-mono text-7xl font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-gold-500/10 transition-colors">
                  0{index + 1}
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-300">
                  {getIcon(step.icon)}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-[15px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
