import { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/shop/CartSidebar";
import { ConstructionBookForm } from "@/components/construction/profit-blueprint/ConstructionBookForm";
import { SoundFamiliarSection } from "@/components/construction/profit-blueprint/SoundFamiliarSection";
import { BlueprintMastery } from "@/components/construction/profit-blueprint/BlueprintMastery";
import { ConstructionBookSalesSection } from "@/components/construction/profit-blueprint/ConstructionBookSalesSection";
import { BlueprintFAQ } from "@/components/construction/profit-blueprint/BlueprintFAQ";
import { BlueprintVideoSection } from "@/components/construction/profit-blueprint/BlueprintVideoSection";
import { SalesLetterSection } from "@/components/construction/profit-blueprint/SalesLetterSection";
import { ExitIntentChecklist } from "@/components/construction/profit-blueprint/ExitIntentChecklist";
import { FadeIn } from "@/components/ui/FadeIn";
import { PRODUCT_DETAIL_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { BlueprintAuthorBio } from "@/components/construction/profit-blueprint/BlueprintAuthorBio";

export const metadata: Metadata = {
    title: "Money-Making Blueprint for Construction Companies | Job Costing & Profit Control Guide",
    description: "Download the free contractor blueprint from Union National Tax and learn how job costing, cash flow control, estimating discipline, and margin visibility help construction companies protect profit.",
    alternates: {
        canonical: "/construction/profit-blueprint",
    },
};

const FALLBACK_PRODUCT = {
    _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
    title: {
        en: "The Money-Making Blueprint for Construction Companies",
        es: "El Plan Para Generar Dinero en Empresas de Construcción",
    },
    slug: "the-money-making-blueprint-for-construction-companies",
    imageUrl: "/images/og-construction.png",
    price: 27,
    compareAtPrice: 49,
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
    rating: 5,
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
    editions: [
        {
            _key: "bundle",
            name: {
                en: "Complete Bundle",
                es: "Paquete Completo",
            },
            price: 79,
            format: "bundle",
            language: "en",
            stripePriceId: "price_1BUNDLE_BUNDLE_BUNDLE_BUNDLE",
            stripeProductId: "prod_BUNDLE_BUNDLE_BUNDLE_BUNDLE",
            description: {
                en: "Digital PDF + Physical Book + Audiobook + Bonus Templates.",
                es: "PDF Digital + Libro Físico + Audiolibro + Plantillas Bonus.",
            },
        },
        {
            _key: "physical",
            name: {
                en: "Physical",
                es: "Físico",
            },
            price: 39,
            format: "physical",
            language: "en",
            stripePriceId: "price_1T2cpuBBqB7ETKuVPA63LBVd",
            stripeProductId: "prod_U0I59FqHVgmIKe",
            description: {
                en: "Premium print edition.",
                es: "Edición impresa de primera calidad.",
            },
        },
        {
            _key: "digital",
            name: {
                en: "Digital PDF",
                es: "PDF Digital",
            },
            price: 27,
            format: "digital",
            language: "en",
            stripePriceId: "price_1TOlYGBBqB7ETKuVjY3QWF1m",
            stripeProductId: "prod_UNAGtZ3NgI4Aue",
            description: {
                en: "Instant digital download.",
                es: "Descarga digital instantánea.",
            },
        },
        // TODO: replace placeholder Stripe IDs with real Spanish-locale Stripe product/price once published
        // For now, only the Spanish Digital PDF edition is offered; bundle and physical will be added later
        {
            _key: "digital-es",
            name: {
                en: "Digital PDF (Spanish)",
                es: "PDF Digital",
            },
            price: 27,
            format: "digital",
            language: "es",
            stripePriceId: "price_1DIGITAL_ES_DIGITAL_ES",
            stripeProductId: "prod_DIGITAL_ES_DIGITAL_ES",
            description: {
                en: "Instant digital download.",
                es: "Descarga digital instantánea.",
            },
        },
    ],
    orderBump: {
        _key: "strategy-call",
        name: {
            en: "30-Min Tax Strategy Call with Jason",
            es: "Llamada de Estrategia Fiscal de 30 Minutos con Jason",
        },
        price: 97,
        format: "service",
        description: {
            en: "Apply the blueprint to your business. 30 minutes with Jason, focused on your numbers.",
            es: "Aplique el plan a su negocio. 30 minutos con Jason, enfocados en sus números.",
        },
        stripePriceId: "price_1STRATEGY_STRATEGY_STRATEGY",
        stripeProductId: "prod_STRATEGY_STRATEGY_STRATEGY",
    }
};

interface ProductEditionFromSanity {
    _key?: string;
    name: string;
    price: number;
    format: string;
    stripePriceId?: string;
    stripeProductId?: string;
    description?: string;
}

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

    // Fetch construction book details from Sanity
    let product = null;
    try {
        const response = await sanityFetch({
            query: PRODUCT_DETAIL_QUERY,
            params: { slug: "the-money-making-blueprint-for-construction-companies", locale }
        });
        product = response?.data;
    } catch (err) {
        console.error("Error fetching construction book product details:", err);
    }

    const productData = product ? {
        ...FALLBACK_PRODUCT,
        ...product,
        title: product.title || resolveLocalized(FALLBACK_PRODUCT.title, locale) || FALLBACK_PRODUCT.title.en,
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
        editions: FALLBACK_PRODUCT.editions,
        orderBump: product.orderBump || FALLBACK_PRODUCT.orderBump,
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
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <main id="main-content" className="flex-1">
            <ExitIntentChecklist />

            {/* Hero Section - Simplified for Book Sales with Lead Capture */}
            <section className="relative min-h-[80dvh] flex items-center bg-brand-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
                    <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left: Copy - Focus on Book */}
                        <div className="lg:col-span-7">
                            <FadeIn delay={0.1}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-400/20 mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                                        $27 - $39 | Digital PDF or Physical
                                    </span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={150}>
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">✓ 1,200+ Downloads</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">✓ 3 Printable Checklists</span>
                                    </div>
                                </div>
                            </FadeIn>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-heading text-white leading-[1.05] mb-6 tracking-tight uppercase">
                                Is Your Construction Company{" "}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black pr-4 pb-1">
                                    Losing
                                </span>{" "}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black pr-4 pb-1">
                                    Money?
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl font-light">
                                The Money-Making Blueprint shows contractors exactly where profit disappears — and how to stop it. Job costing, cash flow, estimating, margin control.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "10-point checklist to identify your profit leaks",
                                    "Job costing systems that surface losing jobs early",
                                    "Cash flow forecasting to stop payroll surprises",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 size={18} className="text-gold-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                <div className="h-px w-8 bg-gold-500/30" />
                                <span>By Jason Astwood, EA, FSCP, LUTCF</span>
                            </div>
                        </div>

                        {/* Right: Lead Capture Form */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-brand-900/40">
                                <div className="text-center mb-4">
                                    <p className="text-base font-bold text-black mb-1.5">Get the Free Profit Leak Checklist</p>
                                    <p className="text-xs font-semibold text-black">Enter your details and we&apos;ll send it to your inbox</p>
                                </div>
                                <ConstructionBookForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VSL Section - Pre-sell warmup before book sales */}
            <BlueprintVideoSection
                videoSrc={productData?.videoFileUrl || FALLBACK_VIDEO_URL}
                posterSrc={productData?.videoThumbnail?.asset?.url}
            />

            {/* Long-Form Sales Letter - Persuasion bridge between VSL and offer */}
            <SalesLetterSection />

            {/* Book Sales Section - PRIMARY CONVERSION - Shown early */}
            <div id="book-sales">
                <ConstructionBookSalesSection product={productData} />
            </div>

            {/* Sound Familiar - Editorial proof and systems alignment */}
            <SoundFamiliarSection />

            {/* Blueprint Mastery - What You'll Master */}
            <BlueprintMastery />

            {/* Author Bio Section */}
            <BlueprintAuthorBio author={productData.author} />

            {/* FAQ - Brief */}
            <BlueprintFAQ />
            </main>
            <Footer />
            <CartSidebar />
        </div>
    );
}
