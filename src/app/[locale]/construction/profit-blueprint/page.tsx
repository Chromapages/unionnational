import { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/layout/Footer";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CartSidebar } from "@/components/shop/CartSidebar";
import { ConstructionBookSalesSection, type BookEdition } from "@/components/construction/profit-blueprint/ConstructionBookSalesSection";
import { BlueprintFAQ } from "@/components/construction/profit-blueprint/BlueprintFAQ";
import { ExitIntentChecklist } from "@/components/construction/profit-blueprint/ExitIntentChecklist";
import { BlueprintMoreInfoForm } from "@/components/construction/profit-blueprint/BlueprintMoreInfoForm";
import { MathSection } from "@/components/construction/profit-blueprint/MathSection";
import { BlueprintServicesAlternative } from "@/components/construction/profit-blueprint/BlueprintServicesAlternative";
import HeroVideoEmbed from "@/components/construction/profit-blueprint/HeroVideoEmbed";
import { PRODUCT_DETAIL_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { BlueprintAuthorBio } from "@/components/construction/profit-blueprint/BlueprintAuthorBio";
import { ServiceViewContent } from "@/components/seo/ServiceViewContent";
import { CHECKOUT_PRODUCTS_QUERY, resolveCheckoutItem, type ProductCheckoutRecord } from "@/lib/shop/checkout";
import { classifyFulfillment, normalizeEditionId } from "@/lib/shop/commerce";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/construction/profit-blueprint";
    const canonicalUrl = `${baseUrl}/${locale}${path}`;

    const title = locale === "es"
        ? "Plan Para Generar Dinero en Empresas de Construcción | Guía de Costo de Trabajo y Control de Ganancias"
        : "Money-Making Blueprint for Construction Companies | Job Costing & Profit Control Guide";

    const description = locale === "es"
        ? "Obtenga el plan para contratistas de Union National Tax y aprenda cómo el costo de trabajo, el control del flujo de caja, la disciplina de estimación y la visibilidad de márgenes protegen las ganancias de las empresas de construcción."
        : "Get the contractor blueprint from Union National Tax and learn how job costing, cash flow control, estimating discipline, and margin visibility help construction companies protect profit.";

    return {
        title,
        description,
        openGraph: {
            images: [`${baseUrl}/images/og-construction.png`],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}/en${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
    };
}

const FALLBACK_PRODUCT = {
    title: {
        en: "The Money-Making Blueprint for Construction Companies",
        es: "El Plan Para Generar Dinero en Empresas de Construcción",
    },
    slug: "the-money-making-blueprint-for-construction-companies",
    imageUrl: "/images/og-construction.png",
    shortDescription: {
        en: "The ultimate implementation guide to job costing, cash flow control, and protecting your construction margins.",
        es: "La guía de implementación definitiva para el costo de trabajo, el control del flujo de efectivo y la protección de sus márgenes de construcción.",
    },
    format: "Book",
    badge: {
        en: "Contractor Edition",
        es: "Edición para Contratistas",
    },
    category: "Financial Control",
    author: {
        name: "Jason Astwood",
        role: "EA, FSCP, LUTCF",
        credentials: ["EA", "FSCP", "LUTCF"],
        imageUrl: "",
        bioShort: {
            en: "Jason Astwood helps profitable business owners connect tax structure to cash flow, compensation, and long-term wealth. His advisory process is built for owners who want clarity, control, and smarter decisions before tax season arrives.",
            es: "Jason Astwood ayuda a los propietarios de negocios rentables a conectar la estructura fiscal con el flujo de efectivo, la compensación y el patrimonio a largo plazo. Su proceso de asesoría está diseñado para propietarios que buscan claridad, control y decisiones más inteligentes antes de que llegue la temporada de impuestos.",
        },
    },
};

const FALLBACK_VIDEO_URL = "https://assets.cdn.filesafe.space/N5KQjySifAxlxhrrvY8g/media/69dae49fa4e6aa34cbdfcede.mp4";

type Locale = "en" | "es";

const resolveLocalized = (value: unknown, locale: Locale): string | undefined => {
    if (value == null) return undefined;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
        const obj = value as Record<string, unknown>;
        const localized = obj[locale];
        if (typeof localized === "string" && localized.length > 0) return localized;
        const en = obj.en;
        if (typeof en === "string") return en;
    }
    return undefined;
};

export default async function ProfitBlueprintPage(props: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await props.params;
    const locale: Locale = rawLocale === "es" ? "es" : "en";
    const t = await getTranslations({ locale, namespace: "ConstructionBlueprint" });
    const shopCopy = await getTranslations({ locale, namespace: "Shop.ProductPage" });
    const footerCopy = await getTranslations({ locale, namespace: "Shop.Desktop.footer" });

    // Fetch construction book details from Sanity
    let product = null;
    let catalogProduct: ProductCheckoutRecord | undefined;
    try {
        const [response, catalog] = await Promise.all([
            sanityFetch({ query: PRODUCT_DETAIL_QUERY, params: { slug: "the-money-making-blueprint-for-construction-companies", locale } }),
            sanityFetch({ query: CHECKOUT_PRODUCTS_QUERY, params: { slugs: ["the-money-making-blueprint-for-construction-companies"] } }),
        ]);
        product = response?.data;
        catalogProduct = (catalog?.data as ProductCheckoutRecord[] | null)?.find(record => record._id === product?._id);
    } catch (err) {
        console.error("Error fetching construction book product details:", err);
    }

    const editions = (product?.editions || []).flatMap((edition: BookEdition) => {
        if (!catalogProduct || !Number.isFinite(edition.price) || edition.price < 0) return [];
        // A language-specific edition must have its own configured price; the generic map denotes the English offer.
        if (edition.language === "es" && !/^price_[A-Za-z0-9]+$/.test(edition.stripePriceId || "")) return [];
        const canonicalId = normalizeEditionId(catalogProduct._id, edition);
        const resolved = resolveCheckoutItem(catalogProduct, {
            productId: catalogProduct._id, slug: catalogProduct.slug, editionId: canonicalId, quantity: 1,
        });
        if (!resolved || resolved.fulfillmentType === "unknown" || resolved.fulfillmentType === "bundle") return [];
        return [{ ...edition, _key: resolved.editionId || canonicalId, stripePriceId: resolved.stripePriceId }];
    });
    const localeEditions = editions.filter((edition: BookEdition) => !edition.language || edition.language === locale);
    const selectedEdition = localeEditions.find((edition: BookEdition) => classifyFulfillment(edition.format, edition.name) === "physical") || localeEditions[0];
    const canPurchase = !!product && !!selectedEdition;

    const productData = product ? {
        ...FALLBACK_PRODUCT,
        ...product,
        title: product.title || resolveLocalized(FALLBACK_PRODUCT.title, locale) || FALLBACK_PRODUCT.title.en,
        imageUrl: product.imageUrl || FALLBACK_PRODUCT.imageUrl,
        shortDescription: product.shortDescription || resolveLocalized(FALLBACK_PRODUCT.shortDescription, locale) || FALLBACK_PRODUCT.shortDescription.en,
        badge: product.badge || resolveLocalized(FALLBACK_PRODUCT.badge, locale) || FALLBACK_PRODUCT.badge.en,
        author: product.author ? {
            name: product.author.name,
            role: product.author.role || FALLBACK_PRODUCT.author.role,
            credentials: product.author.credentials || FALLBACK_PRODUCT.author.credentials,
            imageUrl: product.author.imageUrl || FALLBACK_PRODUCT.author.imageUrl,
            bioShort: product.author.bioShort || resolveLocalized(FALLBACK_PRODUCT.author.bioShort, locale) || FALLBACK_PRODUCT.author.bioShort.en,
        } : {
            ...FALLBACK_PRODUCT.author,
            bioShort: resolveLocalized(FALLBACK_PRODUCT.author.bioShort, locale) || FALLBACK_PRODUCT.author.bioShort.en,
        },
        editions,
        price: selectedEdition?.price,
        orderBump: product.orderBump,
    } : {
        ...FALLBACK_PRODUCT,
        title: resolveLocalized(FALLBACK_PRODUCT.title, locale) || FALLBACK_PRODUCT.title.en,
        shortDescription: resolveLocalized(FALLBACK_PRODUCT.shortDescription, locale) || FALLBACK_PRODUCT.shortDescription.en,
        badge: resolveLocalized(FALLBACK_PRODUCT.badge, locale) || FALLBACK_PRODUCT.badge.en,
        author: {
            ...FALLBACK_PRODUCT.author,
            bioShort: resolveLocalized(FALLBACK_PRODUCT.author.bioShort, locale) || FALLBACK_PRODUCT.author.bioShort.en,
        },
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden pb-20 md:pb-0">
            <LocaleSwitcher className="fixed right-6 top-6 z-[1100] hidden min-h-11 items-center border-gold-500/50 bg-brand-900 px-4 shadow-lg shadow-brand-950/30 hover:border-gold-400 hover:bg-brand-800 md:inline-flex" />
            {/* Meta Pixel: ViewContent — fires once on page load for retargeting & funnel tracking */}
            <ServiceViewContent
                serviceName={productData.title}
                serviceId="construction-profit-blueprint"
            />
            <main id="main-content" className="flex-1">
            <ExitIntentChecklist />

            {/* Hero Section - Two-column: copy + video above the fold */}
            <section className="relative min-h-[80dvh] flex items-center bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
                    <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                        {/* Left: Copy — order-last on mobile so video stacks first */}
                        <div className="order-last lg:order-first">
                            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-white leading-[1.05] mb-6 tracking-tight uppercase">
                                <span className="block sm:hidden">
                                    {t("heroLead")}
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black mt-1">
                                        {t("heroAccentMobile")}
                                    </span>
                                </span>
                                <span className="hidden sm:block">
                                    {t("heroLead")}
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black mt-1">
                                        {t("heroAccentDesktop")}
                                    </span>
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 mb-7 leading-relaxed max-w-xl font-light">
                                {t("heroBody")}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    t("benefits.0"),
                                    t("benefits.1"),
                                    t("benefits.2"),
                                ].map((item, i) => (
                                    <li key={i} className={i >= 2 ? "hidden sm:flex items-start gap-3 text-slate-300 text-sm sm:text-base" : "flex items-start gap-3 text-slate-300 text-sm sm:text-base"}>
                                        <CheckCircle2 size={18} className="text-gold-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-7">
                                 <a
                                     id="hero-get-blueprint-link"
                                     href="#book-sales"
                                     aria-label={canPurchase ? t("heroCtaWithPrice", { price: selectedEdition.price }) : shopCopy("purchaseUnavailable")}
                                     tabIndex={0}
                                     className="inline-flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 active:scale-[0.98] active:bg-gold-600 text-white font-black uppercase tracking-wider rounded-full transition-all shadow-lg shadow-gold-500/30 w-full sm:w-auto text-center"
                                 >
                                     <span className="text-sm font-black flex items-center gap-1.5 justify-center">
                                         {t("heroCta")}
                                         {canPurchase && <span className="inline sm:hidden">&nbsp;&mdash;&nbsp;${selectedEdition.price}</span>}
                                         <ArrowRight size={16} className="shrink-0 sm:w-[18px] sm:h-[18px]" />
                                     </span>
                                     <span className="block sm:hidden text-[9px] font-bold text-white/80 uppercase tracking-widest leading-none mt-0.5">
                                         {canPurchase ? resolveLocalized(selectedEdition.name, locale) : shopCopy("purchaseUnavailable")}
                                     </span>
                                 </a>
                             </div>

                            <div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <div className="h-px w-8 bg-gold-500/30" />
                                <span>{t("byline")}</span>
                                <span className="text-slate-600">·</span>
                                <span>{t("credentials")}</span>
                            </div>
                        </div>

                        {/* Right: Video — order-first on mobile so VSL is visible above the fold */}
                        <div className="w-full order-first lg:order-last">
                             <HeroVideoEmbed
                                 videoSrc={
                                     (locale === "es"
                                         ? (productData?.videoFileUrlEs || productData?.videoUrlEs)
                                         : (productData?.videoFileUrlEn || productData?.videoUrlEn))
                                     ?? productData?.videoFileUrlEn
                                     ?? productData?.videoUrlEn
                                     ?? productData?.videoFileUrlEs
                                     ?? productData?.videoUrlEs
                                     ?? productData?.videoFileUrl
                                     ?? productData?.videoUrl
                                     ?? FALLBACK_VIDEO_URL
                                 }
                                 posterSrc={
                                     (locale === "es"
                                         ? productData?.videoThumbnailEs?.asset?.url
                                         : productData?.videoThumbnailEn?.asset?.url)
                                     ?? productData?.videoThumbnail?.asset?.url
                                 }
                             />
                        </div>
                    </div>
                </div>
            </section>

            {/* Book Sales Section - Buy Widget + Guarantee */}
            <div id="book-sales">
                {canPurchase ? <ConstructionBookSalesSection product={productData} /> : <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" role="status">
                    <p className="text-lg text-brand-900">{shopCopy("purchaseUnavailable")}</p>
                    <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-900 underline underline-offset-4">{footerCopy("contact")}</Link>
                </div>}
            </div>

            {/* Alternative path for contractors who want hands-on implementation support */}
            <BlueprintServicesAlternative />

            {/* Construction Profitability Assessment */}
            <RevealOnScroll>
                <section className="relative overflow-hidden border-y border-brand-800 bg-brand-900 py-16 text-white lg:py-24">
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div className="absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full bg-gold-500/10 blur-[100px]" />
                        <div className="absolute -bottom-40 -left-24 h-[320px] w-[320px] rounded-full bg-gold-600/10 blur-[80px]" />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <span className="mb-6 inline-flex rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold-400">
                            {locale === "es" ? "Próximo Paso" : "Next Step"}
                        </span>
                        <h2 className="font-heading text-3xl font-black uppercase leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                            {locale === "es" ? "¿Listo para identificar sus fugas de ganancias específicas?" : "Ready to Find Your Specific Profit Leaks?"}
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                            {locale === "es"
                                ? "Después de obtener el plan, realice la Evaluación de Rentabilidad de la Construcción: un diagnóstico de 6 preguntas que identifica exactamente dónde su empresa está perdiendo el control."
                                : "After you get the blueprint, take the Construction Profitability Assessment — a 6-question diagnostic that identifies exactly where your business is losing control."}
                        </p>
                        <Link
                            href="/construction-profitability-assessment"
                            className="mt-8 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-900 shadow-lg shadow-gold-500/20 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                        >
                            {locale === "es" ? "Realizar la Evaluación" : "Take the Assessment"}
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </RevealOnScroll>

            {/* Money Slide - The Math - Hit hard right after the emotional hook */}
            <MathSection />

            {/* Author Bio Section */}
            <BlueprintAuthorBio author={productData.author} />

            {/* Assessment questions */}
            <BlueprintFAQ />

            {/* More Info Form - quick contact form at bottom */}
            <section className="py-12 lg:py-16 bg-brand-900 border-t border-brand-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BlueprintMoreInfoForm locale={locale} />
                </div>
            </section>

            </main>
            <Footer />
            <CartSidebar />
            {canPurchase && <a href="#book-sales" className="fixed inset-x-4 bottom-4 z-40 flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-900 px-5 py-3 pb-[max(.75rem,env(safe-area-inset-bottom))] text-center font-bold text-gold-400 shadow-lg md:hidden">
                {t("heroCtaWithPrice", { price: selectedEdition.price })}<ArrowRight className="size-4" aria-hidden="true" />
            </a>}
        </div>
    );
}
