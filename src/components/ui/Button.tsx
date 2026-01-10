import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
// Removed unused import

// Actually, I don't have radix installed, so I'll stick to standard button.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-brand-900 text-white hover:bg-gold-500 hover:text-brand-900 shadow-lg shadow-brand-900/20 border border-brand-900 transition-all duration-300",
            outline: "bg-transparent border border-slate-200 text-slate-600 hover:bg-gold-50 hover:text-brand-900 hover:border-gold-200 transition-colors",
            ghost: "bg-transparent text-slate-600 hover:text-gold-600 hover:bg-gold-50 transition-colors",
        };

        const sizes = {
            sm: "px-4 py-2 text-xs",
            md: "px-5 py-2.5 text-sm",
            lg: "px-8 py-3.5 text-sm",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-bold font-heading disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
