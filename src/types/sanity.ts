import { type SanityDocument } from "sanity";

export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImage;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredDataType?: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

export type LocalizedString = {
  en?: string;
  es?: string;
  [key: string]: string | undefined;
};

export type LocalizedText = LocalizedString;

export interface SanityBlock {
  _type: "block";
  _key: string;
  style?: string;
  children: {
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _key: string;
    _type: string;
    [key: string]: unknown;
  }[];
}

export type LocalizedBlock = {
  en?: SanityBlock[];
  es?: SanityBlock[];
  [key: string]: SanityBlock[] | undefined;
};

export interface ServicePage extends SanityDocument {
  title: string;
  slug: { current: string };
  canonicalPath: string;
  accentColor?: string;
  service?: { _id?: string; catalogSlug?: string };
  hero: {
    eyebrow: string;
    headline: string;
    highlight?: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label?: string; href?: string };
    trustItems?: Array<{ value: string; label: string }>;
    microcopy?: string;
    visual?: {
      type?: "dashboard-mockup" | "image" | "video" | "none";
      image?: SanityImage;
      imageAlt?: string;
      videoUrl?: string;
      videoMimeType?: string;
      videoPoster?: SanityImage;
      videoPosterAlt?: string;
      videoLabel?: string;
      dashboardEyebrow?: string;
      dashboardTitle?: string;
      dashboardStatus?: string;
      dashboardMetrics?: Array<{ label: string; value: string; emphasized?: boolean }>;
    };
  };
  eligibility?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    badge?: string;
    items?: string[];
    primaryGroup?: { heading?: string; items?: string[] };
    secondaryGroup?: { heading?: string; items?: string[] };
    disqualifierHeading?: string;
    disqualifier?: string;
    cta?: { label?: string; href?: string; microcopy?: string };
  };
  comparison: {
    eyebrow?: string;
    heading: string;
    description?: string;
    withoutLabel?: string;
    withLabel?: string;
    pairs: Array<{ category?: string; problem: string; solution: string; outcome?: string }>;
    conclusion?: string;
    linkLabel?: string;
    href?: string;
  };
  process: { eyebrow?: string; heading: string; description?: string; steps: Array<{ title: string; duration?: string; description: string }> };
  included: { eyebrow?: string; heading: string; description?: string; items: string[]; pricing?: { headline?: string; detail?: string } };
  video?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    url?: string;
    poster?: SanityImage;
    posterAlt?: string;
    captionsUrl?: string;
    caption?: string;
  };
  proof?: { eyebrow?: string; heading?: string; quote?: string; attribution?: string; linkLabel?: string; href?: string };
  faqSection: { eyebrow?: string; heading: string; items: Array<{ question: string; answer: string }> };
  closing: { heading: string; description?: string; label: string; href: string };
  seo?: SanitySEO;
}

export interface Service extends SanityDocument {
  title: string;
  slug: { current: string };
  shortDescription: string;
  description: SanityBlock[];
  icon?: string;
  image?: SanityImage;
  order?: number;
  seo?: SanitySEO;
  faq?: Array<{ q: string; a: string; question?: string; answer?: string }>;
  roadmap?: Array<{ title: string; duration?: string; description: string }>;
  eligibilityPros?: string[];
  trustSignals?: string[];
  impactGoal?: string | LocalizedString;
  keyBenefit?: string | LocalizedString;
  fullDescription?: SanityBlock[];
  videoFileUrlEn?: string;
  videoFileUrlEs?: string;
  videoFileUrl?: string;
  videoUrlEn?: string;
  videoUrlEs?: string;
  videoThumbnailEn?: SanityImage;
  videoThumbnailEs?: SanityImage;
  videoThumbnail?: SanityImage;
  startingPrice?: string;
  targetAudience?: string;
  targetKeyword?: string;
  category?: string;
  accentColor?: string;
  strategyVideoUrl?: string;
  heroHeadline?: string;
  heroHighlight?: string;
  heroCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; anchorTarget?: string };
  heroTrustStats?: Array<{ value: string; label: string }>;
  heroMicrocopy?: string;
  heroVisual?: {
    type?: "dashboard-mockup" | "image" | "video" | "none";
    image?: SanityImage;
    videoUrl?: string;
    videoMimeType?: string;
    videoPoster?: SanityImage;
    videoPosterAlt?: string;
    videoLabel?: string;
    dashboardEyebrow?: string;
    dashboardTitle?: string;
    dashboardStatus?: string;
    dashboardMetrics?: Array<{ label: string; value: string; emphasized?: boolean }>;
  };
  features?: string[];
  schema_faq?: Array<{ question: string; answer: string }>;
  pageSections?: {
    eligibility?: { eyebrow?: string; heading?: string; description?: string };
    comparison?: {
      eyebrow?: string;
      heading?: string;
      description?: string;
      withoutLabel?: string;
      withLabel?: string;
      pairs?: Array<{ problem: string; solution: string }>;
    };
    process?: { eyebrow?: string; heading?: string; description?: string };
    included?: { eyebrow?: string; heading?: string; description?: string };
    pricing?: { headline?: string; detail?: string };
    video?: { eyebrow?: string; heading?: string };
    proof?: { eyebrow?: string; heading?: string; quote?: string; attribution?: string; linkLabel?: string; href?: string };
    faq?: { eyebrow?: string; heading?: string };
    closing?: { heading?: string; description?: string; label?: string; href?: string };
  };
}

export interface TeamMember extends SanityDocument {
  name: string;
  slug: { current: string };
  role: string;
  credentials?: string;
  description?: string;
  image: SanityImage;
  isFounder?: boolean;
  linkedinUrl?: string;
  email?: string;
  displayOrder?: number;
  tags?: string[];
  bioShort?: string;
  socialHandles?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  certifications?: string[];
}

export interface TeamPageSettings extends SanityDocument {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  founderSectionTitle?: string;
  teamSectionTitle?: string;
  teamSectionSubtitle?: string;
  hiringBadge?: string;
  hiringTitle?: string;
  hiringDescription?: string;
  hiringBenefits?: string[];
  hiringCtaText?: string;
  hiringCtaUrl?: string;
  hiringImage?: SanityImage;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

export interface PlaybookChapter extends SanityDocument {
  title: string;
  slug: { current: string };
  chapterNumber: number;
  content: SanityBlock[];
  summary?: string;
  estimatedReadTime?: number;
  videoEmbed?: string;
  videoThumbnail?: SanityImage;
  isGated?: boolean;
  gatedContent?: SanityBlock[];
  keyTakeaways?: string[];
  tools?: string[];
}

export interface Playbook extends SanityDocument {
  title: string;
  slug: { current: string };
  description: string;
  coverImage?: SanityImage;
  chapters?: PlaybookChapter[];
  author?: TeamMember;
  gatedPdfUrl?: string;
}

export interface IndustryVertical extends SanityDocument {
  title: string;
  slug: { current: string };
  description: string;
  heroImage?: SanityImage;
  heroVideo?: string;
  painPoints?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  clientTestimonials?: {
    _id: string;
    clientName: string;
    clientTitle?: string;
    quote: string;
    rating?: number;
    clientCompany?: string;
  }[];
  featuredPlaybookChapters?: PlaybookChapter[];
  relatedPlaybooks?: Playbook[];
}

export interface SanityBlogPostCategory {
  title: string;
  slug: string;
}

export interface SanityBlogPostAuthor {
  name: string;
  role?: string;
  description?: string;
  linkedinUrl?: string;
  image?: SanityImage;
}

export interface SanityBlogPost extends SanityDocument {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  publishedAt?: string;
  readingTime?: number;
  isFeatured?: boolean;
  featuredImage?: SanityImage & { asset: { url?: string } };
  categories?: SanityBlogPostCategory[];
  author?: SanityBlogPostAuthor;
}
