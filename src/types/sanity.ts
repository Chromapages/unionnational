import { type SanityDocument } from "sanity";

export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImage;
  keywords?: string[];
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
  roadmap?: Array<{ stepNumber: string; title: string; description: string }>;
  eligibilityPros?: string[];
  eligibilityCons?: string[];
  comparisonPoints?: Array<{ feature: string; diy?: string; bigFirm?: string; unionNational?: string }>;
  trustSignals?: string[];
  impactGoal?: string | LocalizedString;
  problemAgitation?: { title: string; description: string };
  badge?: string;
  keyBenefit?: string | LocalizedString;
  eligibility?: string | LocalizedString;
  fullDescription?: SanityBlock[];
  videoFileUrl?: string;
  videoThumbnail?: SanityImage;
  startingPrice?: string;
  targetAudience?: string;
  features?: string[];
  whyChooseUsTitle?: string;
  whyChooseUsDescription?: string;
  schema_faq?: Array<{ question: string; answer: string }>;
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
