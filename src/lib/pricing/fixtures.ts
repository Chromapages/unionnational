import type { PricingPageContent, PricingTier } from "@/types/sanity";

// Draft-only ledger from the October 12 plan. Fixture identifiers are not CMS document IDs.
export function getDraftPricingPage(locale: string): PricingPageContent {
  const es = locale === "es";
  const copy = (english: string, spanish: string) => es ? spanish : english;
  const offer = (slug: string, category: string, name: string, price: string, includes: string, priceNote: string, service: string, billingPeriod?: string, bestFor?: string): PricingTier => ({
    _id: `fixture:${slug}`, slug: { current: slug }, category, name, price, includes, priceNote, billingPeriod, bestFor,
    relatedService: { title: name, slug: { current: service } },
    ctaText: copy("Discuss this service", "Consultar servicio"),
    ctaUrl: "/contact",
  });
  const offers = [
    offer("cpob", "advisory", copy("Construction Profit and Operations Blueprint", "Plan de rentabilidad y operaciones de construcción"), copy("From $2,500", "Desde $2,500"),
      copy("Outsourced CFO, bookkeeping, project accounting and tax team. Job costing/WIP, cash-flow forecasts, year-round tax planning, owner compensation, business and owner returns.", "Equipo externo de dirección financiera, contabilidad, contabilidad de proyectos e impuestos. Costos por obra y trabajo en curso, proyecciones de flujo de efectivo, planificación fiscal anual, remuneración del propietario y declaraciones del negocio y del propietario."),
      copy("Revenue-tier prices are not approved. Payroll treatment, service cadence and owner/entity/state allowances require confirmation.", "No hay precios aprobados por nivel de ingresos. La nómina, la frecuencia del servicio y los límites de propietarios, entidades y estados requieren confirmación."), "fractional-cfo", "monthly",
      copy("Construction and trades businesses with $750K-$10M in revenue.", "Empresas de construcción y oficios con ingresos de $750K-$10M.")),
    offer("bookkeeping", "optional", copy("Bookkeeping", "Contabilidad"), copy("From $595", "Desde $595"),
      copy("Monthly reconciliations and financial statements.", "Conciliaciones mensuales y estados financieros."),
      copy("Revenue and volume affect the quote. Cleanup and onboarding scope must be confirmed separately.", "Los ingresos y el volumen afectan la cotización. La limpieza contable y la incorporación se confirman por separado."), "strategic-bookkeeping", "monthly"),
    offer("payroll", "optional", copy("Payroll", "Nómina"), copy("From $250", "Desde $250"),
      copy("Up to 10 employees; payroll filings and state registrations.", "Hasta 10 empleados; declaraciones de nómina y registros estatales."),
      copy("One-time setup fee applies; amount pending. Additional employees, states and pay runs require confirmation. CPOB payroll treatment is not approved.", "Se aplica una tarifa inicial única; el importe está pendiente. Los empleados, estados y ciclos de pago adicionales requieren confirmación. La nómina dentro de CPOB no está aprobada."), "payroll-services", "monthly"),
    offer("partnership-returns", "business", copy("Partnership returns", "Declaraciones de sociedades"), copy("From $1,495", "Desde $1,495"),
      copy("Federal and Utah returns included.", "Incluye declaraciones federales y de Utah."),
      copy("Additional states, entities and complexity are quoted separately.", "Los estados, entidades y complejidad adicionales se cotizan por separado."), "tax-preparation-and-filing", "one-time"),
    offer("s-corporation-returns", "business", copy("S-corporation returns", "Declaraciones de corporaciones S"), copy("From $1,795", "Desde $1,795"),
      copy("Federal and Utah returns included.", "Incluye declaraciones federales y de Utah."),
      copy("Additional states, entities and complexity are quoted separately. This is return filing, not S-corp election or advisory.", "Los estados, entidades y complejidad adicionales se cotizan por separado. Este servicio es de presentación, no de elección ni asesoría de corporación S."), "tax-preparation-and-filing", "one-time"),
    offer("personal-returns", "individual", copy("Personal tax returns", "Declaraciones personales"), copy("From $595", "Desde $595"),
      copy("Federal and Utah returns, prepared by an Enrolled Agent.", "Declaraciones federales y de Utah, preparadas por un agente inscrito."),
      copy("Business income and rentals are priced separately. Included planning boundaries require approval and do not imply the full annual tax plan.", "Los ingresos empresariales y alquileres se cotizan por separado. El alcance de la planificación incluida requiere aprobación y no implica el plan fiscal anual completo."), "tax-preparation-and-filing", "one-time"),
    offer("tax-planning", "advisory", copy("Tax planning", "Planificación fiscal"), copy("From $3,500", "Desde $3,500"),
      copy("Written annual plan covering entity structure, owner pay, projections and a year-end strategy meeting.", "Plan anual escrito con estructura de la entidad, remuneración del propietario, proyecciones y reunión estratégica al cierre del año."),
      copy("Quarterly planning is available; cadence and pricing need approval. Return-filing inclusion is not confirmed.", "Hay planificación trimestral disponible; la frecuencia y los precios requieren aprobación. No está confirmada la inclusión de declaraciones."), "tax-planning", "annually"),
    offer("strategy-session", "optional", copy("Introductory strategy session", "Sesión estratégica introductoria"), "$495",
      copy("A paid introductory strategy session.", "Una sesión estratégica introductoria de pago."),
      copy("Credited toward a plan within 30 days. Credit trigger date and eligibility require confirmation.", "Se acredita a un plan dentro de 30 días. La fecha de inicio del plazo y la elegibilidad requieren confirmación."), "tax-planning", "one-time"),
    offer("irs-case-review", "optional", copy("IRS/back-tax case review", "Revisión de caso del IRS e impuestos atrasados"), "$750",
      copy("Review IRS records and options, then quote resolution separately.", "Revisión de registros y opciones del IRS; la resolución se cotiza por separado."),
      copy("Review fee credited toward resolution. Does not purchase resolution or guarantee an IRS outcome.", "La tarifa de revisión se acredita a la resolución. No compra la resolución ni garantiza un resultado ante el IRS."), "back-taxes-irs-tax-resolution", "one-time"),
    offer("cleanup", "optional", copy("Cleanup/catch-up", "Limpieza y actualización contable"), copy("Custom flat-fee quote", "Cotización personalizada de tarifa fija"),
      copy("Situation reviewed and fee agreed before work.", "Se revisa la situación y se acuerda la tarifa antes de trabajar."),
      copy("No numerical minimum or payment terms are approved. Work beyond the agreed scope is quoted separately.", "No hay un mínimo numérico ni condiciones de pago aprobadas. El trabajo fuera del alcance acordado se cotiza por separado."), "strategic-bookkeeping"),
  ].map((item, displayOrder) => ({ ...item, displayOrder }));
  return {
    hero: { heading: copy("Clear prices. Defined scope.", "Precios claros. Alcance definido."), description: copy("Review starting prices, included scope and separate fees before discussing the support you need.", "Revise precios iniciales, alcance y tarifas separadas antes de consultar el apoyo que necesita.") },
    offers,
    irsReviewOffer: offers.find(item => item.slug.current === "irs-case-review"),
    faq: { heading: copy("Pricing questions", "Preguntas sobre precios"), items: [
      { question: copy("Are these prices approved?", "¿Están aprobados estos precios?"), answer: copy("This local draft uses the October 12 working ledger. Jason's commercial approval is pending. Fees and scope must be agreed in writing before work; additional work is quoted separately.", "Este borrador local utiliza la propuesta del 12 de octubre. La aprobación comercial de Jason está pendiente. Las tarifas y el alcance se acuerdan por escrito antes de trabajar; el trabajo adicional se cotiza por separado.") },
      { question: copy("Which state returns are included?", "¿Qué declaraciones estatales se incluyen?"), answer: copy("The partnership, S-corporation and personal return starting prices include federal and Utah returns. Additional states and complexity require a separate quote.", "Los precios iniciales de declaraciones de sociedades, corporaciones S y personales incluyen las federales y de Utah. Otros estados y complejidad requieren una cotización separada.") },
      { question: copy("How do the two credits differ?", "¿En qué se diferencian los dos créditos?"), answer: copy("The $495 strategy session is credited toward a plan within 30 days; eligibility and the trigger date need confirmation. The $750 IRS review fee is credited toward resolution, with no 30-day rule stated.", "La sesión estratégica de $495 se acredita a un plan dentro de 30 días; la elegibilidad y la fecha inicial necesitan confirmación. La revisión del IRS de $750 se acredita a la resolución, sin un plazo de 30 días indicado.") },
    ] },
    closing: { heading: copy("Discuss the right scope", "Consulte el alcance adecuado"), description: copy("A free discovery call is separate from the paid strategy session and IRS case review.", "La llamada inicial gratuita es distinta de la sesión estratégica y la revisión del IRS de pago."), label: copy("Book a discovery call", "Agendar llamada inicial"), href: "/book" },
    seo: { metaTitle: copy("Draft pricing | Union National Tax", "Precios en borrador | Union National Tax"), metaDescription: copy("Local pricing draft pending commercial approval.", "Borrador local de precios pendiente de aprobación comercial."), noIndex: true },
  };
}
