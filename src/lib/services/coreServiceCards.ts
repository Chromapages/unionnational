import { getServiceHref } from "@/components/layout/navigationData";

export interface ServiceCard {
    id: string;
    order: number;
    categoryLabel: string;
    icon: string;
    heading: string;
    description: string;
    exploreLinkLabel: string;
    exploreLinkHref: string;
    isFlagship?: boolean;
}

export interface ServiceCardSource {
    slug?: { current?: string };
    showInOutcomes?: boolean;
    outcomesOrder?: number;
    isFlagship?: boolean;
}

type Translate = (key: string) => string;

type ServiceCardDefinition = Pick<ServiceCard, "id" | "order" | "icon" | "exploreLinkHref" | "isFlagship"> & {
    translationKey: string;
};

const coreServiceCardDefinitions: readonly ServiceCardDefinition[] = [
    { id: "scorp", order: 1, icon: "BadgeDollarSign", exploreLinkHref: "/s-corp-tax-advantage", translationKey: "outcomes.scorp" },
    { id: "taxPlanning", order: 2, icon: "CalendarClock", exploreLinkHref: "/tax-planning", translationKey: "outcomes.taxPlanning" },
    { id: "bookkeeping", order: 3, icon: "BookOpenCheck", exploreLinkHref: "/strategic-bookkeeping", translationKey: "outcomes.bookkeeping" },
    { id: "fractionalCfo", order: 4, icon: "ChartNoAxesCombined", exploreLinkHref: "/fractional-cfo", translationKey: "outcomes.fractionalCfo" },
    { id: "formation", order: 5, icon: "Building2", exploreLinkHref: "/new-business-formation", translationKey: "outcomes.formation" },
    { id: "payroll", order: 6, icon: "FileCheck", exploreLinkHref: "/payroll-services", translationKey: "outcomes.payroll" },
];

export const getCoreServiceCards = (t: Translate, sources: readonly ServiceCardSource[] = []): ServiceCard[] => {
    const sourcesByHref = new Map(sources.map((source) => [getServiceHref(source), source]));

    return coreServiceCardDefinitions
        .map(({ translationKey, ...card }) => {
            const source = sourcesByHref.get(card.exploreLinkHref);

            return {
                ...card,
                order: source?.outcomesOrder ?? card.order,
                categoryLabel: t(`${translationKey}.title`),
                heading: t(`${translationKey}.service`),
                description: t(`${translationKey}.description`),
                exploreLinkLabel: t(`${translationKey}.link`),
                ...(source?.isFlagship ? { isFlagship: true } : {}),
                showInOutcomes: source?.showInOutcomes,
            };
        })
        .filter((card) => card.showInOutcomes !== false)
        .map(({ showInOutcomes: _, ...card }) => card)
        .sort((left, right) => left.order - right.order);
};
