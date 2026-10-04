"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId } from "react";
import {
  ArrowRight,
  Building2,
  Calculator,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  Hammer,
  House,
  MapPin,
  Package,
  ShoppingCart,
  Target,
  Tag,
  Truck,
  UsersRound,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ClientInsightSection } from "./ClientInsightSection";
import { FinalBookingCTA } from "@/components/home/FinalBookingCTA";

const industries: {
  id: string;
  href: string;
  image: string;
  icon: LucideIcon;
  features: LucideIcon[];
  areaIcons: LucideIcon[];
  serviceHrefs: string[];
}[] = [
  {
    id: "construction",
    href: "/industries/construction",
    image: "/images/industries-construction-site.webp",
    icon: Hammer,
    features: [ChartNoAxesCombined, UsersRound, ClipboardList, Truck],
    areaIcons: [ChartNoAxesCombined, UsersRound, FileText],
    serviceHrefs: ["/tax-planning", "/strategic-bookkeeping", "/payroll-services", "/fractional-cfo"],
  },
  {
    id: "restaurants",
    href: "/industries/restaurants",
    image: "/images/industries/food.png",
    icon: Utensils,
    features: [ChartNoAxesCombined, ClipboardList, UsersRound, FileText],
    areaIcons: [Calculator, UsersRound, MapPin],
    serviceHrefs: ["/tax-planning", "/strategic-bookkeeping", "/payroll-services", "/fractional-cfo"],
  },
  {
    id: "real-estate",
    href: "/industries/real-estate",
    image: "/images/industries/real-estate.png",
    icon: Building2,
    features: [Building2, ChartNoAxesCombined, FileText, Target],
    areaIcons: [House, ChartNoAxesCombined, FileText],
    serviceHrefs: ["/tax-planning", "/strategic-bookkeeping", "/new-business-formation", "/fractional-cfo"],
  },
  {
    id: "e-commerce",
    href: "/industries/e-commerce",
    image: "/images/industries/ecommerce.png",
    icon: ShoppingCart,
    features: [ChartNoAxesCombined, ClipboardList, FileText, Target],
    areaIcons: [Tag, Package, ChartNoAxesCombined],
    serviceHrefs: ["/tax-planning", "/strategic-bookkeeping", "/fractional-cfo", "/new-business-formation"],
  },
];

const copy = {
  "en": {
    "heroBody": "Tax and financial guidance for the costs, decisions, and obligations your business faces.",
    "heroPathsLabel": "Explore industries",
    "pickerTitleOne": "Choose your industry.",
    "pickerTitleTwo": "Get the right financial guidance.",
    "pickerIntro": "Different businesses. Different challenges. A financial partner who gets it.",
    "focusEyebrow": "Industry focus",
    "helpEyebrow": "What we help with",
    "servicesEyebrow": "Relevant services",
    "explore": [
      "Explore Construction Advisory",
      "Explore Hospitality Advisory",
      "Explore Real Estate Advisory",
      "Explore E-commerce Advisory"
    ],
    "specialist": "Talk to a specialist",
    "builtAroundLabel": "Built around",
    "otherDetails": [
      {
        "focus": "Job costing · Payroll · Entity strategy",
        "explore": "Explore Construction"
      },
      {
        "focus": "Prime cost · Payroll · Multi-location reporting",
        "explore": "Explore Hospitality"
      },
      {
        "focus": "1031 exchanges · Depreciation · Entity strategy",
        "explore": "Explore Real Estate"
      },
      {
        "focus": "Sales-tax nexus · Inventory · Multi-channel margins",
        "explore": "Explore E-commerce"
      }
    ],
    "ctaTitle": "Ready to Talk About Your Industry?",
    "ctaBody": "Talk through your business, goals, and tax questions.",
    "ctaButton": "Book a Strategy Call",
    "sectors": [
      {
        "title": "Construction & Trades",
        "short": "Build more profitable projects.",
        "headline": "Solid financial strategy for what you build next.",
        "imageBody": "We help contractors and trade businesses improve margins, manage cash flow, and build a stronger, more profitable future.",
        "intro": "Project-based businesses require a different financial playbook.",
        "body": "From job costing and cash flow to entity structure and equipment purchases, we help contractors and trade businesses make smarter financial decisions and keep more of what they build.",
        "features": [
          {
            "title": "Job Costing & Financial Visibility",
            "body": "Know which projects make money and where to improve."
          },
          {
            "title": "Entity Strategy & Tax Planning",
            "body": "S-Corp, LLC, and multi-entity strategies built for contractors."
          },
          {
            "title": "Payroll & Compliance",
            "body": "Keep your team, filings, and obligations on track."
          },
          {
            "title": "Equipment & Depreciation",
            "body": "Maximize deductions and plan for major purchases."
          }
        ],
        "services": [
          "Proactive Tax Planning",
          "Strategic Bookkeeping",
          "Payroll Services",
          "Fractional CFO"
        ]
      },
      {
        "title": "Restaurants & Hospitality",
        "short": "Protect margins at volume.",
        "headline": "Make Every Service Count.",
        "imageBody": "Build clearer reporting, stronger margins, and a plan for the busy seasons ahead.",
        "intro": "High-volume operations need timely numbers and careful planning.",
        "body": "We help restaurant and hospitality owners understand margins, manage payroll and cash flow, and make tax decisions with better visibility.",
        "features": [
          {
            "title": "Margin Visibility",
            "body": "See food, labor, and operating costs clearly."
          },
          {
            "title": "Tax Planning",
            "body": "Make tax decisions before deadlines arrive."
          },
          {
            "title": "Payroll & Reporting",
            "body": "Keep teams and financial records aligned."
          },
          {
            "title": "Growth Decisions",
            "body": "Plan for new locations and investment."
          }
        ],
        "services": [
          "Proactive Tax Planning",
          "Strategic Bookkeeping",
          "Payroll Services",
          "Fractional CFO"
        ]
      },
      {
        "title": "Real Estate Investors",
        "short": "Turn assets into opportunity.",
        "headline": "Plan Beyond the Next Property.",
        "imageBody": "Connect property decisions to a wider tax and financial strategy.",
        "intro": "Every acquisition and disposition changes the financial picture.",
        "body": "We help real estate investors coordinate entity structure, tax planning, reporting, and cash flow as portfolios evolve.",
        "features": [
          {
            "title": "Portfolio Structure",
            "body": "Align entities with your holdings and goals."
          },
          {
            "title": "Financial Visibility",
            "body": "Understand performance across properties."
          },
          {
            "title": "Tax Planning",
            "body": "Evaluate timing and available strategies."
          },
          {
            "title": "Investment Decisions",
            "body": "Plan acquisitions with clearer numbers."
          }
        ],
        "services": [
          "Proactive Tax Planning",
          "Strategic Bookkeeping",
          "Business Formation",
          "Fractional CFO"
        ]
      },
      {
        "title": "E-commerce Businesses",
        "short": "Scale with confidence.",
        "headline": "Grow Without Losing Sight of the Numbers.",
        "imageBody": "Build financial systems that keep pace with channels, inventory, and growth.",
        "intro": "Digital businesses need a clear picture across every sales channel.",
        "body": "We help e-commerce owners understand profitability, organize reporting, plan for tax obligations, and make confident growth decisions.",
        "features": [
          {
            "title": "Channel Profitability",
            "body": "See which products and channels perform."
          },
          {
            "title": "Inventory & Cash Flow",
            "body": "Connect purchasing decisions to cash needs."
          },
          {
            "title": "Sales Tax Planning",
            "body": "Stay ahead of changing obligations."
          },
          {
            "title": "Growth Strategy",
            "body": "Use current numbers to guide expansion."
          }
        ],
        "services": [
          "Proactive Tax Planning",
          "Strategic Bookkeeping",
          "Fractional CFO",
          "Business Formation"
        ]
      }
    ],
    "heroTitle": "Advice built for how your industry makes money.",
    "cardDescriptions": [
      "Get a clearer view of job margins and build a stronger, more profitable business.",
      "Understand where margins need attention and protect what you’ve built.",
      "See how property decisions affect your tax picture and long-term wealth.",
      "Understand margins across sales channels and keep more of what you grow."
    ],
    "seeIndustry": [
      "See construction advisory",
      "See hospitality advisory",
      "See real estate advisory",
      "See e-commerce advisory"
    ]
  },
  "es": {
    "heroBody": "Orientación fiscal y financiera para los costos, decisiones y obligaciones de su negocio.",
    "heroPathsLabel": "Explorar industrias",
    "pickerTitleOne": "Elija su industria.",
    "pickerTitleTwo": "Reciba la orientación financiera adecuada.",
    "pickerIntro": "Negocios distintos. Desafíos diferentes. Un aliado financiero que lo entiende.",
    "focusEyebrow": "Industria destacada",
    "helpEyebrow": "Cómo le ayudamos",
    "servicesEyebrow": "Servicios relevantes",
    "explore": [
      "Asesoría para Construcción",
      "Asesoría para Hospitalidad",
      "Asesoría Inmobiliaria",
      "Asesoría para Comercio Electrónico"
    ],
    "specialist": "Hablar con un especialista",
    "builtAroundLabel": "Diseñado para",
    "otherDetails": [
      {
        "focus": "Costos por obra · Nómina · Estructura empresarial",
        "explore": "Explorar construcción"
      },
      {
        "focus": "Costos principales · Nómina · Informes de múltiples sedes",
        "explore": "Explorar hospitalidad"
      },
      {
        "focus": "Intercambios 1031 · Depreciación · Estructura empresarial",
        "explore": "Explorar bienes raíces"
      },
      {
        "focus": "Impuestos sobre ventas · Inventario · Márgenes multicanal",
        "explore": "Explorar comercio electrónico"
      }
    ],
    "ctaTitle": "¿Listo para Hablar de su Industria?",
    "ctaBody": "Hablemos de su negocio, sus metas y sus preguntas fiscales.",
    "ctaButton": "Reserve una Llamada Estratégica",
    "sectors": [
      {
        "title": "Construcción y Oficios",
        "short": "Proyectos más rentables.",
        "headline": "Estrategia financiera sólida para lo que construya después.",
        "imageBody": "Ayudamos a contratistas a mejorar márgenes, manejar el flujo de caja y construir un futuro más sólido y rentable.",
        "intro": "Los negocios por proyecto necesitan una estrategia financiera distinta.",
        "body": "Desde costos y flujo de caja hasta estructura empresarial y equipos, ayudamos a los contratistas a tomar mejores decisiones y conservar más de lo que construyen.",
        "features": [
          {
            "title": "Costos y Visibilidad Financiera",
            "body": "Sepa qué proyectos son rentables."
          },
          {
            "title": "Estructura y Planificación Fiscal",
            "body": "Estrategias de entidades para contratistas."
          },
          {
            "title": "Nómina y Cumplimiento",
            "body": "Mantenga al día a su equipo y sus obligaciones."
          },
          {
            "title": "Equipos y Depreciación",
            "body": "Planifique compras importantes y deducciones."
          }
        ],
        "services": [
          "Planificación Fiscal",
          "Contabilidad Estratégica",
          "Servicios de Nómina",
          "CFO Fraccional"
        ]
      },
      {
        "title": "Restaurantes y Hospitalidad",
        "short": "Proteja sus márgenes.",
        "headline": "Haga que Cada Servicio Cuente.",
        "imageBody": "Obtenga reportes claros, mejores márgenes y un plan para las temporadas intensas.",
        "intro": "Las operaciones de alto volumen requieren números oportunos.",
        "body": "Ayudamos a propietarios de restaurantes a entender márgenes, manejar nómina y flujo de caja, y planificar impuestos con mayor claridad.",
        "features": [
          {
            "title": "Visibilidad de Márgenes",
            "body": "Controle costos de alimentos, personal y operación."
          },
          {
            "title": "Planificación Fiscal",
            "body": "Actúe antes de los plazos fiscales."
          },
          {
            "title": "Nómina e Informes",
            "body": "Alinee equipos y registros financieros."
          },
          {
            "title": "Decisiones de Crecimiento",
            "body": "Planifique nuevas sedes e inversiones."
          }
        ],
        "services": [
          "Planificación Fiscal",
          "Contabilidad Estratégica",
          "Servicios de Nómina",
          "CFO Fraccional"
        ]
      },
      {
        "title": "Inversionistas Inmobiliarios",
        "short": "Convierta activos en oportunidades.",
        "headline": "Planee Más Allá de la Próxima Propiedad.",
        "imageBody": "Conecte cada propiedad con su estrategia fiscal y financiera general.",
        "intro": "Cada compra y venta cambia el panorama financiero.",
        "body": "Ayudamos a inversionistas a coordinar estructura empresarial, impuestos, informes y flujo de caja conforme evoluciona su cartera.",
        "features": [
          {
            "title": "Estructura de Cartera",
            "body": "Alinee entidades con sus propiedades y metas."
          },
          {
            "title": "Visibilidad Financiera",
            "body": "Entienda el rendimiento de sus propiedades."
          },
          {
            "title": "Planificación Fiscal",
            "body": "Evalúe tiempos y estrategias disponibles."
          },
          {
            "title": "Decisiones de Inversión",
            "body": "Compre con números más claros."
          }
        ],
        "services": [
          "Planificación Fiscal",
          "Contabilidad Estratégica",
          "Formación de Empresas",
          "CFO Fraccional"
        ]
      },
      {
        "title": "Negocios de Comercio Electrónico",
        "short": "Escale con confianza.",
        "headline": "Crezca sin Perder de Vista los Números.",
        "imageBody": "Cree sistemas financieros a la altura de sus canales, inventario y crecimiento.",
        "intro": "Los negocios digitales necesitan claridad en todos sus canales de venta.",
        "body": "Ayudamos a empresarios a entender la rentabilidad, organizar informes, planificar impuestos y crecer con confianza.",
        "features": [
          {
            "title": "Rentabilidad por Canal",
            "body": "Vea qué productos y canales rinden mejor."
          },
          {
            "title": "Inventario y Flujo de Caja",
            "body": "Conecte compras con necesidades de efectivo."
          },
          {
            "title": "Impuestos sobre Ventas",
            "body": "Anticípese a nuevas obligaciones."
          },
          {
            "title": "Estrategia de Crecimiento",
            "body": "Use cifras actuales para guiar su expansión."
          }
        ],
        "services": [
          "Planificación Fiscal",
          "Contabilidad Estratégica",
          "CFO Fraccional",
          "Formación de Empresas"
        ]
      }
    ],
    "heroTitle": "Asesoría pensada para cómo genera ingresos su industria.",
    "cardDescriptions": [
      "Entienda mejor los márgenes de cada obra y construya un negocio más sólido y rentable.",
      "Identifique los márgenes que requieren atención y proteja lo que ha construido.",
      "Vea cómo sus decisiones inmobiliarias afectan sus impuestos y su patrimonio a largo plazo.",
      "Entienda los márgenes de sus canales de venta y conserve más de lo que genera."
    ],
    "seeIndustry": [
      "Ver asesoría para construcción",
      "Ver asesoría para hospitalidad",
      "Ver asesoría inmobiliaria",
      "Ver asesoría para comercio electrónico"
    ]
  }
};

export function IndustriesDesktopExperience() {
  const locale = useLocale();
  const t = locale === "es" ? copy.es : copy.en;
  return (
    <div className="bg-white text-[#102b2b]">
      <section aria-labelledby="industries-heading" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_28%_34%,#10473c_0%,#07372f_58%,#052c29_100%)] text-white">
        <div className="absolute inset-0 -z-10 bg-[url('/images/services-blueprint-hero.webp')] bg-cover bg-[center_68%] opacity-[.22]" aria-hidden="true" />
        <div className="mx-auto max-w-[94rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <h1 id="industries-heading" className="max-w-[48rem] font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em]">{t.heroTitle}</h1>
          <p className="mt-5 max-w-[48rem] text-lg leading-relaxed text-white/85 sm:text-xl">{t.heroBody}</p>
        </div>
      </section>
      <section id="industry-picker" aria-labelledby="industry-picker-heading" className="@container mx-auto max-w-[94rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <p className="max-w-[24rem] border-b border-gold-600 pb-1 text-sm font-semibold uppercase tracking-[.18em] text-slate-600">{t.heroPathsLabel}</p>
        <h2 id="industry-picker-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]"><span className="block">{t.pickerTitleOne}</span><span className="block">{t.pickerTitleTwo}</span></h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-xl">{t.pickerIntro}</p>
        <div className="mt-8 grid auto-rows-fr gap-5 @min-[40rem]:grid-cols-2 @min-[72rem]:grid-cols-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return <Link key={industry.id} href={industry.href} data-industry-card className="group flex min-h-44 min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_-18px_rgba(13,46,43,.15)] hover:border-gold-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700">
              <span className={`flex size-16 shrink-0 items-center justify-center rounded-full text-brand-500 ${index === 1 ? "bg-gold-50" : "bg-brand-50/60"}`} aria-hidden="true"><Icon className="size-9" strokeWidth={1.8} /></span>
              <h3 className="mt-4 font-heading text-xl font-bold leading-tight text-brand-950">{t.sectors[index].title}</h3>
              <p className="mt-3 text-base leading-snug text-slate-600 sm:text-lg">{t.cardDescriptions[index]}</p>
              <ul className="mt-5 space-y-4 border-t border-slate-200 pt-5 text-base leading-snug text-slate-600">{t.otherDetails[index].focus.split(" · ").map((area, areaIndex) => { const AreaIcon = industry.areaIcons[areaIndex]; return <li key={area} className="flex min-w-0 items-start gap-3"><AreaIcon className="size-6 shrink-0 text-brand-500" strokeWidth={1.8} aria-hidden="true" /><span className="min-w-0">{area}</span></li>; })}</ul>
              <span className="mt-auto inline-flex min-h-11 items-center gap-3 pt-7 font-heading text-base font-bold text-brand-950"><span className="min-w-0 underline decoration-gold-600 underline-offset-[6px] group-focus-visible:decoration-2">{t.seeIndustry[index]}</span><ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></span>
            </Link>;
          })}
        </div>
      </section>
      <div className="mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8"><ClientInsightSection compact /></div>
      <div className="homepage-rhythm"><FinalBookingCTA id="industries-closing" placement="industries_closing" /></div>
    </div>
  );
}

export function IndustryExpertise({ industryId }: { industryId: "construction" | "restaurants" | "real-estate" | "e-commerce" }) {
  const locale = useLocale();
  const idPrefix = useId();
  const t = locale === "es" ? copy.es : copy.en;
  const header = useTranslations("Header");
  const index = industries.findIndex(industry => industry.id === industryId);
  const active = industries[index];
  const content = t.sectors[index];
  return (
    <div data-industry-detail={industryId} className="@container mx-auto w-full max-w-[94rem] scroll-mt-28 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <section aria-labelledby={`${idPrefix}-heading`} className="@container/focus grid scroll-mt-28 overflow-hidden rounded-xl border border-slate-200 bg-white @min-[64rem]:grid-cols-[41%_59%]">
        <div className="relative isolate min-h-64 overflow-hidden bg-slate-100 sm:min-h-80 @min-[64rem]:min-h-[34rem]">
          <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${active.image}')`, backgroundPosition: active.id === "construction" ? "62% center" : "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,34,31,.85)_0%,transparent_40%)]" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7"><p className="text-sm font-bold uppercase tracking-[.12em] text-white">{content.title}</p><span className="mt-3 block h-1 w-12 rounded-sm bg-gold-400" aria-hidden="true" /></div>
        </div>
        <div className="flex min-w-0 flex-col p-5 sm:p-7 @min-[80rem]/focus:px-10">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-gold-800">{t.focusEyebrow}</p>
          <h2 id={`${idPrefix}-heading`} className="mt-1 font-heading text-3xl font-bold leading-[1.04] tracking-[-.03em] text-brand-950 sm:text-4xl @min-[64rem]/focus:text-[2.75rem]">{content.title}</h2>
          <p className="mt-2 text-lg leading-snug text-slate-600">{content.intro}</p>
          <p className="mt-3 text-base leading-snug text-slate-600">{content.body}</p>
          <p className="mt-3 text-sm leading-snug text-slate-600">{t.builtAroundLabel}: {t.otherDetails[index].focus}</p>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-[.13em] text-brand-900">{t.helpEyebrow}</h3>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 @min-[36rem]/focus:grid-cols-2">
              {content.features.map((feature, featureIndex) => { const Icon = active.features[featureIndex]; return <div key={feature.title} className="flex min-w-0 items-start gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#edf3ef] text-brand-900"><Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" /></span><div className="min-w-0 pt-1"><h4 className="font-heading text-base font-bold leading-tight text-brand-950">{feature.title}</h4><p className="mt-1 text-sm leading-snug text-slate-600">{feature.body}</p></div></div>; })}
            </div>
          </div>
          <div className="mt-auto pt-4">
            <div className="border-t border-slate-200 pt-4"><h3 className="text-xs font-bold uppercase tracking-[.13em] text-brand-900">{t.servicesEyebrow}</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">{content.services.map((service, serviceIndex) => <Link key={service} href={active.serviceHrefs[serviceIndex]} className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold leading-snug text-brand-900 hover:text-gold-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700"><span className="underline decoration-gold-700 underline-offset-4">{service}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>)}</div></div>
            <Link href="/book" className="mt-5 inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-2xl bg-[#f3c96d] px-6 py-3 text-sm font-bold text-brand-950 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"><span className="min-w-0">{header("bookCall")}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
