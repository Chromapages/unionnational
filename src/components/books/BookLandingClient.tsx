"use client";

import { motion } from "framer-motion";
import { Book } from "@/types/book";
import { BookHero } from "./BookHero";
import { LearningObjectives } from "@/components/shop/LearningObjectives";
import { AuthorBio } from "@/components/shop/AuthorBio";
import { TestimonialWall } from "@/components/shop/TestimonialWall";
import { RelatedServices } from "@/components/services/RelatedServices";
import { BookLeadForm } from "./BookLeadForm";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface BookLandingClientProps {
    book: Book;
}

export default function BookLandingClient({ book }: BookLandingClientProps) {
    return (
        <div className="flex flex-col">

            {/* Hero Section */}
            <BookHero book={book} />

            {/* Social Proof Bar */}
            <section className="bg-slate-50 border-b border-slate-200 py-8">
                <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-center">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl lg:text-3xl font-bold text-brand-900 font-heading">500+</span>
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Business Owners</span>
                        </div>
                        <div className="w-px h-10 bg-slate-200 hidden lg:block" />
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl lg:text-3xl font-bold text-brand-900 font-heading">{book.rating || 5}.0</span>
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Reader Rating</span>
                        </div>
                        <div className="w-px h-10 bg-slate-200 hidden lg:block" />
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl lg:text-3xl font-bold text-brand-900 font-heading">
                                {book.pageCount ? `${book.pageCount} pp` : "—"}
                            </span>
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pages</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Book Overview */}
            {book.shortDescription && (
                <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                        <RevealOnScroll>
                            <div className="max-w-3xl mx-auto text-center mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 font-heading tracking-tight mb-6">
                                    Who Is This Book For?
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {book.shortDescription}
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            )}

            {/* What You'll Learn */}
            {book.learningObjectives && book.learningObjectives.length > 0 && (
                <LearningObjectives objectives={book.learningObjectives} />
            )}

            {/* Author Bio */}
            {book.author && (
                <AuthorBio author={book.author} />
            )}

            {/* Testimonials */}
            {book.featuredTestimonials && book.featuredTestimonials.length > 0 && (
                <TestimonialWall testimonials={book.featuredTestimonials} />
            )}

            {/* Lead Capture Form */}
            <section id="get-copy" className="py-16 lg:py-20 bg-slate-50 scroll-mt-24">
                <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <RevealOnScroll>
                            <div className="max-w-xl">
                                <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 font-heading tracking-tight mb-6">
                                    Get Your Free Copy Today
                                </h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    Join thousands of business owners who have gained clarity on their tax strategy.
                                    Enter your details and we&apos;ll send the book directly to your inbox.
                                </p>

                                {/* Book meta */}
                                <div className="space-y-3 text-sm text-slate-500">
                                    {book.author?.name && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                            <span>By {book.author.name}</span>
                                        </div>
                                    )}
                                    {book.pageCount && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                            <span>{book.pageCount} pages of actionable strategy</span>
                                        </div>
                                    )}
                                    {book.publisher && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                            <span>Published by {book.publisher}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </RevealOnScroll>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <BookLeadForm
                                bookSlug={book.slug}
                                leadMagnetTag={book.leadMagnetTag}
                                serviceLane={book.serviceLane}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {book.relatedServices && book.relatedServices.length > 0 && (
                <section className="py-16 lg:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                        <RelatedServices services={book.relatedServices} />
                    </div>
                </section>
            )}

        </div>
    );
}
