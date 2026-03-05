import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Linkedin } from "lucide-react";

import { extractString } from "@/lib/utils";

interface BlogAuthorCardProps {
    author: any;
    locale: string;
}

export function BlogAuthorCard({ author, locale }: BlogAuthorCardProps) {
    if (!author) return null;

    return (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 my-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {author.image ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                    <Image
                        src={urlFor(author.image).url()}
                        alt={author.name}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="w-20 h-20 rounded-full bg-slate-200 flex-shrink-0" />
            )}

            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-brand-900 font-heading">About the Author</h3>
                        <p className="text-sm font-medium text-gold-600 font-sans">{author.name}, {extractString(author.role, locale)}</p>
                    </div>
                    {author.linkedinUrl && (
                        <Link href={author.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-brand-900/40 hover:text-brand-700 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    )}
                </div>
                {author.description && (
                    <p className="text-sm text-brand-900/70 leading-relaxed font-sans">
                        {author.description}
                    </p>
                )}
            </div>
        </div>
    );
}
