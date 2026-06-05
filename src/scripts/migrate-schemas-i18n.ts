/**
 * Sanity Field-Level i18n Database Migration Script.
 *
 * Converts plain string and array fields to localized { en: value } objects
 * across all affected document types, preserving any existing translations.
 *
 * Run with:
 *   npx tsx src/scripts/migrate-schemas-i18n.ts
 *   # or with --dry-run to preview changes:
 *   npx tsx src/scripts/migrate-schemas-i18n.ts --dry-run
 *
 * Requires `SANITY_AUTH_TOKEN` env var with write permission.
 */

import { createClient } from "@sanity/client";
import path from "node:path";
import fs from "node:fs";

// Custom dotenv loader to avoid external dependencies
function loadEnvFile(filePath: string) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const [key, ...valueParts] = trimmed.split("=");
            const value = valueParts.join("=").replace(/\s+#.*$/, "").replace(/^["']|["']$/g, "");
            process.env[key] = value;
        }
    }
}

// Load environment variables
const root = process.cwd();
loadEnvFile(path.join(root, ".env"));
loadEnvFile(path.join(root, ".env.local"));

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "p1x9y3wz";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09";
const AUTH_TOKEN = process.env.SANITY_AUTH_TOKEN;

const isDryRun = process.argv.includes("--dry-run");

// Helper translation wrappers
function toLocalized(val: any): any {
    if (typeof val === "string" && val.trim().length > 0) {
        return { en: val };
    }
    return val;
}

function toLocalizedArray(arr: any): any {
    if (Array.isArray(arr)) {
        return arr.map(item => {
            if (typeof item === "string") {
                return { en: item };
            }
            return item;
        });
    }
    return arr;
}

function toLocalizedObjectArray(arr: any, fields: string[]): any {
    if (Array.isArray(arr)) {
        return arr.map(item => {
            if (item && typeof item === "object" && !Array.isArray(item)) {
                const updated = { ...item };
                for (const field of fields) {
                    if (updated[field] !== undefined) {
                        updated[field] = toLocalized(updated[field]);
                    }
                }
                return updated;
            }
            return item;
        });
    }
    return arr;
}

function toLocalizedImageAlt(img: any): any {
    if (img && typeof img === "object") {
        if (img.alt !== undefined && typeof img.alt === "string") {
            return { ...img, alt: { en: img.alt } };
        }
    }
    return img;
}

function toLocalizedSEO(seo: any): any {
    if (seo && typeof seo === "object") {
        const updated = { ...seo };
        if (updated.metaTitle !== undefined) {
            updated.metaTitle = toLocalized(updated.metaTitle);
        }
        if (updated.metaDescription !== undefined) {
            updated.metaDescription = toLocalized(updated.metaDescription);
        }
        if (updated.keywords !== undefined) {
            updated.keywords = toLocalizedArray(updated.keywords);
        }
        return updated;
    }
    return seo;
}

async function main() {
    if (!AUTH_TOKEN && !isDryRun) {
        console.error("ERROR: SANITY_AUTH_TOKEN is required. Run with --dry-run or set the env variable.");
        process.exit(1);
    }

    console.log(`Initializing client for project: ${PROJECT_ID}, dataset: ${DATASET} (Dry run: ${isDryRun})`);

    const client = createClient({
        projectId: PROJECT_ID,
        dataset: DATASET,
        apiVersion: API_VERSION,
        useCdn: false,
        token: AUTH_TOKEN,
    });

    // Affected document types
    const documentTypes = [
        "siteSettings",
        "homePage",
        "service",
        "product",
        "teamMember",
        "contactSettings",
        "industryVertical",
        "playbookChapter",
        "comparisonTable",
        "blogPost",
        "caseStudy",
        "servicesPage",
        "shopSettings",
        "teamPage",
        "playbook",
        "legalPage"
    ];

    console.log(`Fetching documents for types: ${documentTypes.join(", ")}`);

    const query = `*[_type in $types && !(_id in path("drafts.**"))]`;
    const documents = await client.fetch<any[]>(query, { types: documentTypes });

    console.log(`Retrieved ${documents.length} document(s).`);

    let patchCount = 0;

    for (const doc of documents) {
        const patches: Record<string, any> = {};
        const type = doc._type;

        // Migrate SEO if present
        if (doc.seo !== undefined) {
            const migratedSEO = toLocalizedSEO(doc.seo);
            if (JSON.stringify(migratedSEO) !== JSON.stringify(doc.seo)) {
                patches.seo = migratedSEO;
            }
        }

        // Migrate specific document type fields
        switch (type) {
            case "siteSettings":
                if (doc.tagline !== undefined) patches.tagline = toLocalized(doc.tagline);
                if (doc.ctaButtonText !== undefined) patches.ctaButtonText = toLocalized(doc.ctaButtonText);
                if (doc.copyrightText !== undefined) patches.copyrightText = toLocalized(doc.copyrightText);
                if (doc.logo !== undefined) patches.logo = toLocalizedImageAlt(doc.logo);
                if (doc.logoAlt !== undefined) patches.logoAlt = toLocalizedImageAlt(doc.logoAlt);
                if (doc.businessHours !== undefined) patches.businessHours = toLocalizedObjectArray(doc.businessHours, ["day", "hours"]);
                if (doc.areaServed !== undefined) patches.areaServed = toLocalizedArray(doc.areaServed);
                break;

            case "homePage":
                if (doc.heroTitle !== undefined) patches.heroTitle = toLocalized(doc.heroTitle);
                if (doc.heroSubtitle !== undefined) patches.heroSubtitle = toLocalized(doc.heroSubtitle);
                if (doc.heroCtaText !== undefined) patches.heroCtaText = toLocalized(doc.heroCtaText);
                if (doc.heroSecondaryCtaText !== undefined) patches.heroSecondaryCtaText = toLocalized(doc.heroSecondaryCtaText);
                if (doc.stats !== undefined) patches.stats = toLocalizedObjectArray(doc.stats, ["label"]);
                if (doc.bentoGridBackgroundImage !== undefined) patches.bentoGridBackgroundImage = toLocalizedImageAlt(doc.bentoGridBackgroundImage);
                if (doc.ctaBackgroundImage !== undefined) patches.ctaBackgroundImage = toLocalizedImageAlt(doc.ctaBackgroundImage);
                if (doc.differentiationEyebrow !== undefined) patches.differentiationEyebrow = toLocalized(doc.differentiationEyebrow);
                if (doc.differentiationTitle !== undefined) patches.differentiationTitle = toLocalized(doc.differentiationTitle);
                if (doc.differentiationSubtitle !== undefined) patches.differentiationSubtitle = toLocalized(doc.differentiationSubtitle);
                if (doc.competitorFeatures !== undefined) patches.competitorFeatures = toLocalizedArray(doc.competitorFeatures);
                if (doc.unionFeatures !== undefined) patches.unionFeatures = toLocalizedArray(doc.unionFeatures);
                if (doc.differentiationCtaText !== undefined) patches.differentiationCtaText = toLocalized(doc.differentiationCtaText);
                if (doc.nationwideBadge !== undefined) patches.nationwideBadge = toLocalized(doc.nationwideBadge);
                if (doc.nationwideTitle !== undefined) patches.nationwideTitle = toLocalized(doc.nationwideTitle);
                if (doc.nationwideSubtitle !== undefined) patches.nationwideSubtitle = toLocalized(doc.nationwideSubtitle);
                if (doc.nationwideFeatures !== undefined) patches.nationwideFeatures = toLocalizedObjectArray(doc.nationwideFeatures, ["title", "description"]);
                if (doc.servicesEyebrow !== undefined) patches.servicesEyebrow = toLocalized(doc.servicesEyebrow);
                if (doc.servicesTitle !== undefined) patches.servicesTitle = toLocalized(doc.servicesTitle);
                if (doc.servicesSubtitle !== undefined) patches.servicesSubtitle = toLocalized(doc.servicesSubtitle);
                if (doc.servicesButtonText !== undefined) patches.servicesButtonText = toLocalized(doc.servicesButtonText);
                if (doc.ctaTitle !== undefined) patches.ctaTitle = toLocalized(doc.ctaTitle);
                if (doc.ctaSubtitle !== undefined) patches.ctaSubtitle = toLocalized(doc.ctaSubtitle);
                if (doc.ctaButtonText !== undefined) patches.ctaButtonText = toLocalized(doc.ctaButtonText);
                break;

            case "service":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.shortDescription !== undefined) patches.shortDescription = toLocalized(doc.shortDescription);
                if (doc.fullDescription !== undefined) patches.fullDescription = toLocalized(doc.fullDescription);
                if (doc.features !== undefined) patches.features = toLocalizedArray(doc.features);
                if (doc.impactGoal !== undefined) patches.impactGoal = toLocalized(doc.impactGoal);
                if (doc.badge !== undefined) patches.badge = toLocalized(doc.badge);
                if (doc.startingPrice !== undefined) patches.startingPrice = toLocalized(doc.startingPrice);
                if (doc.faq !== undefined) patches.faq = toLocalizedObjectArray(doc.faq, ["question", "answer"]);
                if (doc.whyChooseUsTitle !== undefined) patches.whyChooseUsTitle = toLocalized(doc.whyChooseUsTitle);
                if (doc.whyChooseUsDescription !== undefined) patches.whyChooseUsDescription = toLocalized(doc.whyChooseUsDescription);
                if (doc.comparisonPoints !== undefined) patches.comparisonPoints = toLocalizedObjectArray(doc.comparisonPoints, ["feature"]);
                if (doc.roadmap !== undefined) patches.roadmap = toLocalizedObjectArray(doc.roadmap, ["title", "description"]);
                if (doc.eligibilityPros !== undefined) patches.eligibilityPros = toLocalizedArray(doc.eligibilityPros);
                if (doc.eligibilityCons !== undefined) patches.eligibilityCons = toLocalizedArray(doc.eligibilityCons);
                if (doc.trustSignals !== undefined) patches.trustSignals = toLocalizedArray(doc.trustSignals);
                if (doc.videoThumbnail !== undefined) patches.videoThumbnail = toLocalizedImageAlt(doc.videoThumbnail);
                if (doc.targetAudience !== undefined) patches.targetAudience = toLocalized(doc.targetAudience);
                if (doc.keyBenefit !== undefined) patches.keyBenefit = toLocalized(doc.keyBenefit);
                if (doc.eligibility !== undefined) patches.eligibility = toLocalized(doc.eligibility);
                if (doc.schema_faq !== undefined) patches.schema_faq = toLocalizedObjectArray(doc.schema_faq, ["question", "answer"]);
                if (doc.problemAgitation !== undefined && doc.problemAgitation && typeof doc.problemAgitation === "object") {
                    const pa = { ...doc.problemAgitation };
                    if (pa.title !== undefined) pa.title = toLocalized(pa.title);
                    if (pa.description !== undefined) pa.description = toLocalized(pa.description);
                    if (JSON.stringify(pa) !== JSON.stringify(doc.problemAgitation)) {
                        patches.problemAgitation = pa;
                    }
                }
                break;

            case "product":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.shortDescription !== undefined) patches.shortDescription = toLocalized(doc.shortDescription);
                if (doc.fullDescription !== undefined) patches.fullDescription = toLocalized(doc.fullDescription);
                if (doc.testimonialBackgroundImage !== undefined) patches.testimonialBackgroundImage = toLocalizedImageAlt(doc.testimonialBackgroundImage);
                if (doc.videoThumbnail !== undefined) patches.videoThumbnail = toLocalizedImageAlt(doc.videoThumbnail);
                if (doc.features !== undefined) patches.features = toLocalizedArray(doc.features);
                if (doc.badge !== undefined) patches.badge = toLocalized(doc.badge);
                if (doc.learningObjectives !== undefined) patches.learningObjectives = toLocalizedObjectArray(doc.learningObjectives, ["title", "description"]);
                break;

            case "teamMember":
                if (doc.image !== undefined) patches.image = toLocalizedImageAlt(doc.image);
                if (doc.tags !== undefined) patches.tags = toLocalizedArray(doc.tags);
                if (doc.bioShort !== undefined) patches.bioShort = toLocalized(doc.bioShort);
                if (doc.certifications !== undefined) patches.certifications = toLocalizedArray(doc.certifications);
                break;

            case "contactSettings":
                if (doc.heroTitle !== undefined) patches.heroTitle = toLocalized(doc.heroTitle);
                if (doc.heroSubtitle !== undefined) patches.heroSubtitle = toLocalized(doc.heroSubtitle);
                if (doc.heroStats !== undefined && doc.heroStats && typeof doc.heroStats === "object") {
                    const hs = { ...doc.heroStats };
                    if (hs.responseTime !== undefined) hs.responseTime = toLocalized(hs.responseTime);
                    if (JSON.stringify(hs) !== JSON.stringify(doc.heroStats)) {
                        patches.heroStats = hs;
                    }
                }
                if (doc.founder !== undefined && doc.founder && typeof doc.founder === "object") {
                    const f = { ...doc.founder };
                    if (f.title !== undefined) f.title = toLocalized(f.title);
                    if (f.quote !== undefined) f.quote = toLocalized(f.quote);
                    if (f.credentials !== undefined) f.credentials = toLocalizedArray(f.credentials);
                    if (JSON.stringify(f) !== JSON.stringify(doc.founder)) {
                        patches.founder = f;
                    }
                }
                if (doc.officeHours !== undefined) patches.officeHours = toLocalizedObjectArray(doc.officeHours, ["day", "hours"]);
                if (doc.alternativeCTA !== undefined && doc.alternativeCTA && typeof doc.alternativeCTA === "object") {
                    const cta = { ...doc.alternativeCTA };
                    if (cta.title !== undefined) cta.title = toLocalized(cta.title);
                    if (cta.subtitle !== undefined) cta.subtitle = toLocalized(cta.subtitle);
                    if (JSON.stringify(cta) !== JSON.stringify(doc.alternativeCTA)) {
                        patches.alternativeCTA = cta;
                    }
                }
                if (doc.formTitle !== undefined) patches.formTitle = toLocalized(doc.formTitle);
                if (doc.formSubtitle !== undefined) patches.formSubtitle = toLocalized(doc.formSubtitle);
                break;

            case "industryVertical":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.description !== undefined) patches.description = toLocalized(doc.description);
                if (doc.heroImage !== undefined) patches.heroImage = toLocalizedImageAlt(doc.heroImage);
                if (doc.primaryKeyword !== undefined) patches.primaryKeyword = toLocalized(doc.primaryKeyword);
                if (doc.keywordCluster !== undefined) patches.keywordCluster = toLocalizedArray(doc.keywordCluster);
                if (doc.painPoints !== undefined) patches.painPoints = toLocalizedArray(doc.painPoints);
                if (doc.stats !== undefined) patches.stats = toLocalizedObjectArray(doc.stats, ["label"]);
                break;

            case "playbookChapter":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.content !== undefined) patches.content = toLocalized(doc.content);
                if (doc.gatedContent !== undefined) patches.gatedContent = toLocalized(doc.gatedContent);
                if (doc.keyTakeaways !== undefined) patches.keyTakeaways = toLocalizedArray(doc.keyTakeaways);
                if (doc.tools !== undefined) patches.tools = toLocalizedArray(doc.tools);
                if (doc.videoThumbnail !== undefined) patches.videoThumbnail = toLocalizedImageAlt(doc.videoThumbnail);
                break;

            case "comparisonTable":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.subtitle !== undefined) patches.subtitle = toLocalized(doc.subtitle);
                if (doc.unionNationalLabel !== undefined) patches.unionNationalLabel = toLocalized(doc.unionNationalLabel);
                if (doc.badge !== undefined) patches.badge = toLocalized(doc.badge);
                if (doc.features !== undefined && Array.isArray(doc.features)) {
                    const features = doc.features.map((feat: any) => {
                        if (feat && typeof feat === "object") {
                            const updated = { ...feat };
                            if (updated.featureName !== undefined) updated.featureName = toLocalized(updated.featureName);
                            if (updated.unionValue !== undefined) updated.unionValue = toLocalized(updated.unionValue);
                            if (updated.competitorValues !== undefined) updated.competitorValues = toLocalizedArray(updated.competitorValues);
                            return updated;
                        }
                        return feat;
                    });
                    if (JSON.stringify(features) !== JSON.stringify(doc.features)) {
                        patches.features = features;
                    }
                }
                break;

            case "blogPost":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.excerpt !== undefined) patches.excerpt = toLocalized(doc.excerpt);
                if (doc.body !== undefined) patches.body = toLocalized(doc.body);
                if (doc.featuredImage !== undefined) patches.featuredImage = toLocalizedImageAlt(doc.featuredImage);
                if (doc.coverImage !== undefined) patches.coverImage = toLocalizedImageAlt(doc.coverImage);
                if (doc.targetKeyword !== undefined) patches.targetKeyword = toLocalized(doc.targetKeyword);
                if (doc.faqItems !== undefined) patches.faqItems = toLocalizedObjectArray(doc.faqItems, ["question", "answer"]);
                break;

            case "caseStudy":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.clientIndustry !== undefined) patches.clientIndustry = toLocalized(doc.clientIndustry);
                if (doc.challenge !== undefined) patches.challenge = toLocalized(doc.challenge);
                if (doc.solution !== undefined) patches.solution = toLocalized(doc.solution);
                if (doc.results !== undefined) patches.results = toLocalized(doc.results);
                if (doc.clientQuote !== undefined) patches.clientQuote = toLocalized(doc.clientQuote);
                if (doc.timeframe !== undefined) patches.timeframe = toLocalized(doc.timeframe);
                if (doc.legalDisclaimer !== undefined) patches.legalDisclaimer = toLocalized(doc.legalDisclaimer);
                if (doc.metrics !== undefined) patches.metrics = toLocalizedObjectArray(doc.metrics, ["label", "before", "after"]);
                break;

            case "servicesPage":
                if (doc.heroTitle !== undefined) patches.heroTitle = toLocalized(doc.heroTitle);
                if (doc.heroSubtitle !== undefined) patches.heroSubtitle = toLocalized(doc.heroSubtitle);
                if (doc.heroBadge !== undefined) patches.heroBadge = toLocalized(doc.heroBadge);
                if (doc.ctaTitle !== undefined) patches.ctaTitle = toLocalized(doc.ctaTitle);
                if (doc.ctaSubtitle !== undefined) patches.ctaSubtitle = toLocalized(doc.ctaSubtitle);
                if (doc.ctaButtonText !== undefined) patches.ctaButtonText = toLocalized(doc.ctaButtonText);
                if (doc.ctaBackgroundImage !== undefined) patches.ctaBackgroundImage = toLocalizedImageAlt(doc.ctaBackgroundImage);
                break;

            case "shopSettings":
                if (doc.heroTitle !== undefined) patches.heroTitle = toLocalized(doc.heroTitle);
                if (doc.heroSubtitle !== undefined) patches.heroSubtitle = toLocalized(doc.heroSubtitle);
                if (doc.faq !== undefined) patches.faq = toLocalizedObjectArray(doc.faq, ["question", "answer"]);
                if (doc.recoveryCTA !== undefined && doc.recoveryCTA && typeof doc.recoveryCTA === "object") {
                    const rCta = { ...doc.recoveryCTA };
                    if (rCta.title !== undefined) rCta.title = toLocalized(rCta.title);
                    if (rCta.subtitle !== undefined) rCta.subtitle = toLocalized(rCta.subtitle);
                    if (rCta.buttonText !== undefined) rCta.buttonText = toLocalized(rCta.buttonText);
                    if (JSON.stringify(rCta) !== JSON.stringify(doc.recoveryCTA)) {
                        patches.recoveryCTA = rCta;
                    }
                }
                if (doc.heroSlides !== undefined) patches.heroSlides = toLocalizedObjectArray(doc.heroSlides, ["alt"]);
                break;

            case "teamPage":
                if (doc.heroBadge !== undefined) patches.heroBadge = toLocalized(doc.heroBadge);
                if (doc.heroTitle !== undefined) patches.heroTitle = toLocalized(doc.heroTitle);
                if (doc.heroSubtitle !== undefined) patches.heroSubtitle = toLocalized(doc.heroSubtitle);
                if (doc.founderSectionTitle !== undefined) patches.founderSectionTitle = toLocalized(doc.founderSectionTitle);
                if (doc.teamSectionTitle !== undefined) patches.teamSectionTitle = toLocalized(doc.teamSectionTitle);
                if (doc.teamSectionSubtitle !== undefined) patches.teamSectionSubtitle = toLocalized(doc.teamSectionSubtitle);
                if (doc.values !== undefined) patches.values = toLocalizedObjectArray(doc.values, ["title", "description"]);
                if (doc.hiringBadge !== undefined) patches.hiringBadge = toLocalized(doc.hiringBadge);
                if (doc.hiringTitle !== undefined) patches.hiringTitle = toLocalized(doc.hiringTitle);
                if (doc.hiringDescription !== undefined) patches.hiringDescription = toLocalized(doc.hiringDescription);
                if (doc.hiringBenefits !== undefined) patches.hiringBenefits = toLocalizedArray(doc.hiringBenefits);
                if (doc.hiringCtaText !== undefined) patches.hiringCtaText = toLocalized(doc.hiringCtaText);
                if (doc.ctaTitle !== undefined) patches.ctaTitle = toLocalized(doc.ctaTitle);
                if (doc.ctaSubtitle !== undefined) patches.ctaSubtitle = toLocalized(doc.ctaSubtitle);
                if (doc.ctaButtonText !== undefined) patches.ctaButtonText = toLocalized(doc.ctaButtonText);
                if (doc.ctaBackgroundImage !== undefined) patches.ctaBackgroundImage = toLocalizedImageAlt(doc.ctaBackgroundImage);
                break;

            case "playbook":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.description !== undefined) patches.description = toLocalized(doc.description);
                if (doc.coverImage !== undefined) patches.coverImage = toLocalizedImageAlt(doc.coverImage);
                break;

            case "legalPage":
                if (doc.title !== undefined) patches.title = toLocalized(doc.title);
                if (doc.body !== undefined) patches.body = toLocalized(doc.body);
                if (doc.intro !== undefined) patches.intro = toLocalized(doc.intro);
                break;
        }

        // Clean up undefined fields so we don't send them in the patch
        const cleanedPatches: Record<string, any> = {};
        for (const [key, val] of Object.entries(patches)) {
            // Only include in patches if the value actually changed
            if (JSON.stringify(val) !== JSON.stringify(doc[key])) {
                cleanedPatches[key] = val;
            }
        }

        const keysToPatch = Object.keys(cleanedPatches);
        if (keysToPatch.length > 0) {
            patchCount++;
            console.log(`[${type}] Patching doc: ${doc._id} (${doc.title?.en || doc.name || doc._id})`);
            console.log(`  Fields: ${keysToPatch.join(", ")}`);
            for (const key of keysToPatch) {
                console.log(`    - ${key}:`, JSON.stringify(cleanedPatches[key]).slice(0, 100));
            }

            if (!isDryRun) {
                await client
                    .patch(doc._id)
                    .set(cleanedPatches)
                    .commit();
            }
        }
    }

    console.log(`\nMigration completed. ${patchCount} document(s) patched.`);
    if (isDryRun) {
        console.log("[DRY RUN] No actual database writes were executed.");
    }
}

main().catch(err => {
    console.error("Migration script failed:", err);
    process.exit(1);
});
