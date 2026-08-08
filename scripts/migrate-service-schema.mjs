import nextEnv from "@next/env";
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const apply = process.argv.includes("--apply");
const token = process.env.SANITY_AUTH_TOKEN;

if (apply && !token) {
  throw new Error("SANITY_AUTH_TOKEN is required to apply this migration. Run without --apply to inspect the changes.");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: false,
  token,
});

const localized = (value, type) => {
  if (typeof value === "string") return { _type: type, en: value.trim() };
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  return value._type ? value : { _type: type, ...value };
};

const localizedArray = (items, type) => {
  if (!Array.isArray(items)) return items;
  return items.map((item) => ({
    _key: typeof item === "object" && item?._key ? item._key : randomUUID(),
    ...localized(item, type),
  }));
};

const text = (value) => {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object") return value.en?.trim() || value.es?.trim() || "";
  return "";
};

const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const numberedPrefix = /^\s*(?:step\s*)?\d{1,2}[.)\-:]*\s*/i;

const normalizeRoadmap = (roadmap) => {
  if (!Array.isArray(roadmap)) return roadmap;
  return roadmap.map(({ stepNumber: _stepNumber, title, description, ...item }) => ({
    ...item,
    title: Object.fromEntries(
      Object.entries(localized(title, "localizedString") || {}).map(([locale, value]) => [
        locale,
        typeof value === "string" ? value.replace(numberedPrefix, "") : value,
      ]),
    ),
    description: localized(description, "localizedText"),
  }));
};

const normalizeFaq = (items, malformedFirstQuestion) => {
  if (!Array.isArray(items)) return items;
  return items.map((item, index) => ({
    ...item,
    question: localized(index === 0 && malformedFirstQuestion ? malformedFirstQuestion : item.question, "localizedString"),
    answer: localized(item.answer, "localizedText"),
  }));
};

const firstKeyword = (keywords) => Array.isArray(keywords) ? text(keywords[0]) : "";
const likelyAudience = (keyword, audience) => keyword && audience && keyword.toLowerCase() === audience.toLowerCase();

const bookkeepingHero = {
  heroHeadline: localized("Know your numbers every month — not once a year.", "localizedString"),
  heroHighlight: localized("not once a year.", "localizedString"),
  heroCta: {
    label: localized("Book a Strategy Call", "localizedString"),
    href: "/contact",
  },
  heroSecondaryCta: {
    label: localized("See what's included", "localizedString"),
    anchorTarget: "#included",
  },
  heroTrustStats: [
    { _key: "bookkeeping-monthly", _type: "object", value: localized("Monthly", "localizedString"), label: localized("reconciliation", "localizedString") },
    { _key: "bookkeeping-irs-ready", _type: "object", value: localized("IRS-ready", "localizedString"), label: localized("docs", "localizedString") },
    { _key: "bookkeeping-served", _type: "object", value: localized("200+", "localizedString"), label: localized("served", "localizedString") },
  ],
  heroMicrocopy: localized("No commitment — 20-minute call, free.", "localizedString"),
  heroVisual: {
    type: "dashboard-mockup",
    dashboardEyebrow: localized("Monthly P&L Snapshot", "localizedString"),
    dashboardTitle: localized("April 2026", "localizedString"),
    dashboardStatus: localized("Reconciled ✓", "localizedString"),
    dashboardMetrics: [
      { _key: "bookkeeping-revenue", _type: "object", label: localized("Revenue", "localizedString"), value: localized("$184,200", "localizedString"), emphasized: false },
      { _key: "bookkeeping-expenses", _type: "object", label: localized("Operating expenses", "localizedString"), value: localized("$121,640", "localizedString"), emphasized: false },
      { _key: "bookkeeping-income", _type: "object", label: localized("Net operating income", "localizedString"), value: localized("$62,560", "localizedString"), emphasized: true },
    ],
  },
};

const documents = await client.fetch(`*[_type == "service"] {
  _id, _rev, slug, title, shortDescription, features, impactGoal, badge, startingPrice,
  targetKeyword, targetAudience, keyBenefit, eligibility, faq, comparisonPoints, roadmap,
  eligibilityPros, eligibilityCons, trustSignals, schema_faq, seo, badge, whyChooseUsTitle, whyChooseUsDescription, problemAgitation,
  heroHeadline, heroHighlight, heroCta, heroSecondaryCta, heroTrustStats, heroMicrocopy, heroVisual
}`);

const report = {
  scanned: documents.length,
  changed: 0,
  targetKeywordValuesCorrected: 0,
  legacyEligibilityRemoved: 0,
  malformedFeaturedFaqsFixed: 0,
  deprecatedFieldsRemoved: 0,
  bookkeepingHeroPopulated: 0,
  documents: [],
};

let transaction = client.transaction();

for (const document of documents) {
  const slug = document.slug?.current || document._id;
  const patch = {};
  const unset = [];
  const expectedLocalizedStrings = [
    ["title", "localizedString"],
    ["shortDescription", "localizedText"],
    ["impactGoal", "localizedString"],
    ["startingPrice", "localizedString"],
    ["targetAudience", "localizedString"],
    ["keyBenefit", "localizedString"],
  ];

  for (const [field, type] of expectedLocalizedStrings) {
    const next = localized(document[field], type);
    if (!same(document[field], next)) patch[field] = next;
  }

  const normalizedSeo = document.seo && {
    ...document.seo,
    metaTitle: localized(document.seo.metaTitle, "localizedString"),
    metaDescription: localized(document.seo.metaDescription, "localizedText"),
    keywords: localizedArray(document.seo.keywords, "localizedString"),
  };
  if (normalizedSeo && !same(document.seo, normalizedSeo)) patch.seo = normalizedSeo;

  const currentKeyword = text(document.targetKeyword);
  const audience = text(document.targetAudience);
  const needsKeywordCorrection = !currentKeyword || likelyAudience(currentKeyword, audience);
  const keyword = needsKeywordCorrection
    ? firstKeyword(document.seo?.keywords)
    : currentKeyword;
  const normalizedKeyword = localized(keyword, "localizedString");
  if (keyword && !same(document.targetKeyword, normalizedKeyword)) {
    patch.targetKeyword = normalizedKeyword;
    if (needsKeywordCorrection) report.targetKeywordValuesCorrected += 1;
  }

  const normalizedFeatures = localizedArray(document.features, "localizedString")?.slice(0, 5);
  if (!same(document.features, normalizedFeatures)) patch.features = normalizedFeatures;

  for (const field of ["eligibilityPros", "trustSignals"]) {
    const next = localizedArray(document[field], "localizedString");
    if (!same(document[field], next)) patch[field] = next;
  }

  const normalizedRoadmap = normalizeRoadmap(document.roadmap);
  if (!same(document.roadmap, normalizedRoadmap)) patch.roadmap = normalizedRoadmap;

  const malformedBookkeepingQuestion = slug === "strategic-bookkeeping"
    ? "Who needs strategic bookkeeping services?"
    : undefined;
  const normalizedSchemaFaq = normalizeFaq(document.schema_faq, malformedBookkeepingQuestion);
  if (!same(document.schema_faq, normalizedSchemaFaq)) {
    patch.schema_faq = normalizedSchemaFaq;
    if (malformedBookkeepingQuestion) report.malformedFeaturedFaqsFixed += 1;
  }

  const normalizedFaq = normalizeFaq(document.faq);
  if (!same(document.faq, normalizedFaq)) patch.faq = normalizedFaq;

  if (slug === "strategic-bookkeeping") {
    for (const [field, value] of Object.entries(bookkeepingHero)) {
      if (!same(document[field], value)) patch[field] = value;
    }
    if (Object.keys(bookkeepingHero).some((field) => field in patch)) report.bookkeepingHeroPopulated += 1;
  }

  if (document.eligibility !== undefined) {
    unset.push("eligibility");
    report.legacyEligibilityRemoved += 1;
  }

  for (const field of ["badge", "comparisonPoints", "whyChooseUsTitle", "whyChooseUsDescription", "eligibilityCons", "problemAgitation"]) {
    if (document[field] !== undefined) {
      unset.push(field);
      report.deprecatedFieldsRemoved += 1;
    }
  }

  if (Object.keys(patch).length > 0 || unset.length > 0) {
    report.changed += 1;
    report.documents.push({ slug, fields: [...Object.keys(patch), ...unset.map((field) => `unset:${field}`)] });
    if (apply) {
      let mutation = transaction.patch(document._id).set(patch);
      if (unset.length > 0) mutation = mutation.unset(unset);
      transaction = mutation;
    }
  }
}

if (apply && report.changed > 0) await transaction.commit();

console.log(JSON.stringify({ mode: apply ? "applied" : "dry-run", ...report }, null, 2));
