import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string; // e.g., '/blog' or '/blog/category/strategy'
}

export function BlogPagination({ currentPage, totalPages, basePath }: BlogPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {currentPage > 1 ? (
                <Link
                    href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
                    className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-200 text-brand-900 hover:border-gold-500 hover:text-gold-600 transition-all bg-white"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
            ) : (
                <span className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50">
                    <ChevronLeft className="w-5 h-5" />
                </span>
            )}

            <div className="flex items-center gap-1 font-sans text-sm font-medium">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={page === 1 ? basePath : `${basePath}?page=${page}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-md transition-all ${currentPage === page
                                ? "bg-brand-900 text-white shadow-md border border-brand-900"
                                : "bg-white text-brand-900 border border-slate-200 hover:border-gold-500 hover:text-gold-600"
                            }`}
                    >
                        {page}
                    </Link>
                ))}
            </div>

            {currentPage < totalPages ? (
                <Link
                    href={`${basePath}?page=${currentPage + 1}`}
                    className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-200 text-brand-900 hover:border-gold-500 hover:text-gold-600 transition-all bg-white"
                >
                    <ChevronRight className="w-5 h-5" />
                </Link>
            ) : (
                <span className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50">
                    <ChevronRight className="w-5 h-5" />
                </span>
            )}
        </div>
    );
}
