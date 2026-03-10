"use client";

import React from "react";
import { VSLHero } from "./VSLHero";
import { VSLMetricsBar } from "./VSLMetricsBar";
import { VSLProblemStatement } from "./VSLProblemStatement";
import { VSLHowItWorks } from "./VSLHowItWorks";
import { VSLClientResults } from "./VSLClientResults";
import { VSLTestimonial } from "./VSLTestimonial";
import { VSLFaq } from "./VSLFaq";
import { VSLFinalCta } from "./VSLFinalCta";
import { VSLMobileStickyBar } from "./VSLMobileStickyBar";

export interface VSLTemplateData {
  badge?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  videoFile?: {
    asset?: {
      url?: string;
    };
  };
  announcementText?: string;
  trustStats?: { value: string; label: string }[];
  painPoints?: { text: string }[];
  howItWorks?: { title: string; description: string; icon: string }[];
  results?: { value: string; label: string }[];
  testimonial?: {
    quote: string;
    name: string;
    company: string;
    rating?: number;
    industryBadge?: string;
    beforeAfterMetric?: string;
    beforeVal?: string;
    afterVal?: string;
    authorImage?: { asset: { url: string } };
  };
  faqs?: { question: string; answer: string }[];
  finalCtaHeadline?: string;
  finalCtaSubtext?: string;
  // Fallbacks for legacy fields
  resultsTitle?: string;
  resultsSubheadline?: string;
}

interface UnifiedVSLTemplateProps {
  data: any; // We use any here to handle raw sanity data before type-safe mapping
  industry: "construction" | "restaurants" | "real-estate" | "tax-resolution";
}

export function UnifiedVSLTemplate({ data, industry }: UnifiedVSLTemplateProps) {
  // Ensure we have current month for dynamic elements
  const [currentMonth, setCurrentMonth] = React.useState("This Month");
  React.useEffect(() => {
    setCurrentMonth(new Date().toLocaleString("default", { month: "long", year: "numeric" }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050A14]">
      {/* 1. Hero Section */}
      <VSLHero
        badge={data?.heroBadge || data?.badge}
        headline={data?.heroHeadline}
        subheadline={data?.heroSubheadline}
        videoUrl={data?.videoFile?.asset?.url}
        ctaText={data?.heroCtaText}
        ctaUrl={data?.heroCtaUrl}
        month={currentMonth}
      />

      {/* 2. Metrics / Trust Bar */}
      <VSLMetricsBar stats={data?.trustStats} />

      {/* 3. Problem / Pain Points */}
      <VSLProblemStatement industry={industry} />

      {/* 4. How It Works */}
      <VSLHowItWorks steps={data?.howItWorks} />

      {/* 5. Proven Results Grid */}
      <VSLClientResults />

      {/* 6. Featured Testimonial */}
      <VSLTestimonial testimonial={data?.testimonial} />

      {/* 7. FAQ Section */}
      <VSLFaq faqs={data?.faqs} />

      {/* 8. Final CTA Section */}
      <VSLFinalCta
        headline={data?.finalCtaHeadline}
        subtext={data?.finalCtaSubtext}
        industry={industry}
      />

      {/* 10. Footer Mobile Sticky CTA */}
      <VSLMobileStickyBar ctaText={data?.heroCtaText || "Get Started"} ctaUrl={data?.heroCtaUrl || "/apply"} />
    </div>
  );
}
