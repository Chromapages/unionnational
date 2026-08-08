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
    <nav aria-label="Breadcrumb" className={cn("text-sm font-medium leading-[1.3]", isDark ? "text-white/65" : "text-slate-600", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className={cn("flex items-center gap-1 transition-colors", isDark ? "hover:text-white" : "hover:text-slate-950")}>
            <Home size={14} aria-hidden="true" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <ChevronRight size={14} className={isDark ? "text-white/35" : "text-slate-400"} aria-hidden="true" />
            {index === items.length - 1 ? (
              <span className={isDark ? "text-white/80" : "text-slate-700"} aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className={cn("transition-colors", isDark ? "hover:text-white" : "hover:text-slate-950")}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
