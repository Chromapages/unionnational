import { CheckCircle2 } from "lucide-react";

// Define strict types matching the Sanity query
interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    price?: string;
    billingPeriod?: string;
    features?: string[];
    tagline?: string;
}

interface OptionalServicesProps {
    tiers: PricingTier[];
}

export function OptionalServices({ tiers }: OptionalServicesProps) {
    // Filter for Optional tiers
    const optionalServices = tiers?.filter(t => t.category === "optional") || [];

    if (optionalServices.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-6 mt-24 pb-24">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-brand-900 font-heading mb-3">Additional Services</h2>
                <p className="text-brand-900/60 max-w-2xl mx-auto text-sm">
                    Specialized add-ons to complete your financial infrastructure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {optionalServices.map((service) => (
                    <div
                        key={service._id}
                        className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-brand-900 text-lg group-hover:text-gold-600 transition-colors">
                                {service.name}
                            </h3>
                            <div className="text-right">
                                <span className="block font-bold text-brand-900">{service.price}</span>
                                {service.billingPeriod && (
                                    <span className="text-[10px] text-brand-900/40 uppercase font-bold">/{service.billingPeriod}</span>
                                )}
                            </div>
                        </div>

                        {service.tagline && (
                            <p className="text-sm text-brand-900/60 mb-4 pb-4 border-b border-brand-900/5">
                                {service.tagline}
                            </p>
                        )}

                        {service.features && service.features.length > 0 && (
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-brand-900/70">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
