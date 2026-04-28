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
    shortDescription: "Evaluate whether an S-Corp election could reduce your tax burden",
    category: "Tax Strategy",
    isPopular: true,
  },
  {
    title: "Fractional CFO",
    slug: { current: "fractional-cfo" },
    icon: "Briefcase",
    shortDescription: "High-level financial leadership",
    category: "Financial Control",
  },
  {
    title: "Tax Planning Consulting",
    slug: { current: "tax-planning" },
    icon: "Target",
    shortDescription: "Personalized tax-saving strategies",
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
    title: "Tax Filing & Preparation",
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
];

export const getServiceHref = (service: ServiceSummary) => {
  if (service.slug?.current) {
    const slug = service.slug.current;
    
    // Industry Pages
    if (["construction", "restaurants", "real-estate", "e-commerce"].includes(slug)) {
        return `/industries/${slug}`;
    }

    // Root-level High Performance Service Pages
    const rootRoutes = [
        "fractional-cfo",
        "tax-planning",
        "strategic-bookkeeping",
        "new-business-formation",
        "s-corp-tax-advantage"
    ];

    if (rootRoutes.includes(slug)) {
        return `/${slug}`;
    }

    // Special case for Tax Filing
    if (slug === "tax-filing-and-preparation-services") {
        return "/tax-preparation-and-filing";
    }

    return `/services/${slug}`;
  }

  return "/services";
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
