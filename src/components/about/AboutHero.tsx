import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

interface AboutHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
}

export function AboutHero({ title, subtitle, badge }: AboutHeroProps) {
    return (
        <InnerPageHeader
            eyebrow={badge || "About Union National Tax"}
            title={title || "The Architects of Modern Wealth."}
            description={subtitle || "Union National Tax bridges the gap between complex IRS regulations and the agile needs of modern consultants, creators, and agencies."}
        />
    );
}
