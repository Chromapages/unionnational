import nextEnv from "@next/env";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const apply = process.argv.includes("--apply");
const token = process.env.SANITY_AUTH_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09";
const client = token
    ? createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion, useCdn: false, token })
    : getCliClient({ apiVersion }).withConfig({ useCdn: false });
if (apply && !client.config().token) throw new Error("A Sanity write token is required when using --apply.");

const loc = (value, type = "localizedString") => {
    if (!value) return undefined;
    if (typeof value === "string") return { _type: type, en: value };
    return value._type ? value : { _type: type, ...value };
};

const defaultVideoDescription = "Watch a concise overview of what is included, how the process works, and what to expect when you work with us.";

const publicRoutes = {
    "tax-planning-consulting": { slug: "tax-planning", path: "/tax-planning" },
    "tax-preparation-filing": { slug: "tax-preparation-and-filing", path: "/tax-preparation-and-filing" },
};

const documents = await client.fetch(`*[_type == "service"]{
  _id, title, slug, category, targetAudience, accentColor, shortDescription, keyBenefit,
  heroHeadline, heroHighlight, heroCta, heroSecondaryCta, heroTrustStats, heroMicrocopy, heroVisual,
  eligibilityPros, roadmap, features, startingPrice, strategyVideoUrl, videoThumbnail,
  faq, pageSections, seo
}`);

const pages = documents.map((service) => {
    const sourceSlug = service.slug.current;
    const route = publicRoutes[sourceSlug] || { slug: sourceSlug, path: `/${sourceSlug}` };
    const sections = service.pageSections || {};
    const title = loc(service.title);
    const titleText = typeof service.title === "string" ? service.title : service.title?.en || "this service";

    return {
        _id: `servicePage-${route.slug}`,
        _type: "servicePage",
        service: { _type: "reference", _ref: service._id },
        title,
        slug: { _type: "slug", current: route.slug },
        canonicalPath: route.path,
        accentColor: service.accentColor || "#D4AF37",
        hero: {
            _type: "object",
            eyebrow: loc(service.targetAudience || service.category),
            headline: loc(service.heroHeadline || service.title),
            highlight: loc(service.heroHighlight),
            subheadline: loc(service.keyBenefit || service.shortDescription, "localizedText"),
            primaryCta: service.heroCta ? { _type: "object", label: loc(service.heroCta.label), href: service.heroCta.href } : undefined,
            secondaryCta: service.heroSecondaryCta ? { _type: "object", label: loc(service.heroSecondaryCta.label), href: service.heroSecondaryCta.anchorTarget } : undefined,
            trustItems: service.heroTrustStats,
            microcopy: loc(service.heroMicrocopy),
            visual: service.heroVisual ? { ...service.heroVisual, _type: "object" } : { _type: "object", type: "none" },
        },
        eligibility: sections.eligibility ? { ...sections.eligibility, _type: "object", items: service.eligibilityPros } : undefined,
        comparison: sections.comparison ? { ...sections.comparison, _type: "object" } : undefined,
        process: sections.process ? { ...sections.process, _type: "object", steps: service.roadmap } : undefined,
        included: sections.included ? { ...sections.included, _type: "object", items: service.features, pricing: sections.pricing ? { ...sections.pricing, _type: "object" } : undefined } : undefined,
        video: {
            ...sections.video,
            _type: "object",
            eyebrow: sections.video?.eyebrow || loc("Service overview"),
            heading: sections.video?.heading || loc(`See how ${titleText} works`),
            description: sections.video?.description || loc(defaultVideoDescription, "localizedText"),
            url: service.strategyVideoUrl,
            poster: service.videoThumbnail,
        },
        proof: sections.proof ? { ...sections.proof, _type: "object" } : undefined,
        faqSection: { ...sections.faq, _type: "object", items: service.faq },
        closing: sections.closing ? { ...sections.closing, _type: "object" } : undefined,
        seo: service.seo,
    };
});

const report = pages.map((page) => ({ id: page._id, slug: page.slug.current, canonicalPath: page.canonicalPath }));

if (apply) {
    const existingVideoDescriptions = new Map(await client.fetch(`*[_type == "servicePage"]{_id, "description": video.description.en}`)
        .then((items) => items.map((item) => [item._id, item.description])));
    let transaction = client.transaction();
    for (const page of pages) {
        const { _id, _type: _type, ...content } = page;
        const pageTitle = page.title?.en || "this service";
        const previousGeneratedDescription = `Learn how our ${pageTitle.toLowerCase()} service supports your business and what to expect when you work with us.`;
        transaction = transaction
            .createIfNotExists(page)
            .patch(_id, (patch) => {
                const initialized = patch.setIfMissing(content);
                return existingVideoDescriptions.get(_id) === previousGeneratedDescription
                    ? initialized.set({ "video.description": loc(defaultVideoDescription, "localizedText") })
                    : initialized;
            });
    }
    await transaction.commit();
}

console.log(JSON.stringify({ mode: apply ? "applied" : "dry-run", pages: report }, null, 2));
