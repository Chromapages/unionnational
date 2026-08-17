"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface FooterNavigationLink {
    href: string;
    label: string;
    emphasized?: boolean;
}

export interface FooterNavigationGroup {
    title: string;
    links: FooterNavigationLink[];
}

interface FooterNavigationProps {
    groups: FooterNavigationGroup[];
    navigationLabel: string;
}

function FooterLinkList({ links }: { links: FooterNavigationLink[] }) {
    return (
        <ul className="space-y-1.5">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`inline-flex min-h-10 items-center text-sm leading-snug underline-offset-4 transition-colors hover:text-gold-400 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
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

function MobileFooterGroup({ group, index }: { group: FooterNavigationGroup; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [visuallyOpen, setVisuallyOpen] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const baseId = `footer-navigation-${index}`;
    const triggerId = `${baseId}-trigger`;
    const panelId = `${baseId}-panel`;

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
                    className={`flex min-h-11 w-full items-center justify-between gap-4 rounded-sm px-2 py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none ${
                        expanded ? "bg-white/[0.05] text-gold-300" : "text-white"
                    }`}
                    onClick={() => {
                        if (expanded) closePanel();
                        else openPanel();
                    }}
                >
                    <span>{group.title}</span>
                    <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-200 ease-out motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
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
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    visuallyOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 overflow-hidden pb-4 pl-1">
                    <FooterLinkList links={group.links} />
                </div>
            </div>
        </section>
    );
}

export function FooterNavigation({ groups, navigationLabel }: FooterNavigationProps) {
    return (
        <nav aria-label={navigationLabel} className="lg:col-span-8">
            <div
                data-testid="footer-desktop-navigation"
                className="hidden grid-cols-4 gap-x-6 md:grid"
            >
                {groups.map((group, index) => {
                    const headingId = `footer-desktop-group-${index}`;
                    return (
                        <section key={group.title} aria-labelledby={headingId}>
                            <h2 id={headingId} className="home-eyebrow mb-4 text-white">
                                {group.title}
                            </h2>
                            <FooterLinkList links={group.links} />
                        </section>
                    );
                })}
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10 md:hidden">
                {groups.map((group, index) => (
                    <MobileFooterGroup key={group.title} group={group} index={index} />
                ))}
            </div>
        </nav>
    );
}
