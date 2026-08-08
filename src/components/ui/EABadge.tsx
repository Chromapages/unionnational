import { ShieldCheck } from "lucide-react";

type EABadgeProps = {
  className?: string;
  label?: string;
  detail?: string;
};

export const EABadge = ({
  className = "",
  label = "Enrolled Agent",
  detail = "Federally licensed by the IRS",
}: EABadgeProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/20 border-2 border-gold-500">
        <ShieldCheck aria-hidden="true" className="w-5 h-5 text-gold-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
          {label}
        </span>
        <span className="text-xs text-zinc-400">
          {detail}
        </span>
      </div>
    </div>
  );
};
