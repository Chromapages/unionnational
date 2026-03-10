"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialData {
  quote: string;
  name?: string;
  author?: string;
  company?: string;
  rating?: number;
  industryBadge?: string;
  beforeAfterMetric?: string;
  authorImage?: { asset: { url: string } };
}

interface VSLTestimonialProps {
  testimonial?: TestimonialData;
}

export function VSLTestimonial({ testimonial }: VSLTestimonialProps) {
  const defaultTestimonial: TestimonialData = {
    quote: "Implementing this system changed my business overnight. We stopped guessing and started growing with complete visibility into our margins.",
    name: "John D.",
    company: "Standard Group",
    rating: 5,
    industryBadge: "Construction Partner",
    beforeAfterMetric: "Saved $47k in 6 months",
  };

  const data = testimonial?.quote ? testimonial : defaultTestimonial;
  const authorName = data.name || data.author || "Client";

  return (
    <section className="py-20 md:py-32 bg-white flex justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-slate-50 p-10 md:p-16 rounded-[40px] shadow-sm border border-slate-100"
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-brand-900 text-gold-500 flex items-center justify-center shadow-xl">
            <Quote className="w-8 h-8 fill-current" />
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {[...Array(data.rating || 5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-gold-500 text-gold-500" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-bold text-brand-900 mb-10 leading-tight">
              &quot;{data.quote}&quot;
            </blockquote>

            {/* Author / Info */}
            <div className="flex flex-col md:flex-row items-center gap-6 pt-8 border-t border-slate-200">
              {data.authorImage?.asset?.url && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold-500 shadow-md">
                  <Image
                    src={data.authorImage.asset.url}
                    alt={authorName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="text-left">
                <p className="text-xl font-black text-brand-900 font-heading">
                  {authorName}
                </p>
                <p className="text-slate-500 font-medium">
                  {data.company} {data.industryBadge && `— ${data.industryBadge}`}
                </p>
              </div>

              {data.beforeAfterMetric && (
                <div className="px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {data.beforeAfterMetric}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
