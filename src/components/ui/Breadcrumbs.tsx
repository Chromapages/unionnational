import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
  className?: string;
}

export const Breadcrumbs = ({ items, variant = "light", className }: BreadcrumbsProps) => {
  const isDark = variant === "dark";

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-xs font-semibold", isDark ? "text-white/50" : "text-slate-400", className)}>
      <Link href="/" className={cn("flex items-center gap-1 transition-colors", isDark ? "hover:text-white/70" : "hover:text-gold-500")}>
        <Home size={12} />
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight size={12} className={isDark ? "text-white/30" : "text-slate-600"} aria-hidden="true" />
          {index === items.length - 1 ? (
            <span className="text-gold-400" aria-current="page">{item.label}</span>
          ) : (
            <Link href={item.href} className={cn("transition-colors", isDark ? "text-white/50 hover:text-white/70" : "hover:text-gold-500")}>
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
