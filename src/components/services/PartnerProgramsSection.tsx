"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";
import { PartnerProgramCard } from "@/components/services/PartnerProgramCard";

export function PartnerProgramsSection() {
    return (
        <section className="max-w-[90rem] mx-auto px-4 sm:px-6 mb-32">
            <RevealOnScroll>
                <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading px-2 sm:px-0">Specialized Partner Programs</h2>

                {/* Mobile: Swipeable Carousel */}
                <div className="lg:hidden">
                    <SwipeableCarousel
                        showDots={true}
                        showArrows={false}
                        gap={16}
                        slideClassName="w-[340px] max-w-[90vw]"
                    >
                        {/* Construction Card */}
                        <div className="h-full">
                            <PartnerProgramCard
                                title="Construction CFO Partnership"
                                description="Stop bleeding cash on job costing & labor. The 'Hybrid CFO + COO' model for $1M-$10M contractors."
                                icon="HardHat"
                                colorTheme="emerald"
                                stats={[
                                    { value: 400, label: "Avg Savings", prefix: "$", suffix: "K+" },
                                    { value: 95, label: "Retention", suffix: "%" },
                                    { value: 90, label: "To Results", suffix: " Days" },
                                ]}
                                features={[
                                    "Job costing automation",
                                    "Real-time margin tracking",
                                    "Tax strategy optimization",
                                ]}
                                ctaUrl="/vsl/construction"
                                isFeatured={true}
                                backgroundImage="/images/construction-bg.jpg"
                            />
                        </div>

                        {/* Restaurant Card */}
                        <div className="h-full">
                            <PartnerProgramCard
                                title="Restaurant CFO Partnership"
                                description="Stop profit leaks on food cost & labor. The 'Kitchen Command Center' system for $500K-$5M venues."
                                icon="UtensilsCrossed"
                                colorTheme="orange"
                                stats={[
                                    { value: 350, label: "Avg Savings", prefix: "$", suffix: "K+" },
                                    { value: 98, label: "Retention", suffix: "%" },
                                    { value: 90, label: "To Results", suffix: " Days" },
                                ]}
                                features={[
                                    "Inventory & COGS control",
                                    "Real-time P&L visibility",
                                    "Menu pricing strategy",
                                ]}
                                ctaUrl="/vsl/restaurants"
                                backgroundImage="/images/restaurant-bg.jpg"
                            />
                        </div>
                    </SwipeableCarousel>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-8">
                    {/* Construction Card */}
                    <PartnerProgramCard
                        title="Construction CFO Partnership"
                        description="Stop bleeding cash on job costing & labor. The 'Hybrid CFO + COO' model for $1M-$10M contractors."
                        icon="HardHat"
                        colorTheme="emerald"
                        stats={[
                            { value: 400, label: "Avg Savings", prefix: "$", suffix: "K+" },
                            { value: 95, label: "Retention", suffix: "%" },
                            { value: 90, label: "To Results", suffix: " Days" },
                        ]}
                        features={[
                            "Job costing automation",
                            "Real-time margin tracking",
                            "Tax strategy optimization",
                        ]}
                        ctaUrl="/vsl/construction"
                        isFeatured={true}
                        backgroundImage="/images/construction-bg.jpg"
                    />

                    {/* Restaurant Card */}
                    <PartnerProgramCard
                        title="Restaurant CFO Partnership"
                        description="Stop profit leaks on food cost & labor. The 'Kitchen Command Center' system for $500K-$5M venues."
                        icon="UtensilsCrossed"
                        colorTheme="orange"
                        stats={[
                            { value: 350, label: "Avg Savings", prefix: "$", suffix: "K+" },
                            { value: 98, label: "Retention", suffix: "%" },
                            { value: 90, label: "To Results", suffix: " Days" },
                        ]}
                        features={[
                            "Inventory & COGS control",
                            "Real-time P&L visibility",
                            "Menu pricing strategy",
                        ]}
                        ctaUrl="/vsl/restaurants"
                        backgroundImage="/images/restaurant-bg.jpg"
                    />
                </div>

            </RevealOnScroll>
        </section>
    );
}
