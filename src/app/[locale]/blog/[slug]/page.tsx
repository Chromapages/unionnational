import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getGhlPostBySlug } from "@/lib/ghl/blogs";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await props.params;
    const blogId = process.env.GHL_BLOG_ID || "default";
    const post = await getGhlPostBySlug(blogId, slug);

    if (!post) return { title: "Post Not Found" };

    const baseUrl = "https://unionnationaltax.com";
    const path = `/blog/${slug}`;
    const canonicalUrl = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

    return {
        title: `${post.title} | Union National Tax`,
        description: post.excerpt,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}${path}`,
                es: `${baseUrl}/es${path}`,
            },
        },
        openGraph: {
            images: [post.featuredImage || ""],
        },
    };
}

export default async function BlogPostPage(props: { params: Promise<{ locale: string; slug: string }> }) {
    const params = await props.params;
    const blogId = process.env.GHL_BLOG_ID || "default";
    const post = await getGhlPostBySlug(blogId, params.slug);

    if (!post) {
        notFound();
    }

    const publishDate = post.publishedDate ? new Date(post.publishedDate) : new Date();

    return (
        <div className="min-h-dvh bg-white flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white">
            <HeaderWrapper />

            <main id="main-content" className="flex-1">
                {/* Article Header */}
                <header className="relative pt-20 pb-16 md:pt-32 md:pb-24 bg-brand-900 overflow-hidden">
                    {/* Visual Decor */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    
                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                        <RevealOnScroll>
                            <Breadcrumbs 
                                items={[
                                    { label: "Journal", href: "/blog" },
                                    { label: post.title, href: `/blog/${post.slug}` }
                                ]} 
                            />
                            <Link 
                                href="/blog"
                                className="inline-flex items-center gap-2 text-gold-500 text-sm font-bold uppercase tracking-widest mb-10 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={16} /> Back to Journal
                            </Link>

                            {post.categories && post.categories.length > 0 && (
                                <div className="flex gap-3 mb-8">
                                    {post.categories.map(cat => (
                                        <span key={cat} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 rounded-full">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-10 font-heading font-black leading-[1.05] drop-shadow-xl">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 text-slate-300 text-sm border-t border-white/10 pt-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-brand-900 font-bold font-heading shadow-lg shadow-gold-500/20">
                                        {post.authorName?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">{post.authorName || "Union National Team"}</span>
                                        <span className="text-xs text-slate-400 font-medium">Senior Tax Strategist</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gold-500" />
                                    {format(publishDate, "MMMM dd, yyyy")}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gold-500" />
                                    {Math.max(5, Math.ceil((post.content?.length || 0) / 1000))} min read
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </header>

                {/* Article Content */}
                <article className="py-20 px-6 bg-slate-50/30">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* Main Content Side */}
                        <div className="lg:col-span-8">
                            <RevealOnScroll>
                                {post.featuredImage && (
                                    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative group bg-white p-2">
                                        <img 
                                            src={post.featuredImage} 
                                            alt={post.title}
                                            className="w-full object-cover aspect-[16/9] rounded-2xl"
                                        />
                                    </div>
                                )}

                                <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-soft-green border border-slate-100">
                                    <div 
                                        className="unt-blog-prose"
                                        dangerouslySetInnerHTML={{ __html: post.content || "" }} 
                                    />

                                    {/* Social Share */}
                                    <div className="mt-20 py-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <h4 className="text-lg font-bold font-heading text-brand-900 px-4 py-2 bg-slate-50 rounded-lg">Share this strategy:</h4>
                                        <div className="flex gap-4">
                                            {['Twitter', 'LinkedIn', 'Facebook'].map(platform => (
                                                <button key={platform} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-brand-900 hover:border-brand-900 hover:text-white transition-all shadow-sm">
                                                    <Share2 size={18} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-10">
                            <RevealOnScroll delay={200}>
                                <div className="bg-brand-900 rounded-[2rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <h3 className="text-3xl font-bold font-heading mb-6 relative z-10 leading-tight">
                                        Maximize your <span className="text-gold-500">S-Corp strategy.</span>
                                    </h3>
                                    <p className="text-slate-300 mb-10 leading-relaxed font-sans relative z-10 text-lg font-light">
                                        Our partners save an average of $20K annually in self-employment taxes. See your potential savings in 60 seconds.
                                    </p>
                                    <Link 
                                        href="/s-corp-tax-advantage"
                                        className="inline-flex items-center justify-center w-full px-8 py-5 bg-gold-500 text-brand-900 font-extrabold rounded-xl hover:bg-white transition-all shadow-lg shadow-gold-500/20 relative z-10 font-heading text-lg group"
                                    >
                                        Run Savings Estimator <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={300}>
                                <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-soft">
                                    <h4 className="text-xl font-bold font-heading mb-6 text-brand-900">Expert Advisory</h4>
                                    <p className="text-slate-600 mb-8 leading-relaxed font-sans italic border-l-2 border-gold-500 pl-4">
                                        "Generalist accounting is the fastest way to overpay Uncle Sam. Specialized strategy is the only way to build real wealth."
                                    </p>
                                    <Link 
                                        href="/contact"
                                        className="flex items-center justify-between text-brand-900 font-extrabold border-b-2 border-brand-900/10 pb-4 hover:border-gold-500 group transition-all font-heading"
                                    >
                                        Book a Strategy Call
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-gold-500" />
                                    </Link>
                                </div>
                            </RevealOnScroll>
                        </aside>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
