import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { buildHeadingId, HeadingItem } from "./richTextUtils";

interface RichTextProps {
    value: any;
    headings?: HeadingItem[];
}

const getPlainText = (value: any) =>
    value?.children?.map((child: any) => child.text).join("").trim() || "";

export function RichText({ value, headings = [] }: RichTextProps) {
    let headingIndex = 0;
    const slugCounts = new Map<string, number>();

    const components = {
        types: {
            image: ({ value: imageValue }: any) => {
                if (!imageValue?.asset?._ref) {
                    return null;
                }
                return (
                    <figure className="my-12">
                        <div className="relative w-full overflow-hidden rounded-2xl border border-brand-100/60 shadow-soft-green aspect-[16/9]">
                            <Image
                                src={urlFor(imageValue).url()}
                                alt={imageValue.alt || "Post image"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {imageValue.caption && (
                            <figcaption className="mt-4 text-center text-sm text-brand-900/60 font-sans italic">
                                {imageValue.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            },
        },
        block: {
            h1: ({ children }: any) => (
                <h1 className="mt-12 text-3xl font-semibold text-brand-900 font-heading md:text-4xl">
                    {children}
                </h1>
            ),
            h2: ({ children, value: headingValue }: any) => {
                const fallbackText = getPlainText(headingValue);
                const id = headings[headingIndex]?.id || buildHeadingId(fallbackText, slugCounts);
                headingIndex += 1;
                return (
                    <h2
                        id={id}
                        className="scroll-mt-32 mt-12 text-2xl font-semibold text-brand-900 font-heading md:text-3xl"
                    >
                        {children}
                    </h2>
                );
            },
            h3: ({ children, value: headingValue }: any) => {
                const fallbackText = getPlainText(headingValue);
                const id = headings[headingIndex]?.id || buildHeadingId(fallbackText, slugCounts);
                headingIndex += 1;
                return (
                    <h3
                        id={id}
                        className="scroll-mt-32 mt-10 text-xl font-semibold text-brand-900 font-heading md:text-2xl"
                    >
                        {children}
                    </h3>
                );
            },
            normal: ({ children }: any) => (
                <p className="text-lg leading-relaxed text-brand-900/80 font-sans">
                    {children}
                </p>
            ),
            blockquote: ({ children }: any) => (
                <blockquote className="my-10 rounded-2xl border border-gold-200/60 bg-gold-50/60 px-8 py-6 text-lg font-medium text-brand-900/80 font-sans shadow-sm">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }: any) => (
                <ul className="space-y-3 pl-6 text-lg text-brand-900/80 font-sans list-disc">
                    {children}
                </ul>
            ),
            number: ({ children }: any) => (
                <ol className="space-y-3 pl-6 text-lg text-brand-900/80 font-sans list-decimal">
                    {children}
                </ol>
            ),
        },
        listItem: {
            bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
            number: ({ children }: any) => <li className="pl-2">{children}</li>,
        },
        marks: {
            link: ({ children, value: linkValue }: any) => {
                const rel = !linkValue.href.startsWith("/") ? "noreferrer noopener" : undefined;
                return (
                    <a
                        href={linkValue.href}
                        rel={rel}
                        className="font-semibold text-gold-600 underline decoration-gold-300 underline-offset-4 transition-colors hover:text-gold-500"
                    >
                        {children}
                    </a>
                );
            },
            strong: ({ children }: any) => (
                <strong className="font-semibold text-brand-900">{children}</strong>
            ),
        },
    };

    return (
        <div className="space-y-7">
            <PortableText value={value} components={components} />
        </div>
    );
}
