import { InnerPageHeader } from "@/components/layout/InnerPageHeader";

interface TeamHeroProps {
    badge?: string;
    title?: string;
    subtitle?: string;
}

export const TeamHero = ({
    badge = "Our Team",
    title = "The Strategists Behind the Numbers",
    subtitle = "A collective of high-impact tax professionals and financial architects dedicated to your growth."
}: TeamHeroProps) => {
    return (
        <InnerPageHeader eyebrow={badge} title={title} description={subtitle} />
    );
};
