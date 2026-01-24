"use client";

import { ProductCard } from "./ProductCard";

interface ProductGridProps {
    products: any[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (!products || products.length === 0) return null;

    return (
        <section id="browse" className="max-w-7xl mx-auto px-6 mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-brand-900 tracking-tight font-heading">
                    MasterClass Resources
                </h2>
                <p className="text-brand-900 mt-4 text-sm font-sans max-w-2xl mx-auto">
                    Tools, templates, and guides to help you optimize your business and save on taxes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        title={product.title}
                        slug={product.slug}
                        coverImage={product.imageUrl}
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                        shortDescription={product.shortDescription}
                        format={product.format}
                        buyLink={product.buyLink}
                        badge={product.badge}
                        rating={product.rating}
                        category={product.category}
                    />
                ))}
            </div>
        </section>
    );
}
