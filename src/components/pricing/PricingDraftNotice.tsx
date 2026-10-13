export function PricingDraftNotice({ locale }: { locale: string }) {
  return <aside aria-label={locale === "es" ? "Estado del borrador" : "Draft status"} className="mx-auto my-6 max-w-7xl rounded-xl border border-gold-400 bg-gold-50 px-5 py-4 text-sm leading-relaxed text-brand-950" data-pricing-draft>
    {locale === "es" ? "Borrador local. Precios del 12 de octubre pendientes de aprobación comercial de Jason. No confirma una contratación ni un pago." : "Local draft. October 12 prices are pending Jason's commercial approval. This preview does not confirm an engagement or payment."}
  </aside>;
}
