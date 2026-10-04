import { resourceHref } from "./resourceHref";

export type Resource = {
  _id: string;
  _type: "blogPost" | "playbook";
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: number;
  chapterCount?: number;
  isFeatured?: boolean;
  categories?: ({ title: string; slug: string } | null)[];
  coverImage?: { asset?: { url?: string }; alt?: string };
  featuredImage?: { asset?: { url?: string }; alt?: string };
};
export type TopicKey = "all" | "tax" | "scorp" | "industries" | "finance" | "irs" | "operations";
export type SortKey = "featured" | "newest" | "az";
export type ResourceIntent = "structure" | "tax" | "irs" | "numbers" | "growth" | "industries";
export const resourceIntentTopics: Record<ResourceIntent, TopicKey> = { structure: "scorp", tax: "tax", irs: "irs", numbers: "finance", growth: "finance", industries: "industries" };
export const resourceTopics: TopicKey[] = ["all", "tax", "scorp", "industries", "finance", "irs", "operations"];
const topicCategories: Record<Exclude<TopicKey, "all">, readonly string[]> = {
  tax: ["tax-strategy"], scorp: ["s-corp-guide"], industries: ["industry-specific"],
  finance: ["cash-flow-and-cfo", "fractional-cfo-services"], irs: ["irs-compliance"], operations: ["business-operations"],
};
const starterSlugs = ["llc-vs-s-corp-vs-c-corp-real-tax-impact-2026", "how-to-handle-an-irs-notice-before-you-panic-2026", "small-business-tax-planning-strategies-to-save-money-in-2026"];
const gridPriority = ["myth-vs-reality-7-common-tax-deductions-trigger-audits", "cash-flow-management-consultants-sustainable-growth", "tax-deadlines-2026-important-dates-every-small-business-owner-must-know", "construction-tax-strategy-general-contractors-2026", "solo-401k-building-wealth-reducing-tax-bill", "the-2026-restaurant-survival-guide-how-to-protect-your-margins-when-everything-costs-more"];

export function getCatalogResources(blogPosts: readonly Resource[], playbooks: readonly Resource[]) {
  const seen = new Set<string>();
  return [...blogPosts, ...playbooks].filter(item => {
    if (typeof item.title !== "string" || !item.title.trim() || typeof item.slug !== "string" || !item.slug.trim()) return false;
    const href = resourceHref(item._type, item.slug);
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });
}

function overlapGroup(resource: Resource) {
  if (/hvac/i.test(resource.slug)) return "hvac";
  if (/restaurant|qsr|fica|tips-rule/i.test(resource.slug)) return "restaurants";
  if (/s-corp.*llc|llc.*s-corp/i.test(resource.slug)) return "entity-comparison";
  return undefined;
}

// ponytail: O(n²) spacing for this small catalog; move curation to CMS if it grows materially.
function spaceRelatedPosts(resources: readonly Resource[]) {
  const remaining = [...resources];
  const ordered: Resource[] = [];
  while (remaining.length) {
    const recent = ordered.slice(-2).map(overlapGroup).filter(Boolean);
    const next = remaining.findIndex(item => !overlapGroup(item) || !recent.includes(overlapGroup(item)));
    ordered.push(remaining.splice(next < 0 ? 0 : next, 1)[0]);
  }
  return ordered;
}

export function selectFeaturedResources(resources: readonly Resource[]) {
  const starters = starterSlugs.flatMap(slug => resources.find(item => item.slug === slug) || []);
  return [...starters, ...spaceRelatedPosts(resources.filter(item => !starters.includes(item)))].slice(0, 3);
}

export function getIntentRecommendations(resources: readonly Resource[], intent: ResourceIntent) {
  const priorities: Record<ResourceIntent, readonly string[]> = {
    structure: [...starterSlugs, "s-corp-reasonable-compensation-audit-trap-2026"],
    tax: [starterSlugs[2], gridPriority[0], gridPriority[4], gridPriority[2]],
    irs: [starterSlugs[1], gridPriority[0], "s-corp-reasonable-compensation-audit-trap-2026", gridPriority[2]],
    numbers: [gridPriority[1], "what-does-fractional-cfo-do-small-business", "cfo-tool-stack-growing-business-2026", "why-your-bookkeeper-might-be-costing-you-more-2026"],
    growth: ["financial-blueprint-high-income-freelancers-6-figures-7-figures", "what-does-fractional-cfo-do-small-business", gridPriority[1], "cfo-tool-stack-growing-business-2026"],
    industries: [gridPriority[3], "tax-deductions-for-hvac-contractors-a-year-round-guide", gridPriority[5], "restaurant-tax-secrets-how-qsr-owners-can-protect-the-fica-tip-credit"],
  };
  const chosen = priorities[intent].flatMap(slug => resources.find(item => item.slug === slug) || []);
  const related = getResourceResults(resources, [], resourceIntentTopics[intent], "", "featured", "en").grid;
  return spaceRelatedPosts([...new Set([...chosen, ...related, ...selectFeaturedResources(resources), ...resources])]).slice(0, 4);
}

export function getResourceResults(resources: readonly Resource[], featured: readonly Resource[], topic: TopicKey, search: string, sort: SortKey, locale: string) {
  const query = search.trim().toLocaleLowerCase(locale);
  const allowedCategories = topic === "all" ? undefined : topicCategories[topic];
  const matched = resources.filter(item => {
    const topicMatch = !allowedCategories || item.categories?.some(category => category && allowedCategories.includes(category.slug));
    const text = [item.title, item.excerpt, item.description, ...(item.categories || []).map(category => category?.title)].join(" ").toLocaleLowerCase(locale);
    return topicMatch && (!query || text.includes(query));
  });
  const featuredHrefs = new Set(featured.map(item => resourceHref(item._type, item.slug)));
  const relatedGroups = featured.map(overlapGroup).filter(Boolean);
  const grid = matched.filter(item => !featuredHrefs.has(resourceHref(item._type, item.slug))).sort((a, b) => {
    if (sort === "az") return a.title.trim().localeCompare(b.title.trim(), locale);
    if (sort === "newest") return (b.publishedAt || "").localeCompare(a.publishedAt || "");
    const related = Number(relatedGroups.includes(overlapGroup(a))) - Number(relatedGroups.includes(overlapGroup(b)));
    const rank = (item: Resource) => gridPriority.includes(item.slug) ? gridPriority.indexOf(item.slug) : 999;
    return related || rank(a) - rank(b);
  });
  return { featured: featured.filter(item => matched.includes(item)), grid: sort === "featured" ? spaceRelatedPosts(grid) : grid, count: matched.length };
}
