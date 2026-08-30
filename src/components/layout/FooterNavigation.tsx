"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { trackFooterInteraction } from "@/lib/analytics/footerInteractions";

export interface FooterNavigationLink {
    href: string;
    label: string;
    emphasized?: boolean;
    analyticsEvent?: string;
    destinationId?: string;
    preserveCampaign?: boolean;
}

export interface FooterNavigationGroup {
    id?: string;
    title: string;
    links: FooterNavigationLink[];
}

interface FooterNavigationProps {
    groups: FooterNavigationGroup[];
    navigationLabel: string;
}

function FooterLinkList({ links, campaignSearch, categoryId }: { links: FooterNavigationLink[]; campaignSearch: string; categoryId: string }) {
    return (
        <ul className="space-y-1">
            {links.map((link) => (
                <li key={link.href} className={link.emphasized ? "mt-2 border-t border-white/10 pt-2" : undefined}>
                    <Link
                        href={link.preserveCampaign && campaignSearch ? `${link.href}?${campaignSearch}` : link.href}
                        data-footer-event={link.analyticsEvent || "footer_navigation_item_navigate"}
                        data-footer-destination-id={link.destinationId || link.href}
                        data-footer-category-id={categoryId}
                        className={`inline-flex min-h-11 min-w-0 items-center text-pretty text-sm leading-snug underline-offset-4 transition-colors duration-150 hover:text-gold-400 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none ${
                            link.emphasized ? "font-semibold text-gold-400" : "text-zinc-300"
                        }`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function MobileFooterGroup({ group, index, campaignSearch }: { group: FooterNavigationGroup; index: number; campaignSearch: string }) {
    const [expanded, setExpanded] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [visuallyOpen, setVisuallyOpen] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const baseId = `footer-navigation-${index}`;
    const triggerId = `${baseId}-trigger`;
    const panelId = `${baseId}-panel`;
    const categoryId = group.id || `footer_group_${index}`;

    const cancelPendingFrame = () => {
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    useEffect(() => () => {
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current);
        }
    }, []);

    const openPanel = () => {
        cancelPendingFrame();
        setExpanded(true);
        setRendered(true);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisuallyOpen(true);
            return;
        }

        animationFrameRef.current = window.requestAnimationFrame(() => {
            animationFrameRef.current = null;
            setVisuallyOpen(true);
        });
    };

    const closePanel = () => {
        cancelPendingFrame();
        setExpanded(false);
        setVisuallyOpen(false);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setRendered(false);
        }
    };

    const panelIsInactive = !expanded;

    return (
        <section aria-labelledby={triggerId}>
            <h2>
                <button
                    id={triggerId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    className={`flex min-h-12 w-full items-center justify-between gap-4 rounded-sm px-2 py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none ${
                        expanded ? "bg-white/[0.08] text-gold-300" : "text-white hover:bg-white/[0.04]"
                    }`}
                    onClick={() => {
                        if (expanded) closePanel();
                        else {
                            trackFooterInteraction("footer_navigation_group_expand", categoryId, categoryId);
                            openPanel();
                        }
                    }}
                >
                    <span className="min-w-0 break-words">{group.title}</span>
                    <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-150 ease-out motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
                    />
                </button>
            </h2>

            <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={panelIsInactive ? true : undefined}
                inert={panelIsInactive ? true : undefined}
                hidden={!rendered}
                onTransitionEnd={(event) => {
                    if (
                        event.target === event.currentTarget &&
                        event.propertyName === "grid-template-rows" &&
                        !expanded
                    ) {
                        setRendered(false);
                    }
                }}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-150 ease-out motion-reduce:transition-none ${
                    visuallyOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 overflow-hidden px-2 pt-2 pb-4">
                    <FooterLinkList links={group.links} campaignSearch={campaignSearch} categoryId={categoryId} />
                </div>
            </div>
        </section>
    );
}

export function FooterNavigation({ groups, navigationLabel }: FooterNavigationProps) {
    const [campaignSearch, setCampaignSearch] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const campaignParams = new URLSearchParams();
        for (const [key, value] of params) {
            if (key.startsWith("utm_") || key === "gclid" || key === "fbclid") campaignParams.set(key, value);
        }
        setCampaignSearch(campaignParams.toString());
    }, []);

    return (
        <nav aria-label={navigationLabel} className="min-w-0">
            <div
                data-testid="footer-desktop-navigation"
                className="hidden items-start gap-x-8 lg:grid lg:grid-cols-[repeat(4,minmax(8rem,1fr))]"
            >
                {groups.map((group, index) => {
                    const headingId = `footer-desktop-group-${index}`;
                    const categoryId = group.id || `footer_group_${index}`;
                    return (
                        <section key={group.title} aria-labelledby={headingId} className="min-w-0">
                            <h2 id={headingId} className="home-eyebrow mb-3 text-pretty text-white">
                                {group.title}
                            </h2>
                            <FooterLinkList links={group.links} campaignSearch={campaignSearch} categoryId={categoryId} />
                        </section>
                    );
                })}
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10 lg:hidden">
                {groups.map((group, index) => (
                    <MobileFooterGroup key={group.title} group={group} index={index} campaignSearch={campaignSearch} />
                ))}
            </div>
        </nav>
    );
}
