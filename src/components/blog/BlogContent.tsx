import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface BlogContentProps {
    value: any;
}

const components = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <figure className="my-10">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || "Post image"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-3 text-center text-sm text-brand-900/60 italic font-sans">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-900 mt-12 mb-6">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-900 mt-10 mb-5">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-bold font-heading text-brand-900 mt-8 mb-4">{children}</h3>,
        normal: ({ children }: any) => <p className="text-lg leading-relaxed text-brand-900 mb-6 font-sans font-normal antialiased">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-8 italic text-xl text-brand-900/80 font-serif bg-slate-50 rounded-r-lg">
                "{children}"
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-brand-900 font-sans">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-brand-900 font-sans">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
        number: ({ children }: any) => <li className="pl-2">{children}</li>,
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="text-gold-600 underline decoration-gold-300 underline-offset-2 hover:text-gold-500 transition-colors font-medium"
                >
                    {children}
                </a>
            );
        },
        strong: ({ children }: any) => <strong className="font-bold text-brand-900 font-heading">{children}</strong>,
    },
};

export function BlogContent({ value }: BlogContentProps) {
    return (
        <div className="prose prose-lg prose-slate max-w-none text-brand-900">
            <PortableText value={value} components={components} />
        </div>
    );
}
