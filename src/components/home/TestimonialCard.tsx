import { useState } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronRight } from 'lucide-react';
import { TestimonialModal } from '@/components/ui/TestimonialModal';

interface TestimonialCardProps {
    testimonial: {
        _id: string;
        quote: string;
        clientName: string;
        clientTitle?: string;
        clientCompany?: string;
        rating: number;
        image?: {
            asset?: {
                url: string;
            };
        };
    };
    index: number;
    className?: string;
}

const truncateText = (
    text: string,
    maxLength: number = 200
): { truncated: string; isTruncated: boolean } => {
    if (text.length <= maxLength) {
        return { truncated: text, isTruncated: false };
    }

    // Find last space before maxLength to avoid cutting mid-word
    const lastSpace = text.lastIndexOf(' ', maxLength);
    const cutPoint = lastSpace > 0 ? lastSpace : maxLength;

    return {
        truncated: text.substring(0, cutPoint) + '...',
        isTruncated: true,
    };
};

export const TestimonialCard = ({ testimonial, index, className = "" }: TestimonialCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { truncated, isTruncated } = truncateText(testimonial.quote);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`h-full bg-brand-800/30 border border-brand-700/50 p-8 rounded-xl backdrop-blur-sm hover:border-gold-500/30 transition-all duration-300 group flex flex-col ${className}`}>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating
                                ? 'text-gold-500 fill-gold-500'
                                : 'text-brand-700'
                                }`}
                        />
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-300 leading-relaxed mb-4 flex-1 font-sans italic relative">
                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-gold-500/10 rotate-180" />
                    "{truncated}"
                </blockquote>

                {/* Read More Button */}
                {isTruncated && (
                    <button
                        type="button"
                        onClick={handleOpenModal}
                        className="inline-flex items-center gap-1 text-gold-500 hover:text-gold-400 transition-colors duration-200 text-sm font-medium mb-4 group/btn w-fit"
                    >
                        Read More
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                )}

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-brand-700/50">
                    {testimonial.image?.asset?.url ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-600">
                            <Image
                                src={testimonial.image.asset.url}
                                alt={testimonial.clientName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center text-gold-500 font-bold border border-brand-600">
                            {testimonial.clientName.charAt(0)}
                        </div>
                    )}
                    <div>
                        <div className="font-bold text-white text-sm font-heading tracking-wide">
                            {testimonial.clientName}
                        </div>
                        <div className="text-xs text-brand-300 font-sans">
                            {testimonial.clientTitle}
                            {testimonial.clientTitle && testimonial.clientCompany && ', '}
                            {testimonial.clientCompany}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <TestimonialModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                testimonial={testimonial}
            />
        </>
    );
};
