import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { safeHref } from "@/lib/security/content-urls";

export function GatedContentBox({ locale = "en", className }: { locale?: string; className?: string }) {
    return (
        <div className={cn("rounded-2xl border border-white/10 bg-brand-950/60 p-8", className)}>
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20">
                    <MessageCircle className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">
                    {locale === "es" ? "¿Necesita ayuda con este capítulo?" : "Need help applying this chapter?"}
                </h3>
            </div>
            <p className="text-sm text-white/70">
                {locale === "es"
                    ? "Comparta sus datos de contacto y su pregunta para solicitar orientación de nuestro equipo."
                    : "Share your contact details and question to request guidance from our team."}
            </p>
            <a href={locale === "es" ? "/es/contact" : "/en/contact"} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-brand-950 hover:bg-gold-400">
                {locale === "es" ? "Solicitar orientación" : "Request guidance"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
        </div>
    );
}

export function GatedPdfButton({ pdfUrl, locale = "en", className }: { pdfUrl?: string; locale?: string; className?: string }) {
    const safePdfUrl = safeHref(pdfUrl);
    if (!safePdfUrl) return null;

    return (
        <a
            href={safePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-brand-950 transition-all hover:bg-gold-400", className)}
        >
            {locale === "es" ? "Abrir PDF" : "Open PDF"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
    );
}
