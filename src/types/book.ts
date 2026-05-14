export interface BookAuthor {
    name: string;
    role: string;
    credentials: string[];
    imageUrl: string;
    bioShort?: string;
}

export interface BookTestimonial {
    _id: string;
    clientName: string;
    clientTitle: string;
    clientCompany: string;
    quote: string;
    rating: number;
    imageUrl?: string;
}

export interface BookSEO {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: {
        asset: { _ref: string };
    };
}

export interface BookRelatedService {
    _id: string;
    title: string;
    slug: { current: string };
    icon?: string;
    shortDescription?: string;
}

export interface BookRelatedProduct {
    _id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    price?: number;
    shortDescription?: string;
    format?: string;
    badge?: string;
    category?: string;
}

export interface BookLearningObjective {
    title: string;
    description: string;
}

export interface Book {
    _id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    imageMetadata?: { lqip?: string };
    price?: number;
    compareAtPrice?: number;
    shortDescription?: string;
    fullDescription?: string;
    format?: string;
    features?: string[];
    badge?: string;
    leadMagnetTag?: string;
    serviceLane?: string;
    pageCount?: number;
    publisher?: string;
    publishDate?: string;
    isbn?: string;
    rating?: number;
    learningObjectives?: BookLearningObjective[];
    author?: BookAuthor;
    featuredTestimonials?: BookTestimonial[];
    seo?: BookSEO;
    relatedServices?: BookRelatedService[];
    relatedProducts?: BookRelatedProduct[];
}
