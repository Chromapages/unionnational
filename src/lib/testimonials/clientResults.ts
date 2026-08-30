export type CaseStudyResult = {
    id: string;
    format: "case-study";
    order: number;
    eyebrowLabel: string;
    before: string;
    after: string;
    outcome: string;
    name: string;
    role?: string;
    company?: string;
    isVerified?: boolean;
};

export type QuoteResult = {
    id: string;
    format: "quote";
    order: number;
    quoteText: string;
    name: string;
    role?: string;
    company?: string;
    isVerified?: boolean;
};

export type ClientResult = CaseStudyResult | QuoteResult;

export type ClientResultSource = {
    _id?: string;
    format?: "case-study" | "quote";
    displayOrder?: number;
    isFeatured?: boolean;
    eyebrowLabel?: string;
    before?: string;
    after?: string;
    outcome?: string;
    quote?: string;
    clientName?: string;
    clientTitle?: string;
    clientCompany?: string;
    verifiedClient?: boolean;
};

type Translate = (key: string) => string;

const hasText = (value?: string) => Boolean(value?.trim());

export const validateQuoteAttribution = (source: Pick<ClientResultSource, "clientTitle" | "clientCompany" | "verifiedClient">) =>
    (hasText(source.clientTitle) && hasText(source.clientCompany)) || source.verifiedClient === true;

const fallbackFeaturedCaseStudy = (t: Translate): CaseStudyResult => ({
    id: "michael-torres",
    format: "case-study",
    order: 1,
    eyebrowLabel: t("featuredResult"),
    before: "Reactive tax filing and an unclear entity structure.",
    after: "An S-Corp plan and proactive quarterly strategy.",
    outcome: "Clearer tax decisions and a defined path to reduce avoidable burden.",
    name: "Michael Torres",
    company: "Torres Built Construction",
    isVerified: true,
});

const isCompleteCaseStudy = (source: ClientResultSource) =>
    hasText(source.clientName) && hasText(source.before) && hasText(source.after) && hasText(source.outcome);

export const getClientResults = (t: Translate, sources: readonly ClientResultSource[] = []): ClientResult[] => {
    const caseStudies = sources
        .filter((source) => source.format === "case-study" && isCompleteCaseStudy(source))
        .map<CaseStudyResult>((source) => ({
            id: source._id || source.clientName!,
            format: "case-study",
            order: source.displayOrder ?? Number.MAX_SAFE_INTEGER,
            eyebrowLabel: source.eyebrowLabel || t("featuredResult"),
            before: source.before!,
            after: source.after!,
            outcome: source.outcome!,
            name: source.clientName!,
            role: source.clientTitle,
            company: source.clientCompany,
            isVerified: source.verifiedClient,
        }))
        .sort((left, right) => Number(right.isVerified) - Number(left.isVerified) || left.order - right.order);

    const featuredCaseStudy = caseStudies.find((caseStudy) => sources.find((source) => source._id === caseStudy.id)?.isFeatured) || caseStudies[0] || fallbackFeaturedCaseStudy(t);

    const quotes = sources
        .filter((source) => source.format !== "case-study" && hasText(source.quote) && hasText(source.clientName) && validateQuoteAttribution(source))
        .map<QuoteResult>((source) => ({
            id: source._id || source.clientName!,
            format: "quote",
            order: source.displayOrder ?? Number.MAX_SAFE_INTEGER,
            quoteText: source.quote!,
            name: source.clientName!,
            role: source.clientTitle,
            company: source.clientCompany,
            isVerified: source.verifiedClient,
        }))
        .sort((left, right) => left.order - right.order);

    return [featuredCaseStudy, ...quotes];
};
