export type NavigationIconName =
  | "Home"
  | "FileText"
  | "Briefcase"
  | "BookOpen"
  | "Users"
  | "Phone"
  | "CircleHelp"
  | "ShoppingBag";

export type SiteNavigationItem = {
  id: string;
  translationKey: string;
  href: string;
  icon: NavigationIconName;
  desktopPlacement: "logo" | "dropdown" | "primary" | "secondary" | "hidden";
  mobileSection: "main" | "support" | "more";
};

/**
 * Canonical public navigation inventory. Desktop and drawer presentations
 * derive from this list so routes, labels, and active matching cannot drift.
 */
export const siteNavigationItems: readonly SiteNavigationItem[] = [
  { id: "home", translationKey: "home", href: "/", icon: "Home", desktopPlacement: "logo", mobileSection: "main" },
  { id: "services", translationKey: "services", href: "/services", icon: "FileText", desktopPlacement: "dropdown", mobileSection: "main" },
  { id: "industries", translationKey: "industries", href: "/industries", icon: "Briefcase", desktopPlacement: "primary", mobileSection: "main" },
  { id: "resources", translationKey: "resources", href: "/resources", icon: "BookOpen", desktopPlacement: "secondary", mobileSection: "more" },
  { id: "about", translationKey: "about", href: "/about", icon: "Users", desktopPlacement: "secondary", mobileSection: "main" },
  { id: "contact", translationKey: "contact", href: "/contact", icon: "Phone", desktopPlacement: "secondary", mobileSection: "support" },
  { id: "faq", translationKey: "faq", href: "/faq", icon: "CircleHelp", desktopPlacement: "hidden", mobileSection: "support" },
  { id: "shop", translationKey: "shop", href: "/shop", icon: "ShoppingBag", desktopPlacement: "hidden", mobileSection: "more" },
] as const;

export const desktopPrimaryNavigation = siteNavigationItems.filter(
  (item) => item.desktopPlacement === "primary",
);

export const desktopSecondaryNavigation = siteNavigationItems.filter(
  (item) => item.desktopPlacement === "secondary",
);

export const mobileNavigationSections = (["main", "support", "more"] as const).map((id) => ({
  id,
  items: siteNavigationItems.filter((item) => item.mobileSection === id),
}));

export const isNavigationPathActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export type ServiceSummary = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  shortDescription?: string;
  category?: string;
  icon?: string;
  isPopular?: boolean;
  badge?: string;
};

export const fallbackServices: ServiceSummary[] = [
  {
    title: "S-Corp Tax Advantage",
    slug: { current: "s-corp-tax-advantage" },
    icon: "TrendingUp",
    shortDescription: "Optimize your entity structure to legally reduce self-employment taxes, protect assets, and maximize your take-home pay.",
    category: "Tax Strategy",
    isPopular: true,
  },
  {
    title: "Fractional CFO",
    slug: { current: "fractional-cfo" },
    icon: "Briefcase",
    shortDescription: "Leverage high-level financial leadership, cash flow forecasting, and strategic metrics to guide sustainable business scaling.",
    category: "Financial Control",
  },
  {
    title: "Tax Planning",
    slug: { current: "tax-planning" },
    icon: "Target",
    shortDescription: "Implement proactive tax-saving strategies to legally minimize your liability, optimize deductions, and shield business wealth.",
    category: "Tax Strategy",
  },
  {
    title: "Strategic Bookkeeping",
    slug: { current: "strategic-bookkeeping" },
    icon: "Calculator",
    shortDescription: "Detailed records for cash flow & decisions",
    category: "Financial Control",
  },
  {
    title: "Tax Preparation & Filing",
    slug: { current: "tax-filing-and-preparation-services" },
    icon: "FileText",
    shortDescription: "Accurate, compliant, optimized filing",
    category: "Compliance Support",
  },
  {
    title: "New Business Formation",
    slug: { current: "new-business-formation" },
    icon: "Building2",
    shortDescription: "Smart entity structure guidance",
    category: "Tax Strategy",
  },
  {
    title: "Construction CFO Partnership",
    slug: { current: "construction" },
    icon: "HardHat",
    shortDescription: "Specialized financial control for contractors",
    category: "Specialized Advisory",
  },
  {
    title: "Restaurant CFO Partnership",
    slug: { current: "restaurants" },
    icon: "Utensils",
    shortDescription: "Profit recovery systems for hospitality",
    category: "Specialized Advisory",
  },
  {
    title: "Real Estate Wealth Architect",
    slug: { current: "real-estate" },
    icon: "Building2",
    shortDescription: "Portfolio tax shields & 1031 oversight",
    category: "Specialized Advisory",
  },
  {
    title: "E-commerce Growth CFO",
    slug: { current: "e-commerce" },
    icon: "ShoppingBag",
    shortDescription: "Multi-state nexus & margin protection",
    category: "Specialized Advisory",
  },
  {
    title: "Payroll Services",
    slug: { current: "payroll-services" },
    icon: "DollarSign",
    shortDescription: "Accurate, compliant payroll processing and filings.",
    category: "Financial Control",
  },
];

export const canonicalServicePaths: string[] = [
  "/services",
  "/fractional-cfo",
  "/tax-planning",
  "/strategic-bookkeeping",
  "/new-business-formation",
  "/s-corp-tax-advantage",
  "/payroll-services",
  "/tax-preparation-and-filing",
];

export const isServicePath = (pathname: string) =>
  canonicalServicePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

export const getServiceHref = (service: ServiceSummary) => {
  if (service.slug?.current) {
    const slug = service.slug.current;

    // Sanity retains this legacy service slug, while the public route is the
    // canonical shared-template page.
    if (["tax-planning-consulting", "tax-planning-consulting-services"].includes(slug)) {
      return "/tax-planning";
    }
    
    // Industry Pages
    if (["construction", "restaurants", "real-estate", "e-commerce"].includes(slug)) {
        return `/industries/${slug}`;
    }

    // Root-level High Performance Service Pages
    const rootRoutes = canonicalServicePaths
      .filter((path) => path !== "/services" && path !== "/tax-preparation-and-filing")
      .map((path) => path.slice(1));

    if (rootRoutes.includes(slug)) {
        return `/${slug}`;
    }

    // Special case for Tax Filing
    if ([
      "tax-filing",
      "tax-filing-preparation",
      "tax-filing-and-preparation-services",
      "tax-preparation-filing",
      "tax-preparation-and-filing",
      "tax-preparation-and-filing-services",
    ].includes(slug)) {
      return "/tax-preparation-and-filing";
    }

    return `/services/${slug}`;
  }

  return "/services";
};

/**
 * Sanity can return a valid but incomplete service list while content is being
 * drafted or unpublished. Preserve CMS copy for routes it supplies, then fill
 * each missing navigation route from the stable local inventory.
 */
export const mergeServiceNavigationData = (services?: ServiceSummary[]) => {
  if (!services?.length) return [...fallbackServices];

  const providedByHref = new Map(
    services
      .map((service) => [getServiceHref(service), service] as const)
      .filter(([href]) => href !== "/services"),
  );
  const fallbackHrefs = new Set(fallbackServices.map(getServiceHref));
  const mergedFallbacks = fallbackServices.map((fallback) => {
    const href = getServiceHref(fallback);
    const provided = providedByHref.get(href);
    return provided ? { ...fallback, ...provided } : fallback;
  });
  const additionalServices = [...providedByHref.entries()]
    .filter(([href]) => !fallbackHrefs.has(href))
    .map(([, service]) => service);

  return [...mergedFallbacks, ...additionalServices];
};

/**
 * Maps legacy Sanity category values to the new 4-tier advisory architecture.
 * This ensures backwards compatibility with existing content.
 */
export const mapCategory = (category?: string): string => {
  if (!category) return "Compliance Support";

  const cat = category.trim();

  // New accurate categories (return as is)
  if (["Tax Strategy", "Financial Control", "Specialized Advisory", "Compliance Support"].includes(cat)) {
    return cat;
  }

  // Map legacy values
  switch (cat) {
    case "Tax":
      return "Tax Strategy";
    case "Bookkeeping":
      return "Financial Control";
    case "CFO":
      return "Specialized Advisory";
    case "Formation":
      return "Tax Strategy";
    default:
      return "Compliance Support";
  }
};
