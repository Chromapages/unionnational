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
    category: "Advisory",
    isPopular: true,
  },
  {
    title: "Fractional CFO",
    slug: { current: "fractional-cfo" },
    icon: "Briefcase",
    shortDescription: "High-level financial leadership",
    category: "Advisory",
  },
  {
    title: "Tax Planning Consulting",
    slug: { current: "tax-planning" },
    icon: "Target",
    shortDescription: "Personalized tax-saving strategies",
    category: "Advisory",
  },
  {
    title: "Strategic Bookkeeping",
    slug: { current: "strategic-bookkeeping" },
    icon: "Calculator",
    shortDescription: "Detailed records for cash flow & decisions",
    category: "Support",
  },
  {
    title: "Tax Filing & Preparation",
    slug: { current: "tax-filing-and-preparation-services" },
    icon: "FileText",
    shortDescription: "Accurate, compliant, optimized filing",
    category: "Support",
  },
  {
    title: "New Business Formation",
    slug: { current: "new-business-formation" },
    icon: "Building2",
    shortDescription: "Smart entity structure guidance",
    category: "Support",
  },
];

export const getServiceHref = (service: ServiceSummary) => {
  if (service.slug?.current) {
    return `/services/${service.slug.current}`;
  }

  return "/services";
};
