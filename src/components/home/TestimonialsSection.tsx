type Testimonial = {
    _id?: string;
    quote?: string;
    clientName?: string;
    clientTitle?: string;
    clientCompany?: string;
};

export function TestimonialsSection({ testimonials = [] }: { testimonials?: Testimonial[] }) {
    const relevantTestimonials = testimonials
        .filter((item) => item.quote)
        .sort((a, b) => {
            const score = (item: Testimonial) => /contractor|construction|s-corp|savings|proactive|strategy/i.test(`${item.quote} ${item.clientTitle} ${item.clientCompany}`) ? 1 : 0;
            return score(b) - score(a);
        })
        .slice(0, 2);

    return (
        <section className="bg-slate-50 py-20 sm:py-24" aria-labelledby="results-heading">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl"><p className="home-eyebrow text-gold-700">Client results</p><h2 id="results-heading" className="home-section-heading mt-4 text-brand-900">A better plan creates better decisions</h2></div>
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                    <article className="rounded-2xl bg-brand-900 p-7 text-white lg:col-span-1">
                        <p className="home-eyebrow text-gold-400">A focused outcome</p>
                        <dl className="mt-7 space-y-5 text-sm leading-relaxed"><div><dt className="font-bold text-gold-400">Before</dt><dd className="mt-1 text-slate-300">Reactive tax filing and an unclear entity structure.</dd></div><div><dt className="font-bold text-gold-400">After</dt><dd className="mt-1 text-slate-300">An S-Corp plan and proactive quarterly strategy.</dd></div><div><dt className="font-bold text-gold-400">Outcome</dt><dd className="mt-1 text-slate-300">Clearer tax decisions and a defined path to reduce avoidable burden.</dd></div></dl>
                    </article>
                    {relevantTestimonials.map((testimonial, index) => <article key={testimonial._id || index} className="rounded-2xl border border-slate-200 bg-white p-7"><blockquote className="text-base leading-7 text-brand-900">&ldquo;{testimonial.quote}&rdquo;</blockquote><footer className="mt-6 border-t border-slate-100 pt-4 text-sm"><p className="font-semibold text-brand-900">{testimonial.clientName || "Client"}</p><p className="mt-1 text-slate-600">{[testimonial.clientTitle, testimonial.clientCompany].filter(Boolean).join(" · ")}</p></footer></article>)}
                    {relevantTestimonials.length === 0 && <article className="rounded-2xl border border-slate-200 bg-white p-7 lg:col-span-2"><p className="text-slate-600">Client stories are available during your strategy call.</p></article>}
                </div>
            </div>
        </section>
    );
}
