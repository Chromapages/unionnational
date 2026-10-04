import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function GatedContentBox({ locale = "en", className }: { locale?: string; className?: string }) {
    return (
        <div className={cn("rounded-2xl border border-white/10 bg-brand-950/60 p-8", className)} role="status">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20">
                    <Lock className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                    {locale === "es" ? "Contenido adicional" : "Additional chapter content"}
                </h3>
            </div>
            <p className="text-sm text-white/70">
                {locale === "es"
                    ? "Este contenido no está disponible en este momento. Vuelva a consultarlo más tarde."
                    : "This content is unavailable right now. Please check back later."}
            </p>
        </div>
    );
}

export function GatedPdfButton({ pdfUrl, locale = "en", className }: { pdfUrl?: string; locale?: string; className?: string }) {
    if (!pdfUrl || !(pdfUrl.startsWith("https://") || (pdfUrl.startsWith("/") && !pdfUrl.startsWith("//")))) return null;

    return (
        <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-brand-950 transition-all hover:bg-gold-400", className)}
        >
            {locale === "es" ? "Abrir PDF" : "Open PDF"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
    );
}
