import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
      <Link href="/" className="hover:text-gold-500 transition-colors flex items-center gap-1">
        <Home size={12} />
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight size={10} className="text-slate-600" />
          <Link 
            href={item.href} 
            className={`hover:text-gold-500 transition-colors ${
              index === items.length - 1 ? "text-gold-500" : ""
            }`}
            aria-current={index === items.length - 1 ? "page" : undefined}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};
