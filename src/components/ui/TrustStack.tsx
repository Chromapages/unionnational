import { cn } from "@/lib/utils";

export type TrustStackItem = {
    value: string;
    label: string;
};

type TrustStackProps = {
    items: TrustStackItem[];
    ariaLabel: string;
    className?: string;
    compactOnMobile?: boolean;
};

export function TrustStack({ items, ariaLabel, className, compactOnMobile = false }: TrustStackProps) {
    return (
        <dl
            aria-label={ariaLabel}
            className={cn(
                compactOnMobile
                    ? "grid grid-cols-3 divide-x divide-white/15 border-y border-white/10 py-3 text-center sm:gap-4 sm:divide-x-0 sm:border-white/15 sm:py-5 sm:text-left"
                    : "grid grid-cols-1 gap-3 border-y border-white/15 py-5 sm:grid-cols-3 sm:gap-4",
                className,
            )}
        >
            {items.map((item) => (
                <div key={`${item.value}-${item.label}`} className="min-w-0 px-1 first:pl-0 last:pr-0 sm:px-0">
                    <dd className={cn("font-heading font-bold leading-tight text-gold-400", compactOnMobile ? "text-xs sm:text-lg" : "text-base sm:text-lg")}>{item.value}</dd>
                    <dt className={cn(compactOnMobile ? "mt-0.5 text-[10px] leading-tight text-white/65 sm:mt-1 sm:text-sm sm:leading-snug" : "mt-1 text-sm leading-snug text-white/65")}>{item.label}</dt>
                </div>
            ))}
        </dl>
    );
}
