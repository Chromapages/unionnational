import { Metadata } from "next";
import { ArrowRight, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CartSidebar } from "@/components/shop/CartSidebar";
import { BlueprintMastery } from "@/components/construction/profit-blueprint/BlueprintMastery";
import { ConstructionBookSalesSection } from "@/components/construction/profit-blueprint/ConstructionBookSalesSection";
import { BlueprintFAQ } from "@/components/construction/profit-blueprint/BlueprintFAQ";
import { SalesLetterSection } from "@/components/construction/profit-blueprint/SalesLetterSection";
import { ExitIntentChecklist } from "@/components/construction/profit-blueprint/ExitIntentChecklist";
import { BlueprintCta } from "@/components/construction/profit-blueprint/BlueprintCta";
import { MobileStickyCta } from "@/components/construction/profit-blueprint/MobileStickyCta";
import { MathSection } from "@/components/construction/profit-blueprint/MathSection";
import HeroVideoEmbed from "@/components/construction/profit-blueprint/HeroVideoEmbed";
import { PRODUCT_DETAIL_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { BlueprintAuthorBio } from "@/components/construction/profit-blueprint/BlueprintAuthorBio";
import { LimitedBonusCard } from "@/components/construction/profit-blueprint/LimitedBonusCard";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const baseUrl = "https://unionnationaltax.com";
    const path = "/construction/profit-blueprint";
    const canonicalUrl = locale === "es" ? `${baseUrl}/es${path}` : `${baseUrl}${path}`;

    const title = locale === "es"
        ? "Plan Para Generar Dinero en Empresas de Construcción | Guía de Costo de Trabajo y Control de Ganancias"
        : "Money-Making Blueprint for Construction Companies | Job Costing & Profit Control Guide";

    const description = locale === "es"
        ? "Descargue el plan gratuito para contratistas de Union National Tax y aprenda cómo el costo de trabajo, el control del flujo de caja, la disciplina de estimación y la visibilidad de márgenes protegen las ganancias de las empresas de construcción."
        : "Download the free contractor blueprint from Union National Tax and learn how job costing, cash flow control, estimating discipline, and margin visibility help construction companies protect profit.";

    return {
        title,
        description,
        openGraph: {
            images: [`${baseUrl}/images/og-construction.png`],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
    };
}

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
            stripePriceId: "price_1TOlSoBBqB7ETKuVtDfASqwk",
            stripeProductId: "prod_UNRJ66222da3Bv",
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
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden pb-20 md:pb-0">
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
                                    Stop Working for Free.
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black mt-1">
                                        Put Margin in Every Bid.
                                    </span>
                                </span>
                                <span className="hidden sm:block">
                                    Stop Working for Free.
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black mt-1">
                                        The Blueprint That Puts Margin Back in Every Bid.
                                    </span>
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 mb-7 leading-relaxed max-w-xl font-light">
                                The Money-Making Blueprint shows contractors exactly where profit disappears — and how to stop it.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "IRS-approved tax structure that saves contractors $20K/year",
                                    "Stop losing money on bids — spot unprofitable jobs early",
                                    "Cash flow forecasting to stop payroll surprises",
                                    "Pricing discipline to protect your margins on every bid",
                                ].map((item, i) => (
                                    <li key={i} className={i >= 2 ? "hidden sm:flex items-start gap-3 text-slate-300 text-sm sm:text-base" : "flex items-start gap-3 text-slate-300 text-sm sm:text-base"}>
                                        <CheckCircle2 size={18} className="text-gold-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Sleek Hero Testimonial Card — hidden on mobile to reduce height */}
                            <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl p-4 mb-7 max-w-xl">
                                <p className="text-slate-200 text-sm italic leading-relaxed">
                                    &ldquo;I was running 4% margin, hit 11% in 6 months using Jason&apos;s blueprint. The job costing template alone saved us $45k on our last commercial bid.&rdquo;
                                </p>
                                <div className="mt-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    <span>&mdash; Mark T., Astro Construction, AZ</span>
                                    <span className="text-gold-500">★ ★ ★ ★ ★ ($1.8M Revenue)</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-7">
                                 <a
                                     id="hero-get-blueprint-link"
                                     href="#book-sales"
                                     aria-label={locale === "es" ? "Obtener el Plan — $27" : "Get the Blueprint — $27"}
                                     tabIndex={0}
                                     className="inline-flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 active:scale-[0.98] active:bg-gold-600 text-white font-black uppercase tracking-wider rounded-full transition-all shadow-lg shadow-gold-500/30 w-full sm:w-auto text-center"
                                 >
                                     <span className="text-sm font-black flex items-center gap-1.5 justify-center">
                                         {locale === "es" ? "Obtener el Plan" : "Get the Blueprint"}
                                         <span className="inline sm:hidden">&nbsp;&mdash;&nbsp;$27</span>
                                         <ArrowRight size={16} className="shrink-0 sm:w-[18px] sm:h-[18px]" />
                                     </span>
                                     <span className="block sm:hidden text-[9px] font-bold text-white/80 uppercase tracking-widest leading-none mt-0.5">
                                         {locale === "es" ? "Descarga PDF Instantánea" : "Instant PDF Download"}
                                     </span>
                                 </a>
                             </div>

                            <div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <div className="h-px w-8 bg-gold-500/30" />
                                <span>By Jason Astwood, EA · FSCP · LUTCF</span>
                                <span className="text-slate-600">·</span>
                                <span>IRS Enrolled Agent · Licensed in all 50 states</span>
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

            {/* Trust Bar - instant credibility signal */}
            <div className="bg-brand-900 border-b border-brand-800 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
                        <div className="flex items-center gap-2">
                            <span className="text-gold-500 font-black text-sm">★★★★★</span>
                            <span className="text-white/80 text-xs font-bold uppercase tracking-wider">5.0 Rating</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-gold-500 font-black text-xs">247</span>
                            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Contractors Bought This Month</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">30-Day Money-Back Guarantee</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-white/40" />
                            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Book Sales Section - Buy Widget + Guarantee */}
            <div>
                <ConstructionBookSalesSection product={productData} />
            </div>

            {/* Money Slide - The Math - Hit hard right after the emotional hook */}
            <MathSection />

            {/* Standalone Testimonials Section */}
            <section className="py-12 bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 border border-gold-200/60 text-[10px] font-black uppercase tracking-widest text-gold-700 mb-4">
                                ★ ★ ★ ★ ★ 5.0 · 247 contractors
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black font-heading text-brand-900 tracking-tight uppercase">
                                What Contractors Are Saying
                            </h2>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "We were running 5% net margin, hit 12% in 4 months after applying the pricing and overhead formulas in Chapter 2. Made our annual profit target by September.",
                                name: "Dave K.",
                                company: "K-Con Concrete",
                                state: "TX",
                                revenue: "$2.4M",
                            },
                            {
                                quote: "Before this book, we had cash flow surprises every other month. The progressive billing workflow in Chapter 5 alone gave us back our weekends. Jason knows the trades.",
                                name: "Sarah L.",
                                company: "L&M Electrical",
                                state: "CO",
                                revenue: "$900K",
                            },
                            {
                                quote: "I was running 4% margin, hit 11% in 6 months using Jason's blueprint. The job costing template alone saved us $45k on our last commercial bid.",
                                name: "Mark T.",
                                company: "Astro Construction",
                                state: "AZ",
                                revenue: "$1.8M",
                            },
                            {
                                quote: "The S-Corp chapter paid for the book ten times over in year one. I had no idea I was overpaying in taxes by that much. The systems actually work.",
                                name: "Mike R.",
                                company: "Riley Framing",
                                state: "WA",
                                revenue: "$1.2M",
                            },
                            {
                                quote: "I took the assessment, then bought the book. Best $79 I ever spent. My markup calculator now prices every job at 18% minimum. No more losing bids.",
                                name: "Carlos M.",
                                company: "Mendoza Drywall",
                                state: "NM",
                                revenue: "$650K",
                            },
                            {
                                quote: "Cash flow used to keep me up at night. Now I know what's coming in 90 days. The cash flow forecasting chapter alone changed everything.",
                                name: "Jennifer S.",
                                company: "Summit HVAC",
                                state: "MT",
                                revenue: "$1.5M",
                            },
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 relative shadow-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold-100 border border-gold-200 flex items-center justify-center shrink-0">
                                        <span className="text-gold-700 font-black text-xs">
                                            {t.name.split(" ").map(n => n[0]).join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-brand-900">{t.name}</p>
                                        <p className="text-[10px] text-slate-500">{t.company} · {t.state}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-xs italic leading-relaxed flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 border-t border-slate-100 pt-3">
                                    <span>★ ★ ★ ★ ★</span>
                                    <span>{t.revenue} Revenue</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Chapter Breakdown - What You'll Master (shows value before the sales letter) */}
            <BlueprintMastery />

            {/* Long-Form Sales Letter - Persuasion bridge between VSL and offer */}
            <SalesLetterSection />

            {/* Urgency & Limited Stack Bonus Cards */}
            <LimitedBonusCard locale={locale} />

            {/* Author Bio Section */}
            <BlueprintAuthorBio author={productData.author} />

            {/* FAQ - Brief */}
            <BlueprintFAQ />

            {/* Final CTA - bottom of page */}
            <BlueprintCta
                variant="gold"
                eyebrow="Last Step"
                title="Stop Leaving Six Figures on the Table"
                subtitle="Less than the cost of one afternoon on a job site — for the system that turns owner-operators into business owners."
                buttonText="Get the Blueprint Now"
            />

            </main>
            <Footer />
            <CartSidebar />
            <MobileStickyCta />
        </div>
    );
}
