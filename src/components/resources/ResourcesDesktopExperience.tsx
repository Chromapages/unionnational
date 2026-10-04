"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useState, type FormEvent } from "react";
import { ArrowRight, BookOpen, CalendarDays, ChartNoAxesColumnIncreasing, ChartPie, Check, ChevronDown, Clock3, Coins, FileText, Lightbulb, Search, ShieldCheck, Store, UsersRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { resourceHref } from "./resourceHref";
import { getCatalogResources, getIntentRecommendations, getResourceResults, resourceIntentTopics, resourceTopics, type Resource, type ResourceIntent, type SortKey, type TopicKey } from "./resourceCatalog";

const container = "mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900";
const intents = [{ key: "structure", icon: FileText }, { key: "tax", icon: Coins }, { key: "irs", icon: ShieldCheck }, { key: "numbers", icon: ChartPie }, { key: "growth", icon: Store }, { key: "industries", icon: UsersRound }] as const;
const labels = {
  en: {
    eyebrow: "Resources hub", title: "Tax and business guidance for owners", subtitle: "Articles and guides from our advisory experience.",
    search: "Search resources", searchPlaceholder: "Search articles and guides...", browse: "Browse by topic",
    topics: { all: "All", tax: "Tax Strategy", scorp: "S-Corp", industries: "Industries", finance: "CFO & Finance", irs: "IRS Help", operations: "Business Operations" },
    readArticle: "Read article", readGuide: "Read guide", article: "Article", guide: "Guide", allResources: "All resources", resource: "resource", resources: "resources", readTime: "min read",
    startEyebrow: "Resources", startTitle: "Find the right resource.", startSubtitle: "Practical guidance for real-world business decisions.",
    startPoints: ["Articles and guides for your next step.", "Straightforward answers to real questions.", "Built for business owners like you."],
    intentLabel: "What are you trying to figure out?", intentTitle: "Get guidance for what's on your mind.", intentBody: "Choose a topic for recommended resources, or browse the full library.",
    intents: {
      structure: { title: "Choose a business structure", detail: "LLC, S-Corp, or C-Corp" }, tax: { title: "Lower my tax bill", detail: "Deductions, credits, strategies" },
      irs: { title: "Handle an IRS issue", detail: "Notices, audits, compliance" }, numbers: { title: "Understand my numbers", detail: "Cash flow, reporting, profitability" },
      growth: { title: "Plan business growth", detail: "Planning, decisions, investment" }, industries: { title: "Find industry-specific advice", detail: "Construction, restaurants, and more" },
    },
    recommended: "Recommended for you", recommendationTitle: "Start with this resource.", recommendationBody: "Begin with practical guidance for the decision on your mind.", featuredLabel: "Featured resource", alsoUseful: "Also useful", viewTopic: "View all in this topic", recommendationChanged: "Recommended resource",
    sort: "Sort", sorts: { featured: "Featured", newest: "Newest", az: "A–Z" }, clear: "Clear filters", loadMore: "Load more",
    emptyTitle: "No resources match your search.", emptyBody: "Try a different topic or search term.",
    book: "Book a Strategy Call", newsletterTitle: "Request resource updates", emailLabel: "Email address", emailPlaceholder: "Enter your email address", emailButton: "Request updates",
    emailNote: "Opens your email app to request updates from our team.",
    loaded: (count: number, total: number) => `${count} additional ${count === 1 ? "resource" : "resources"} loaded. ${total} catalog resources displayed.`,
  },
  es: {
    eyebrow: "Centro de recursos", title: "Orientación fiscal y empresarial para dueños de negocios", subtitle: "Artículos y guías basados en nuestra experiencia de asesoría.",
    search: "Buscar recursos", searchPlaceholder: "Busque artículos y guías...", browse: "Explorar por tema",
    topics: { all: "Todos", tax: "Estrategia fiscal", scorp: "S-Corp", industries: "Industrias", finance: "CFO y finanzas", irs: "Ayuda con el IRS", operations: "Operaciones" },
    readArticle: "Leer artículo", readGuide: "Leer guía", article: "Artículo", guide: "Guía", allResources: "Todos los recursos", resource: "recurso", resources: "recursos", readTime: "min de lectura",
    startEyebrow: "Recursos", startTitle: "Encuentre el recurso adecuado.", startSubtitle: "Orientación práctica para decisiones empresariales reales.",
    startPoints: ["Artículos y guías para su próximo paso.", "Respuestas claras a preguntas reales.", "Para dueños de negocios como usted."],
    intentLabel: "¿Qué está tratando de resolver?", intentTitle: "Orientación para lo que tiene en mente.", intentBody: "Elija un tema para ver recursos recomendados o explore toda la biblioteca.",
    intents: {
      structure: { title: "Elegir una estructura empresarial", detail: "LLC, S-Corp o C-Corp" }, tax: { title: "Reducir mis impuestos", detail: "Deducciones, créditos, estrategias" },
      irs: { title: "Resolver un asunto con el IRS", detail: "Avisos, auditorías, cumplimiento" }, numbers: { title: "Entender mis números", detail: "Flujo de caja, informes, rentabilidad" },
      growth: { title: "Planificar el crecimiento", detail: "Planes, decisiones, inversiones" }, industries: { title: "Buscar asesoría para mi industria", detail: "Construcción, restaurantes y más" },
    },
    recommended: "Recomendado para usted", recommendationTitle: "Empiece con este recurso.", recommendationBody: "Comience con orientación práctica para la decisión que tiene en mente.", featuredLabel: "Recurso destacado", alsoUseful: "También puede ayudarle", viewTopic: "Ver todos en este tema", recommendationChanged: "Recurso recomendado",
    sort: "Ordenar", sorts: { featured: "Destacados", newest: "Más recientes", az: "A–Z" }, clear: "Borrar filtros", loadMore: "Cargar más",
    emptyTitle: "No hay recursos que coincidan con su búsqueda.", emptyBody: "Pruebe otro tema o término de búsqueda.",
    book: "Reservar una llamada estratégica", newsletterTitle: "Solicite novedades sobre recursos", emailLabel: "Correo electrónico", emailPlaceholder: "Ingrese su correo electrónico", emailButton: "Solicitar novedades",
    emailNote: "Abre su aplicación de correo para solicitar novedades a nuestro equipo.",
    loaded: (count: number, total: number) => `${count === 1 ? "Se cargó 1 recurso adicional." : `Se cargaron ${count} recursos adicionales.`} ${total} recursos en la lista.`,
  },
};

function imageFor(resource: Resource) {
  return resource.coverImage?.asset?.url || resource.featuredImage?.asset?.url;
}

export function ResourcesDesktopExperience({ blogPosts, playbooks, showBlogPosts, showPlaybooks }: {
  blogPosts: Resource[]; playbooks: Resource[]; showBlogPosts: boolean; showPlaybooks: boolean;
}) {
  const locale = useLocale();
  const t = locale === "es" ? labels.es : labels.en;
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<TopicKey>("all");
  const [intent, setIntent] = useState<ResourceIntent>("structure");
  const [sort, setSort] = useState<SortKey>("featured");
  const [visibleLimit, setVisibleLimit] = useState(6);
  const [announcement, setAnnouncement] = useState("");
  const resources = getCatalogResources(showBlogPosts ? blogPosts : [], showPlaybooks ? playbooks : []);
  const results = getResourceResults(resources, getIntentRecommendations(resources, intent), topic, search, sort, locale);
  const primary = results.featured[0];
  const useful = results.featured.slice(1, 4);
  const visible = results.grid.slice(0, visibleLimit);
  const resetVisible = () => { setVisibleLimit(6); setAnnouncement(""); };
  const clearFilters = () => { setSearch(""); setTopic("all"); setSort("featured"); resetVisible(); };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); document.getElementById("resource-count")?.focus(); };
  const requestUpdates = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email")?.toString().trim();
    if (email) window.location.href = `mailto:hello@unionnationaltax.com?subject=${encodeURIComponent("Resource updates request")}&body=${encodeURIComponent(`Please send resource updates to ${email}.`)}`;
  };
  const categoryFor = (resource: Resource) => resource.categories?.find(category => category && category.slug !== "tips-and-tricks")?.title || (resource._type === "playbook" ? t.guide : t.article);
  const metadata = (resource: Resource, light = false) => {
    const date = resource.publishedAt ? new Date(resource.publishedAt) : undefined;
    return <span className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs ${light ? "text-white/90" : "text-slate-700"}`}>
      {resource.readingTime ? <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4 shrink-0" aria-hidden="true" />{resource.readingTime} {t.readTime}</span> : null}
      {date && !Number.isNaN(date.getTime()) ? <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 shrink-0" aria-hidden="true" /><time dateTime={resource.publishedAt}>{new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date)}</time></span> : null}
    </span>;
  };
  const card = (resource: Resource) => (
    <Link key={resourceHref(resource._type, resource.slug)} href={resourceHref(resource._type, resource.slug)} data-resource-card="grid" data-resource-slug={resource.slug} className={`group flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-brand-950 hover:border-gold-700 ${focusRing}`}>
      {imageFor(resource) && <div className="relative aspect-[16/6] overflow-hidden bg-brand-900"><Image src={imageFor(resource)!} alt="" fill sizes="(min-width: 1536px) 460px, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="object-cover" /></div>}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <span className="self-start bg-[#fff0ce] px-1.5 py-0.5 text-xs font-semibold uppercase tracking-[.04em] text-gold-900">{categoryFor(resource)}</span>
        <h3 className="mt-3 font-heading text-lg font-bold leading-snug group-hover:text-gold-900 sm:text-xl">{resource.title}</h3>
        <span className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 text-sm text-slate-700">
          {resource.readingTime ? <span className="inline-flex items-center gap-2"><Clock3 className="size-4 shrink-0" aria-hidden="true" />{resource.readingTime} {t.readTime}</span> : <span />}
          <ArrowRight className="size-5 shrink-0 text-gold-800" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );

  return (
    <div className="bg-white text-brand-950" data-testid="resources-experience">
      <section aria-labelledby="resources-desktop-heading" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_28%_34%,#10473c_0%,#07372f_58%,#052c29_100%)] text-white">
        <div className="absolute inset-0 -z-10 bg-[url('/images/services-blueprint-hero.webp')] bg-cover bg-[center_68%] opacity-[.22]" aria-hidden="true" />
        <div className={`${container} py-10 lg:py-12`}>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-gold-200 sm:text-sm">{t.eyebrow}</p>
          <h1 id="resources-desktop-heading" className="mt-4 font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em]">{t.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/90 sm:text-xl">{t.subtitle}</p>
          <form onSubmit={submitSearch} role="search" className="mt-6 flex max-w-[42rem] items-center rounded-lg border border-white bg-white p-1 text-brand-950 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-gold-300">
            <label htmlFor="resource-search" className="sr-only">{t.search}</label>
            <input id="resource-search" type="search" value={search} onChange={event => { setSearch(event.target.value); resetVisible(); }} placeholder={t.searchPlaceholder} className="min-h-11 min-w-0 flex-1 rounded-md bg-white px-3 text-base outline-none placeholder:text-slate-700" />
            <button type="submit" aria-label={t.search} className={`flex size-11 shrink-0 items-center justify-center rounded-md text-brand-900 ${focusRing}`}><Search className="size-5" aria-hidden="true" /></button>
          </form>
        </div>
      </section>

      <section aria-labelledby="featured-resource-heading" className={`${container} @container py-10 lg:py-12`}>
        <header className="grid items-center gap-6 lg:grid-cols-2">
          <div><div className="flex items-center gap-3"><p className="text-xs font-semibold uppercase tracking-[.12em] text-slate-700">{t.startEyebrow}</p><span className="h-px w-14 bg-gold-600" aria-hidden="true" /></div><h2 id="featured-resource-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] sm:text-4xl lg:text-[2.75rem]">{t.startTitle}</h2><p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">{t.startSubtitle}</p></div>
          <ul className="grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
            {[BookOpen, Lightbulb, ChartNoAxesColumnIncreasing].map((Icon, index) => <li key={index} className="flex min-w-0 items-center gap-3 sm:pl-4 sm:first:pl-0"><Icon className="size-8 shrink-0 text-brand-500" strokeWidth={1.5} aria-hidden="true" /><span className="text-sm leading-snug text-brand-950">{t.startPoints[index]}</span></li>)}
          </ul>
        </header>
        <div className="@container/intent mt-6 rounded-xl bg-[#f4f8f5] p-4 sm:p-5">
          <div className="grid gap-5 @min-[80rem]/intent:grid-cols-[minmax(0,1.7fr)_minmax(0,6fr)]">
            <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[.08em] text-brand-500">{t.intentLabel}</p><h3 id="resource-intents-title" className="mt-2 font-heading text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem]">{t.intentTitle}</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">{t.intentBody}</p></div>
            <div role="group" aria-labelledby="resource-intents-title" className="flex min-w-0 gap-2 overflow-x-auto p-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:p-0 lg:grid-cols-6">
              {intents.map(({ key, icon: Icon }) => <button key={key} type="button" data-resource-intent={key} aria-pressed={intent === key} aria-controls="resources-recommendations" onClick={() => { setIntent(key); setTopic("all"); setSearch(""); resetVisible(); const next = getIntentRecommendations(resources, key)[0]; if (next) setAnnouncement(`${t.recommendationChanged}: ${next.title}`); }} className={`relative flex min-h-36 w-40 shrink-0 flex-col items-center justify-center rounded-xl border p-4 text-center sm:w-auto ${focusRing} ${intent === key ? "border-brand-900 bg-[#06352f] text-white" : "border-slate-200 bg-white text-brand-950 hover:border-gold-700"}`}>
                {intent === key && <Check className="absolute right-2 top-2 size-4 text-gold-200" aria-hidden="true" />}<Icon className="size-8 shrink-0" strokeWidth={1.5} aria-hidden="true" /><span className="mt-3 font-heading text-base font-semibold leading-tight">{t.intents[key].title}</span><span className={`mt-2 text-xs leading-snug ${intent === key ? "text-white/90" : "text-slate-700"}`}>{t.intents[key].detail}</span>
              </button>)}
            </div>
          </div>
        </div>
        <div id="resources-recommendations">
          {primary && <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col items-start py-1"><p className="text-xs font-semibold uppercase tracking-[.1em] text-gold-800">{t.recommended}</p><h3 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem]">{t.recommendationTitle}</h3><p className="mt-3 max-w-[30ch] text-base leading-relaxed text-slate-700">{t.recommendationBody}</p><Link href={resourceHref(primary._type, primary.slug)} aria-label={`${primary._type === "playbook" ? t.readGuide : t.readArticle}: ${primary.title}`} className={`mt-6 inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#06352f] px-5 py-3 font-heading text-sm font-semibold text-white hover:bg-brand-900 lg:mt-auto ${focusRing}`}>{primary._type === "playbook" ? t.readGuide : t.readArticle}<ArrowRight className="size-5" aria-hidden="true" /></Link></div>
            <article data-resource-card="featured" data-resource-slug={primary.slug} data-resource-href={`/${locale}${resourceHref(primary._type, primary.slug)}`} aria-labelledby="recommended-resource-title" className="relative isolate flex min-h-[19rem] min-w-0 flex-col overflow-hidden rounded-xl bg-[#06352f] p-6 text-white">
              {imageFor(primary) && <Image src={imageFor(primary)!} alt="" fill sizes="(min-width: 1536px) 630px, (min-width: 1024px) 44vw, 100vw" className="-z-20 object-cover object-right" />}
              <div className="absolute inset-0 -z-10 bg-[#022e29]/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#022e29] lg:via-[#022e29]/95 lg:to-[#022e29]/25" aria-hidden="true" />
              <div className="lg:max-w-[70%]"><p className="text-xs font-semibold uppercase tracking-[.08em] text-gold-300">{t.featuredLabel}</p><h3 id="recommended-resource-title" className="mt-3 font-heading text-2xl font-bold leading-[1.15] tracking-tight lg:text-[1.625rem]">{primary.title}</h3>{(primary.excerpt || primary.description) && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/95">{primary.excerpt || primary.description}</p>}</div>
              <div className="relative mt-auto pt-6">{metadata(primary, true)}</div>
            </article>
            {useful.length > 0 && <div className="flex min-w-0 flex-col"><div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"><h3 className="text-xs font-semibold uppercase tracking-[.1em] text-gold-800">{t.alsoUseful}</h3><button type="button" onClick={() => { setTopic(resourceIntentTopics[intent]); setSearch(""); resetVisible(); requestAnimationFrame(() => document.getElementById("resource-catalog")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })); }} className={`inline-flex min-h-11 items-center gap-2 text-xs font-medium text-brand-900 ${focusRing}`}>{t.viewTopic}<ArrowRight className="size-4" aria-hidden="true" /></button></div><div className="grid flex-1 gap-2">
              {useful.map(resource => <Link key={resourceHref(resource._type, resource.slug)} href={resourceHref(resource._type, resource.slug)} data-resource-card="featured" data-resource-slug={resource.slug} className={`grid min-h-20 min-w-0 grid-cols-[5rem_minmax(0,1fr)_1rem] items-center gap-3 overflow-hidden rounded-lg border border-slate-200 bg-white pr-3 hover:border-gold-700 ${focusRing}`}>
                <div className="relative h-full min-h-20 overflow-hidden bg-slate-100">{imageFor(resource) && <Image src={imageFor(resource)!} alt="" fill sizes="80px" className="object-cover" />}</div><div className="min-w-0 py-2"><h4 className="line-clamp-2 font-heading text-sm font-bold leading-tight">{resource.title}</h4><div className="mt-2">{metadata(resource)}</div></div><ArrowRight className="size-4 shrink-0 text-brand-900" aria-hidden="true" />
              </Link>)}
            </div></div>}
          </div>}
        </div>
      </section>
      <div className={`${container} pb-8`}><Link id="resources-strategy-call" href="/book" className={`inline-flex min-h-11 items-center gap-3 font-heading text-base font-semibold text-brand-900 underline decoration-gold-700 underline-offset-4 ${focusRing}`}>{t.book}<ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link></div>

      <section aria-label={t.browse} className={`${container} pt-10 pb-6 lg:pt-12`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label={t.browse} className="flex flex-wrap gap-2">
            {resourceTopics.map(key => <button key={key} type="button" aria-pressed={topic === key} onClick={() => { setTopic(key); resetVisible(); }} className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${focusRing} ${topic === key ? "border-brand-900 bg-brand-900 text-white" : "border-slate-600 bg-white text-brand-950 hover:border-gold-700"}`}>
              {topic === key && <Check className="size-4 shrink-0" aria-hidden="true" />}{t.topics[key]}
            </button>)}
          </div>
          <p id="resource-count" tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={`text-sm font-semibold text-slate-700 ${focusRing}`}>{results.count} {results.count === 1 ? t.resource : t.resources}</p>
        </div>
      </section>

      {(results.grid.length > 0 || results.count === 0) && <section id="resource-catalog" aria-labelledby="all-resources-heading" className={`${container} scroll-mt-24 pb-10 lg:pb-12`}>
        <header className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <h2 id="all-resources-heading" className="font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] sm:text-4xl lg:text-[2.75rem]">{t.allResources}</h2>
          <details className="group relative">
            <summary className={`box-border! inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium ${focusRing} [&::-webkit-details-marker]:hidden`}>{t.sort}<ChevronDown className="size-4 group-open:rotate-180" aria-hidden="true" /></summary>
            <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-600 bg-white p-3 shadow-lg">
              <label htmlFor="resource-sort" className="sr-only">{t.sort}</label><select id="resource-sort" value={sort} onChange={event => { setSort(event.target.value as SortKey); resetVisible(); }} className={`min-h-11 w-full rounded-md border border-slate-600 bg-white px-2 text-sm text-brand-950 ${focusRing}`}>{(["featured", "newest", "az"] as const).map(key => <option key={key} value={key}>{t.sorts[key]}</option>)}</select>
            </div>
          </details>
        </header>
        <div id="resource-grid" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(resource => card(resource))}</div>
        {results.count === 0 && <div className="mt-6 rounded-lg border border-slate-200 px-6 py-8 text-center"><h3 className="font-heading text-xl font-bold">{t.emptyTitle}</h3><p className="mt-2 text-base text-slate-700">{t.emptyBody}</p><button type="button" onClick={clearFilters} className={`mt-4 min-h-11 rounded-lg border border-slate-600 px-4 text-sm font-semibold text-brand-900 ${focusRing}`}>{t.clear}</button></div>}
        {visible.length < results.grid.length && <div className="mt-6 text-center"><button type="button" aria-controls="resource-grid" onClick={() => { const added = Math.min(12, results.grid.length - visible.length); setVisibleLimit(limit => limit + 12); setAnnouncement(t.loaded(added, visible.length + added)); }} className={`min-h-11 rounded-lg border border-slate-600 bg-white px-6 py-3 font-heading text-base font-semibold text-brand-900 hover:border-gold-700 ${focusRing}`}>{t.loadMore}</button></div>}
      </section>}
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only" data-load-announcement>{announcement}</p>

      <section id="resource-newsletter" aria-labelledby="resource-newsletter-heading" className="bg-[#06362f] text-white">
        <div className={`${container} grid items-center gap-5 py-10 lg:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]`}>
          <h2 id="resource-newsletter-heading" className="font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] sm:text-4xl lg:text-[2.75rem]">{t.newsletterTitle}</h2>
          <div><form onSubmit={requestUpdates} className="flex flex-wrap gap-3"><label htmlFor="resource-newsletter-email" className="sr-only">{t.emailLabel}</label><input id="resource-newsletter-email" name="email" type="email" required placeholder={t.emailPlaceholder} className="min-h-11 min-w-0 flex-[1_1_14rem] rounded-md border border-white bg-white px-4 py-3 text-base text-brand-950 placeholder:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300" /><button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#f6cf7a] px-5 py-3 text-base font-semibold text-brand-950 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{t.emailButton}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></button></form><p className="mt-3 text-sm leading-relaxed text-white/90">{t.emailNote}</p></div>
        </div>
      </section>
    </div>
  );
}
