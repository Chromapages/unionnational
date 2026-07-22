import { cn } from "@/lib/utils";

type ServicePageContainerProps = {
    children: React.ReactNode;
    variant?: "narrow" | "wide";
    className?: string;
};

export function ServicePageContainer({ children, variant = "wide", className }: ServicePageContainerProps) {
    return (
        <div className={cn("mx-auto px-5 md:px-6 lg:px-8", variant === "narrow" ? "max-w-[52.8125rem]" : "max-w-7xl", className)}>
            {children}
        </div>
    );
}
