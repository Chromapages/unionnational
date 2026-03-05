import { ShieldCheck } from "lucide-react";

export const EABadge = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/20 border-2 border-gold-500">
        <ShieldCheck className="w-5 h-5 text-gold-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
          Enrolled Agent
        </span>
        <span className="text-xs text-zinc-400">
          IRS Licensed
        </span>
      </div>
    </div>
  );
};
