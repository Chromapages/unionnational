/**
 * One-time Sanity content migration script.
 *
 * Prefills accurate Spanish (`es`) translations for the construction book
 * product document so the localized query in `PRODUCT_DETAIL_QUERY` resolves
 * to Spanish when the user is browsing `/es/...`.
 *
 * Run with:
 *   npx tsx scripts/seed-spanish-product-content.ts
 *   # or with --dry-run to preview without writing:
 *   npx tsx scripts/seed-spanish-product-content.ts --dry-run
 *
 * Requires `SANITY_AUTH_TOKEN` env var with write permission.
 */

import { createClient } from "next-sanity";

const PROJECT_ID = "p1x9y3wz";
const DATASET = "production";
const API_VERSION = "2026-01-09";

const CONSTRUCTION_BOOK_SLUG = "the-money-making-blueprint-for-construction-companies";

const isDryRun = process.argv.includes("--dry-run");

const spanishContent = {
    title: {
        en: "The Money-Making Blueprint for Construction Companies",
        es: "El Plan Para Generar Dinero en Empresas de Construcción",
    },
    shortDescription: {
        en: "The ultimate implementation guide to job costing, cash flow control, and protecting your construction margins.",
        es: "La guía de implementación definitiva para el costo de trabajo, el control del flujo de efectivo y la protección de sus márgenes de construcción.",
    },
    badge: {
        en: "Contractor Edition",
        es: "Edición para Contratistas",
    },
    fullDescription: {
        en: "A step-by-step playbook for contractors who want to stop running on 3-5% net margins and start building real wealth. Covers job costing, cash flow forecasting, estimating discipline, and overhead recovery — the four numbers that decide whether your business builds wealth or builds you a job you can't quit.",
        es: "Un manual paso a paso para contratistas que quieren dejar de operar con márgenes netos del 3-5% y comenzar a construir patrimonio real. Cubre el costo de trabajo, el pronóstico de flujo de efectivo, la disciplina de estimación y la recuperación de gastos generales: los cuatro números que deciden si su negocio construye riqueza o le construye a usted un trabajo del que no puede salir.",
    },
    orderBump: {
        name: {
            en: "30-Min Tax Strategy Call with Jason",
            es: "Llamada de Estrategia Fiscal de 30 Minutos con Jason",
        },
        description: {
            en: "Apply the blueprint to your business. 30 minutes with Jason, focused on your numbers.",
            es: "Aplique el plan a su negocio. 30 minutos con Jason, enfocados en sus números.",
        },
    },
    learningObjectives: [
        {
            en: {
                title: "Protect every margin dollar",
                description: "Set up job costing that catches losing jobs in the first two weeks — not the last two. Know your true cost before the next bid goes out.",
            },
            es: {
                title: "Proteja cada dólar de margen",
                description: "Configure el costo de trabajo para detectar trabajos con pérdidas en las primeras dos semanas — no en las últimas dos. Conozca su costo real antes de enviar la próxima oferta.",
            },
        },
        {
            en: {
                title: "Forecast cash, not just P&L",
                description: "Use a 13-week cash forecast and a payroll cushion so the next slow month doesn't force you to take a bad job at any price.",
            },
            es: {
                title: "Pronostique el efectivo, no solo la utilidad",
                description: "Use un pronóstico de efectivo a 13 semanas y un colchón de nómina para que el próximo mes lento no lo obligue a aceptar un mal trabajo a cualquier precio.",
            },
        },
        {
            en: {
                title: "Estimate like the top 10%",
                description: "Apply the 6 margin bands by trade and the decision matrix that lets you walk away from bad jobs. Stop winning bids you lose money on.",
            },
            es: {
                title: "Estime como el top 10%",
                description: "Aplique las 6 bandas de margen por oficio y la matriz de decisiones que le permite alejarse de los malos trabajos. Deje de ganar ofertas en las que pierde dinero.",
            },
        },
        {
            en: {
                title: "Pay less tax, keep more profit",
                description: "Use the S-Corp tax strategy that saves the average contractor $20K/year and the monthly tax set-aside system that ends the April surprise.",
            },
            es: {
                title: "Pague menos impuestos, conserve más ganancia",
                description: "Use la estrategia fiscal S-Corp que ahorra al contratista promedio $20K al año y el sistema mensual de reserva fiscal que elimina la sorpresa de abril.",
            },
        },
    ],
    features: [
        {
            en: "10-point profit leak checklist",
            es: "Lista de verificación de 10 puntos para detectar fugas de ganancias",
        },
        {
            en: "Job costing templates and weekly cadence",
            es: "Plantillas de costo de trabajo y cadencia semanal",
        },
        {
            en: "13-week cash flow forecast spreadsheet",
            es: "Hoja de cálculo de pronóstico de flujo de efectivo a 13 semanas",
        },
        {
            en: "6 margin bands by construction trade",
            es: "6 bandas de margen por oficio de construcción",
        },
        {
            en: "S-Corp tax strategy walkthrough",
            es: "Tutorial de estrategia fiscal S-Corp",
        },
        {
            en: "Monthly tax set-aside automation guide",
            es: "Guía de automatización de reserva fiscal mensual",
        },
    ],
};

const mergeLocalized = (current: unknown, additions: Record<string, string>) => {
    if (current && typeof current === "object" && !Array.isArray(current)) {
        const next: Record<string, unknown> = { ...(current as Record<string, unknown>) };
        for (const [key, value] of Object.entries(additions)) {
            if (typeof next[key] === "string" && (next[key] as string).length > 0) continue;
            next[key] = value;
        }
        return next;
    }
    return additions;
};

const mergeArrayLocalized = (current: unknown, additions: Array<Record<string, unknown>>) => {
    if (!Array.isArray(current)) return additions;
    return current.map((item, idx) => {
        const addition = additions[idx];
        if (!addition) return item;
        return mergeLocalized(item, addition as Record<string, string>);
    });
};

async function main() {
    const token = process.env.SANITY_AUTH_TOKEN;
    if (!token && !isDryRun) {
        console.error("ERROR: SANITY_AUTH_TOKEN is required (unless --dry-run).");
        process.exit(1);
    }

    const client = createClient({
        projectId: PROJECT_ID,
        dataset: DATASET,
        apiVersion: API_VERSION,
        useCdn: false,
        token: token || "dry-run-token",
    });

    const product = await client.fetch<{
        _id: string;
        _rev: string;
        title: unknown;
        shortDescription: unknown;
        badge: unknown;
        fullDescription: unknown;
        orderBump: unknown;
        learningObjectives: unknown;
        features: unknown;
    } | null>(
        `*[_type == "product" && slug.current == $slug][0]{
            _id, _rev, title, shortDescription, badge, fullDescription,
            orderBump, learningObjectives, features
        }`,
        { slug: CONSTRUCTION_BOOK_SLUG }
    );

    if (!product) {
        console.error(`No product found with slug "${CONSTRUCTION_BOOK_SLUG}"`);
        process.exit(1);
    }

    console.log(`Found product _id: ${product._id}`);

    const patch: Record<string, unknown> = {};
    const mergedTitle = mergeLocalized(product.title, spanishContent.title);
    if (JSON.stringify(mergedTitle) !== JSON.stringify(product.title)) {
        patch.title = mergedTitle;
    }

    const mergedShortDesc = mergeLocalized(product.shortDescription, spanishContent.shortDescription);
    if (JSON.stringify(mergedShortDesc) !== JSON.stringify(product.shortDescription)) {
        patch.shortDescription = mergedShortDesc;
    }

    const mergedBadge = mergeLocalized(product.badge, spanishContent.badge);
    if (JSON.stringify(mergedBadge) !== JSON.stringify(product.badge)) {
        patch.badge = mergedBadge;
    }

    const mergedFullDesc = mergeLocalized(product.fullDescription, spanishContent.fullDescription);
    if (JSON.stringify(mergedFullDesc) !== JSON.stringify(product.fullDescription)) {
        patch.fullDescription = mergedFullDesc;
    }

    if (product.orderBump && typeof product.orderBump === "object") {
        const ob = product.orderBump as Record<string, unknown>;
        const mergedOB: Record<string, unknown> = { ...ob };
        if (ob.name) {
            mergedOB.name = mergeLocalized(ob.name, spanishContent.orderBump.name);
        }
        if (ob.description) {
            mergedOB.description = mergeLocalized(ob.description, spanishContent.orderBump.description);
        }
        if (JSON.stringify(mergedOB) !== JSON.stringify(product.orderBump)) {
            patch.orderBump = mergedOB;
        }
    }

    if (Array.isArray(product.learningObjectives) && product.learningObjectives.length > 0) {
        const merged = mergeArrayLocalized(product.learningObjectives, spanishContent.learningObjectives);
        if (JSON.stringify(merged) !== JSON.stringify(product.learningObjectives)) {
            patch.learningObjectives = merged;
        }
    }

    if (Array.isArray(product.features) && product.features.length > 0) {
        const merged = mergeArrayLocalized(product.features, spanishContent.features);
        if (JSON.stringify(merged) !== JSON.stringify(product.features)) {
            patch.features = merged;
        }
    }

    const fieldsToPatch = Object.keys(patch);
    if (fieldsToPatch.length === 0) {
        console.log("All Spanish fields already populated. Nothing to do.");
        return;
    }

    console.log(`\nFields to patch: ${fieldsToPatch.join(", ")}`);
    for (const field of fieldsToPatch) {
        console.log(`\n--- ${field} ---`);
        const value = (patch[field] as Record<string, unknown>)[(product as Record<string, unknown>)[field] && typeof (product as Record<string, unknown>)[field] === "object" ? "" : "es"] ?? patch[field];
        console.log(JSON.stringify(value, null, 2).slice(0, 400));
    }

    if (isDryRun) {
        console.log("\n[DRY RUN] No changes written. Remove --dry-run to apply.");
        return;
    }

    const result = await client
        .patch(product._id)
        .set(patch)
        .commit();

    console.log(`\nPatched ${fieldsToPatch.length} field(s). _rev: ${result._rev}`);
}

main().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
