/*
 * Seeds the singleton `servicesPage` document.
 *
 * Run:
 *   node scripts/seed-services-page.mjs          # dry-run
 *   node scripts/seed-services-page.mjs --apply  # writes/updates the doc
 *
 * Requires:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION
 *   - SANITY_AUTH_TOKEN (only for --apply)
 */

import nextEnv from "@next/env";
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const apply = process.argv.includes("--apply");
const token = process.env.SANITY_AUTH_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09";

if (apply && !token) {
    throw new Error("SANITY_AUTH_TOKEN is required to apply this seed. Run without --apply to inspect first.");
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion,
    useCdn: false,
    token,
});

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const locStr = (en, es) => ({ _type: "localizedString", en, ...(es ? { es } : {}) });
const locTxt = (en, es) => ({ _type: "localizedText", en, ...(es ? { es } : {}) });
const key = (prefix) => `${prefix}-${randomUUID().slice(0, 8)}`;

const servicesPageDocId = "servicesPage";

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

const document = {
    _id: servicesPageDocId,
    _type: "servicesPage",

    heroBadge: locStr(
        "Financial Control, Tax Strategy & CFO Advisory",
        "Control Financiero, Estrategia Fiscal y Asesoría CFO",
    ),

    heroTitle: locStr(
        "Know your numbers every month — not once a year.",
        "Conoce tus números cada mes, no una vez al año.",
    ),

    heroSubtitle: locTxt(
        "Strategic bookkeeping, tax planning, payroll, and CFO guidance under one roof. Clean monthly data that turns into year-round tax savings.",
        "Contabilidad estratégica, planificación fiscal, nómina y asesoría CFO bajo un mismo techo. Datos mensuales limpios que se convierten en ahorros fiscales todo el año.",
    ),

    ctaTitle: locStr(
        "Not sure which service you need?",
        "¿No estás seguro qué servicio necesitas?",
    ),

    ctaSubtitle: locTxt(
        "Every engagement starts with a diagnostic. We'll examine your last 2 years of returns and current books to tell you exactly where you're overpaying — before you sign anything.",
        "Cada compromiso comienza con un diagnóstico. Revisaremos tus últimas 2 declaraciones y libros actuales para decirte exactamente dónde estás pagando de más, antes de firmar nada.",
    ),

    ctaButtonText: locStr("Book Your Diagnostic", "Reserva tu Diagnóstico"),
    ctaButtonUrl: "/intake",

    // ctaBackgroundImage:  upload via Studio (image asset) — keep undefined here.
    // alt pattern lives next to the image asset:
    //   defineField({ name: "alt", type: "localizedString" })

    seo: {
        _type: "seo",
        metaTitle: locStr(
            "Services | Union National Tax",
            "Servicios | Union National Tax",
        ),
        metaDescription: locTxt(
            "Strategic bookkeeping, tax planning, payroll, and CFO advisory for profitable business owners. Clean monthly data, year-round tax strategy, one trusted team.",
            "Contabilidad estratégica, planificación fiscal, nómina y asesoría CFO para dueños de negocios rentables. Datos mensuales limpios y estrategia fiscal durante todo el año.",
        ),
        keywords: [
            "strategic bookkeeping",
            "tax planning",
            "fractional CFO",
            "payroll services",
            "tax preparation",
            "small business accounting",
        ].map((en) => ({ _key: key("kw"), _type: "localizedString", en })),
        canonicalUrl: "https://unionnationaltax.com/services",
        noIndex: false,
        structuredDataType: "AccountingService",
    },
};

/* ------------------------------------------------------------------ */
/* Dry-run vs apply                                                   */
/* ------------------------------------------------------------------ */

if (!apply) {
    console.log(JSON.stringify({ mode: "dry-run", id: document._id, document }, null, 2));
    process.exit(0);
}

const transaction = client.transaction();
transaction.createIfNotExists(document);
transaction.patch(document._id, (patch) => patch.set(document));
await transaction.commit();
console.log(JSON.stringify({ mode: "applied", id: document._id }, null, 2));
