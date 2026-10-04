"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, BarChart3, BookOpen, Check, Coins, FileText, Headphones, Instagram, LayoutGrid, Leaf, Lightbulb, Linkedin, ShieldCheck, Target, TrendingUp, UsersRound, Youtube } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { classifyFulfillment, getDefaultProductEdition, hasPublishedProductDescription, storefrontBookCopyKeys as bookCopy } from "@/lib/shop/commerce";
import { ShopFAQ } from "./ShopFAQ";
import { FinalBookingCTA } from "@/components/home/FinalBookingCTA";

export interface ShopDesktopProduct {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  imageMetadata?: { lqip?: string } | null;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  format: string;
  category?: string;
  rating?: number;
  badge?: string;
  isFeatured?: boolean;
  buyLink?: string;
  stripeProductId?: string;
  stripePriceId?: string;
  editions?: Array<{ _key?: string; id?: string; name: string; price: number; format: string; description?: string; stripePriceId?: string }>;
}

interface ShopDesktopExperienceProps {
  products: ShopDesktopProduct[];
  featuredProduct?: ShopDesktopProduct | null;
  faqItems?: Array<{ question: string; answer: string }>;
  socialLinks?: { linkedin?: string; youtube?: string; instagram?: string };
  termsHref?: string;
  logoUrl?: string;
}

// ponytail: slug matching covers this seven-book catalog; use CMS goals if the catalog expands.
const goals = [
  { key: "tax", icon: Coins, match: /s-corp|rich.*tax/i },
  { key: "profit", icon: BarChart3, match: /restaurant|construction|3m/i },
  { key: "finance", icon: UsersRound, match: /cfo|construction|3m/i },
  { key: "growth", icon: Leaf, match: /3m|restaurant|construction/i },
] as const;
const container = "mx-auto w-full shop-content-width max-w-[94rem] px-4 sm:px-6 lg:px-8";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700";
const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price).replace(/\.00$/, "");

function BookFormats({ product, detailed = false }: { product: ShopDesktopProduct; detailed?: boolean }) {
  const t = useTranslations("Shop.Desktop.formats");
  const formats = [...new Set((product.editions || []).filter((edition) => edition.stripePriceId)
    .map((edition) => classifyFulfillment(edition.format, edition.name)).filter((format) => format !== "unknown"))];
  if (!detailed || !formats.length) return <p className={`text-sm leading-relaxed ${detailed ? "text-white" : "text-slate-700"}`}>{formats.length ? formats.map((format) => t(format)).join(" · ") : t("pending")}</p>;
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-4" aria-label={t("label")}>
      {formats.map((format) => {
        const Icon = format === "audio" ? Headphones : format === "physical" || format === "bundle" ? BookOpen : FileText;
        return <li key={format} className="flex items-center gap-2.5 text-sm font-semibold text-white"><Icon className="h-7 w-7 shrink-0 text-gold-300" aria-hidden="true" />{t(format)}</li>;
      })}
    </ul>
  );
}

export function ShopDesktopExperience({ products, featuredProduct, faqItems = [], socialLinks, termsHref, logoUrl }: ShopDesktopExperienceProps) {
  const t = useTranslations("Shop.Desktop");
  const header = useTranslations("Header");
  const [goal, setGoal] = useState<string | null>(null);
  const publishedProducts = products.filter(product => hasPublishedProductDescription(product.shortDescription));
  const featured = featuredProduct && hasPublishedProductDescription(featuredProduct.shortDescription) ? featuredProduct : publishedProducts.find(product => product.isFeatured) || publishedProducts[0];
  const catalogOrder = Object.keys(bookCopy);
  const gridProducts = publishedProducts
    .filter((product, index) => product._id !== featured?._id && publishedProducts.findIndex((other) => other._id === product._id) === index)
    .sort((a, b) => {
      const aIndex = catalogOrder.indexOf(a.slug);
      const bIndex = catalogOrder.indexOf(b.slug);
      return (aIndex < 0 ? catalogOrder.length : aIndex) - (bIndex < 0 ? catalogOrder.length : bIndex);
    });
  const selectedGoal = goals.find((item) => item.key === goal);
  const visibleProducts = selectedGoal ? gridProducts.filter((product) => selectedGoal.match.test(product.slug)) : gridProducts;
  const description = (product: ShopDesktopProduct) => {
    const copy = bookCopy[product.slug] ? t(`books.${bookCopy[product.slug]}.description`) : product.shortDescription;
    return hasPublishedProductDescription(copy) ? copy : product.shortDescription;
  };
  const category = (product: ShopDesktopProduct) => bookCopy[product.slug] ? t(`books.${bookCopy[product.slug]}.category`) : t("library.bookCategory");

  return (
    <div className="bg-white text-brand-950">
      <section className="w-full bg-brand-500 text-white" aria-labelledby="shop-desktop-heading">
        <div className={`${container} pb-6 pt-10 sm:pt-14 xl:pt-8`}>
        <p className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-300"><span className="h-px w-10 bg-gold-300" aria-hidden="true" />{t("hero.eyebrow")}</p>
        <div className="mt-5 grid items-center gap-6 xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-10">
          <div>
            <h1 id="shop-desktop-heading" className="font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-[3.25rem] 2xl:text-[3.5rem]">{t("hero.title")}</h1>
            <p className="mt-4 max-w-[58rem] text-lg leading-relaxed text-white lg:text-xl">{t("hero.subtitle")}</p>
          </div>
          <p className="hidden border-l border-white/30 pl-8 text-base font-semibold uppercase leading-snug tracking-wide text-white xl:block">{t("hero.insightOne")}<br />{t("hero.insightTwo")}<br />{t("hero.insightThree")}<span className="mt-5 block h-px w-14 bg-gold-300" aria-hidden="true" /></p>
        </div>
        </div>
      </section>
      {featured && (
        <section className="w-full bg-brand-500" aria-labelledby="shop-featured-heading">
          <article className={`${container} grid text-white md:grid-cols-[.8fr_1.2fr] ${featured.slug === "the-s-corp-playbook" ? "xl:grid-cols-[.95fr_1.25fr_.65fr]" : ""}`}>
            <div className="relative isolate min-h-[23rem] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(228,209,135,.18),transparent_75%)] md:min-h-[30rem]">
              <div className="absolute inset-y-9 right-[9%] w-[54%] pb-5 [transform:perspective(1000px)_rotateY(-8deg)]">
                {featured.imageUrl ? <Image src={featured.imageUrl} alt={featured.title} fill priority sizes="(min-width: 1280px) 260px, (min-width: 768px) 30vw, 50vw" className="object-contain drop-shadow-[12px_16px_12px_rgba(0,0,0,.4)]" /> : <BookOpen className="absolute inset-0 m-auto h-16 w-16 text-gold-300" aria-hidden="true" />}
              </div>
              <div className="absolute left-4 top-[23%] flex h-28 w-28 items-center justify-center rounded-full border border-gold-300 bg-brand-900/70 px-3 text-center text-xs font-bold uppercase leading-relaxed tracking-wide text-gold-300 xl:left-6 xl:h-32 xl:w-32">{t("featured.coverNote")}</div>
            </div>
            <div className="flex flex-col items-start justify-center p-6 sm:p-8 xl:px-8 xl:py-9">
              <p className="flex items-center gap-5 text-sm font-bold uppercase tracking-[0.14em] text-gold-300">{t("featured.eyebrow")}<span className="h-px w-14 bg-gold-300" aria-hidden="true" /></p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-white">{category(featured)}</p>
              <h2 id="shop-featured-heading" className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">{featured.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white lg:text-lg">{description(featured)}</p>
              <div className="mt-6 w-full"><BookFormats product={featured} detailed /></div>
              <div className="mt-6 flex w-full flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/25 pt-5">
                <p className="font-data text-4xl font-bold tabular-nums">{formatPrice(getDefaultProductEdition(featured.editions || [])?.price ?? featured.price)}</p>
                <p className="border-l border-white/25 pl-5 text-sm leading-relaxed text-white">{t("featured.editionNote")}</p>
              </div>
              <Link href={`/shop/${featured.slug}`} className="mt-5 inline-flex min-h-14 w-full max-w-xs items-center justify-center gap-5 rounded-xl bg-gold-300 px-6 py-3 text-lg font-semibold text-brand-950 hover:bg-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300">{t("actions.viewBook")}<ArrowRight className="h-6 w-6" aria-hidden="true" /></Link>
            </div>
            {featured.slug === "the-s-corp-playbook" && <ul className="mx-6 mb-6 hidden gap-5 border-t border-white/25 pt-6 md:col-span-2 md:grid md:grid-cols-2 md:gap-x-8 xl:col-span-1 xl:m-0 xl:my-9 xl:mr-7 xl:grid-cols-1 xl:gap-0 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
              {[TrendingUp, ShieldCheck, Target, UsersRound].map((Icon, index) => <li key={index} className="flex gap-4 border-white/25 xl:py-4 xl:not-last:border-b"><Icon className="h-8 w-8 shrink-0 text-gold-300" aria-hidden="true" /><div><h3 className="font-heading text-lg font-semibold leading-tight">{t(`featured.topics.${index}.title`)}</h3><p className="mt-2 text-sm leading-relaxed text-white">{t(`featured.topics.${index}.body`)}</p></div></li>)}
            </ul>}
          </article>
        </section>
      )}
      {featured && <div className="mb-10 bg-[#f1f5f2] py-6"><ul className={`${container} grid grid-cols-2 gap-5 xl:grid-cols-4 xl:gap-0`}>
        {[BookOpen, Lightbulb, UsersRound, TrendingUp].map((Icon, index) => <li key={index} className="flex items-center gap-5 sm:px-3 xl:border-r xl:border-slate-300 xl:px-6 xl:first:pl-0 xl:last:border-r-0"><Icon className="h-9 w-9 shrink-0 text-brand-500" aria-hidden="true" /><div><p className="font-heading text-base font-semibold">{t(`hero.strip.${index}.title`)}</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{t(`hero.strip.${index}.body`)}</p></div></li>)}
      </ul></div>}
      <section id="shop-desktop-library" className={`${container} scroll-mt-28 pb-12`} aria-labelledby="shop-library-heading">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-900">{t("library.eyebrow")}<span className="h-px w-12 bg-gold-700" aria-hidden="true" /></p>
        <h2 id="shop-library-heading" className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{t("goals.title")}</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{t("goals.subtitle")}</p>
        <div role="group" aria-label={t("goals.title")} className="mt-6 flex flex-wrap gap-3">
          <button type="button" aria-pressed={goal === null} aria-controls="shop-book-grid" onClick={() => setGoal(null)} className={`flex min-h-14 items-center justify-center gap-3 rounded-lg border px-6 py-3 text-base font-semibold shadow-sm ${focus} ${goal === null ? "border-brand-900 bg-brand-900 text-white" : "border-slate-600 bg-white text-brand-950 hover:border-gold-700"}`}>
            <LayoutGrid className="h-5 w-5 shrink-0" aria-hidden="true" />{t("library.allBooks")}{goal === null && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
          </button>
          {goals.map(({ key, icon: Icon, match }, index) => (
            <button key={key} type="button" aria-pressed={goal === key} aria-controls="shop-book-grid" disabled={!gridProducts.some((product) => match.test(product.slug))} onClick={() => setGoal(goal === key ? null : key)} className={`flex min-h-14 items-center justify-center gap-3 rounded-lg border px-6 py-3 text-left text-base font-semibold disabled:opacity-60 ${focus} ${goal === key ? "border-brand-900 bg-brand-900 text-white" : "border-slate-600 bg-white text-brand-950 hover:border-gold-700"}`}>
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" /><span>{t(`goals.items.${index}.title`)}</span>{goal === key && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" aria-atomic="true" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">{t("library.collectionCount", { count: visibleProducts.length })}</p>
          <p className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.13em] text-slate-700 lg:flex"><span className="h-px w-9 bg-gold-700" aria-hidden="true" />{t("library.collectionNote")}</p>
        </div>
        <div id="shop-book-grid" className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article key={product._id} className="grid min-w-0 grid-cols-[6.25rem_minmax(0,1fr)] gap-4 rounded-md border border-slate-200 bg-white p-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:p-5 xl:grid-cols-[9rem_minmax(0,1fr)] xl:gap-5">
              <div className="relative min-h-56 self-stretch">
                {product.imageUrl ? <Image src={product.imageUrl} alt={product.title} fill sizes="(min-width: 1280px) 144px, (min-width: 640px) 120px, 100px" className="object-contain object-top drop-shadow-[4px_8px_5px_rgba(0,0,0,.18)]" /> : <BookOpen className="absolute left-0 right-0 top-8 mx-auto h-12 w-12 text-gold-800" aria-hidden="true" />}
              </div>
              <div className="flex min-w-0 flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-gold-900">{category(product)}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold leading-tight xl:text-[1.375rem]">{product.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600">{description(product)}</p>
                <div className="mt-auto pt-5"><div className="border-t border-slate-200 pt-3"><BookFormats product={product} /></div></div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p className="font-data text-2xl font-bold tabular-nums">{formatPrice(getDefaultProductEdition(product.editions || [])?.price ?? product.price)}</p>
                  <Link href={`/shop/${product.slug}`} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded px-1 text-sm font-semibold text-brand-900 hover:text-gold-900 ${focus}`}>{t("actions.viewBook")}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!publishedProducts.length && !featured && <p className="mt-6 text-slate-600">{t("library.empty")}</p>}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-300 pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-700">
          <p>{t("library.footerNote")}</p><p className="flex items-center gap-3"><span className="h-px w-10 bg-gold-700" aria-hidden="true" />Union National Tax</p>
        </div>
      </section>
      <ShopFAQ items={faqItems} />
      <div className="homepage-rhythm"><FinalBookingCTA id="shop-next-step" placement="shop_final_cta" label={header("bookCall")} /></div>
      <footer className="bg-brand-950 text-white">
        <div className={`${container} flex flex-col items-start justify-between gap-4 py-6 pb-28 xl:flex-row xl:items-center xl:pb-6`}>
          <Link href="/" className="inline-flex min-h-11 items-center font-heading text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300">{logoUrl ? <Image src={logoUrl} alt="Union National Tax" width={230} height={39} style={{ height: "auto" }} className="w-[230px] object-contain" /> : "Union National Tax"}</Link>
          <p className="text-sm leading-relaxed text-white">{t("footer.tagline")}</p>
          <nav aria-label={t("footer.navigationLabel")} className="flex flex-wrap items-center gap-4 text-sm">
            {[{ href: "/legal/privacy-policy", label: "privacy" }, ...(termsHref ? [{ href: termsHref, label: "terms" }] : []), { href: "/contact", label: "contact" }].map(({ href, label }) => <Link key={href} href={href} className="inline-flex min-h-11 items-center hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300">{t(`footer.${label}`)}</Link>)}
          </nav>
          {socialLinks && <div className="flex gap-2">{([["linkedin", Linkedin], ["youtube", Youtube], ["instagram", Instagram]] as const).map(([name, Icon]) => socialLinks[name] ? <a key={name} href={socialLinks[name]} target="_blank" rel="noopener noreferrer" aria-label={name} className="inline-flex h-11 w-11 items-center justify-center hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"><Icon className="h-5 w-5" aria-hidden="true" /></a> : null)}</div>}
        </div>
      </footer>
    </div>
  );
}
