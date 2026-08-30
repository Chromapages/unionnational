import { ShieldCheck } from "lucide-react";

type EABadgeProps = {
  className?: string;
  label?: string;
  detail?: string;
  compact?: boolean;
};

export const EABadge = ({
  className = "",
  label = "Enrolled Agent",
  detail = "Federally licensed by the IRS",
  compact = false,
}: EABadgeProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center justify-center rounded-full bg-gold-500/20 border-2 border-gold-500 ${compact ? "h-8 w-8" : "h-10 w-10"}`}>
        <ShieldCheck aria-hidden="true" className={`${compact ? "h-4 w-4" : "h-5 w-5"} text-gold-500`} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
          {label}
        </span>
        <span className={`${compact ? "text-[11px] leading-tight" : "text-xs"} text-zinc-400`}>
          {detail}
        </span>
      </div>
    </div>
  );
};
